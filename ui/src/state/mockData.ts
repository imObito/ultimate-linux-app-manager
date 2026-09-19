import INSTALLED_APPS_DATA from './installedApps.json';

export interface AppPackage {
  id: string;
  name: string;
  source: 'pacman' | 'flatpak' | 'appimage' | 'webapp' | 'wine' | 'native';
  category: string;
  version: string;
  sizeBytes: number;
  sizeFormatted: string;
  isUserApp: boolean;
  isSystemProtected: boolean;
  isOrphan: boolean;
  description: string;
  execPath: string;
  dependencies: string[];
  reverseDependencies: string[];
  residuals: {
    type: 'config' | 'cache' | 'data' | 'systemd';
    path: string;
    sizeFormatted: string;
    confidence: 'VERIFIED' | 'DETECTED' | 'POSSIBLE';
  }[];
}

export const MOCK_APPS: AppPackage[] = INSTALLED_APPS_DATA as AppPackage[];
