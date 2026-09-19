import { SafetyValidator, SafetyCheckResult } from '../safety/safety';

export interface UninstallPlan {
  planId: string;
  appId: string;
  appName: string;
  source: 'pacman' | 'flatpak' | 'appimage';
  safety: SafetyCheckResult;
  packageCommand: string;
  requiresPrivilege: boolean;
  residualsToRemove: string[];
  totalReclaimedBytes: number;
  confirmationToken: string;
  createdAt: number;
}

export interface JournalRecord {
  transactionId: string;
  appId: string;
  appName: string;
  source: string;
  timestamp: string;
  status: 'SUCCESS' | 'FAILED' | 'DRY_RUN';
  reclaimedBytes: number;
  residualPathsCleaned: string[];
  error?: string;
}

export class TransactionEngine {
  private static activePlans: Map<string, UninstallPlan> = new Map();
  private static journalHistory: JournalRecord[] = [];

  static createPlan(
    appId: string,
    appName: string,
    source: 'pacman' | 'flatpak' | 'appimage',
    reverseDeps: string[] = [],
    residuals: { path: string; sizeBytes: number }[] = [],
    packageSizeBytes: number = 0
  ): UninstallPlan {
    const safety = SafetyValidator.validatePackage(appId, reverseDeps);
    
    // Filter residuals through safety validator
    const validResiduals = residuals.filter(r => SafetyValidator.validateResidualPath(r.path));
    const reclaimedResidualsBytes = validResiduals.reduce((sum, r) => sum + r.sizeBytes, 0);

    let packageCommand = '';
    let requiresPrivilege = false;

    if (source === 'pacman') {
      packageCommand = `pkexec pacman -Rns --noconfirm ${appId}`;
      requiresPrivilege = true;
    } else if (source === 'flatpak') {
      packageCommand = `flatpak uninstall -y --delete-data ${appId}`;
      requiresPrivilege = false;
    } else if (source === 'appimage') {
      packageCommand = `rm -f ${appId}`;
      requiresPrivilege = false;
    }

    const token = `xeno_token_${Math.random().toString(36).substring(2, 10)}`;
    const planId = `plan_${Date.now()}_${appId}`;

    const plan: UninstallPlan = {
      planId,
      appId,
      appName,
      source,
      safety,
      packageCommand,
      requiresPrivilege,
      residualsToRemove: validResiduals.map(r => r.path),
      totalReclaimedBytes: packageSizeBytes + reclaimedResidualsBytes,
      confirmationToken: token,
      createdAt: Date.now()
    };

    this.activePlans.set(token, plan);
    return plan;
  }

  static executePlan(confirmationToken: string, mockMode: boolean = true): { success: boolean; message: string; record?: JournalRecord } {
    const plan = this.activePlans.get(confirmationToken);
    if (!plan) {
      return { success: false, message: 'Invalid or expired confirmation token.' };
    }

    if (plan.safety.riskLevel === 'CRITICAL_BLOCKED') {
      return { success: false, message: `Operation blocked: ${plan.safety.warningMessage}` };
    }

    // In Mock Mode, simulate execution without running shell commands
    if (mockMode) {
      const record: JournalRecord = {
        transactionId: `tx_${Date.now()}`,
        appId: plan.appId,
        appName: plan.appName,
        source: plan.source,
        timestamp: new Date().toISOString(),
        status: 'SUCCESS',
        reclaimedBytes: plan.totalReclaimedBytes,
        residualPathsCleaned: plan.residualsToRemove
      };

      this.journalHistory.push(record);
      this.activePlans.delete(confirmationToken);

      return {
        success: true,
        message: `Successfully simulated uninstallation of ${plan.appName}`,
        record
      };
    }

    // Real Execution requires shell executor hook
    return {
      success: true,
      message: `Executing ${plan.packageCommand}`
    };
  }

  static getHistory(): JournalRecord[] {
    return [...this.journalHistory];
  }
}
