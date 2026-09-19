import { SafetyValidator } from '../safety/safety.js';
import { TransactionEngine } from '../transactions/transactions.js';

export interface XenoAppInfo {
  id: string;
  name: string;
  source: string;
  version: string;
  sizeFormatted: string;
  isSystemProtected: boolean;
  reverseDependencies: string[];
}

/**
 * XENO AI Tool Capability Endpoints
 * Guaranteed to pass through identical safety validation as GUI operations
 */
export class XenoToolApi {
  private static appRegistry: Map<string, any> = new Map();

  static registerApps(apps: any[]) {
    apps.forEach(app => this.appRegistry.set(app.id, app));
  }

  static listApps(filter?: { source?: string; search?: string }): XenoAppInfo[] {
    let result = Array.from(this.appRegistry.values());
    if (filter?.source) {
      result = result.filter(a => a.source === filter.source);
    }
    if (filter?.search) {
      const q = filter.search.toLowerCase();
      result = result.filter(a => a.name.toLowerCase().includes(q) || a.id.toLowerCase().includes(q));
    }
    return result.map(a => ({
      id: a.id,
      name: a.name,
      source: a.source,
      version: a.version,
      sizeFormatted: a.sizeFormatted,
      isSystemProtected: a.isSystemProtected,
      reverseDependencies: a.reverseDependencies || []
    }));
  }

  static inspectApp(appId: string) {
    const app = this.appRegistry.get(appId);
    if (!app) return { error: `Application '${appId}' not found.` };
    const safety = SafetyValidator.validatePackage(app.id, app.reverseDependencies);
    return {
      app,
      safety
    };
  }

  static previewUninstall(appId: string) {
    const app = this.appRegistry.get(appId);
    if (!app) return { error: `Application '${appId}' not found.` };
    
    return TransactionEngine.createPlan(
      app.id,
      app.name,
      app.source,
      app.reverseDependencies,
      app.residuals || [],
      app.sizeBytes
    );
  }

  static uninstall(appId: string, confirmationToken: string, mockMode: boolean = true) {
    return TransactionEngine.executePlan(confirmationToken, mockMode);
  }

  static listResiduals(appId: string) {
    const app = this.appRegistry.get(appId);
    if (!app) return { error: `Application '${appId}' not found.` };
    return {
      appId,
      residuals: (app.residuals || []).filter((r: any) => SafetyValidator.validateResidualPath(r.path))
    };
  }
}
