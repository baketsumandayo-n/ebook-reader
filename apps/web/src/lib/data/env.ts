/**
 * @license BSD-3-Clause
 * Copyright (c) 2025, ッツ Reader Authors
 * All rights reserved.
 */

const normalizeEnv = (value?: string) => (value ? value.trim() : '');

const normalizeBooleanEnv = (value?: string | boolean) => {
  if (typeof value === 'boolean') {
    return value;
  }

  if (typeof value === 'string') {
    const normalized = value.trim().toLowerCase();

    return normalized === 'true' || normalized === '1';
  }

  return false;
};

export const basePath = normalizeEnv(import.meta.env.VITE_BASE_PATH);
export const pagePath = normalizeEnv(import.meta.env.VITE_PAGE_PATH);
export const clearConsoleOnReload = normalizeBooleanEnv(import.meta.env.VITE_CLEAR_ON_RELOAD);
export const storageRootName =
  normalizeEnv(import.meta.env.VITE_STORAGE_ROOT_NAME) || 'ttu-reader-data';
export const gDriveAuthEndpoint = normalizeEnv(import.meta.env.VITE_GDRIVE_AUTH_ENDPOINT);
export const gDriveTokenEndpoint = normalizeEnv(import.meta.env.VITE_GDRIVE_TOKEN_ENDPOINT);
export const gDriveRefreshEndpoint = normalizeEnv(import.meta.env.VITE_GDRIVE_REFRESH_ENDPOINT);
export const gDriveRevokeEndpoint = normalizeEnv(import.meta.env.VITE_GDRIVE_REVOKE_ENDPOINT);
export const gDriveScope = normalizeEnv(import.meta.env.VITE_GDRIVE_SCOPE);
export const gDriveClientId = normalizeEnv(import.meta.env.VITE_GDRIVE_CLIENT_ID);
export const gDriveClientSecret = normalizeEnv(import.meta.env.VITE_GDRIVE_CLIENT_SECRET);
export const oneDriveAuthEndpoint = normalizeEnv(import.meta.env.VITE_ONEDRIVE_AUTH_ENDPOINT);
export const oneDriveTokenEndpoint = normalizeEnv(import.meta.env.VITE_ONEDRIVE_TOKEN_ENDPOINT);
export const oneDriveDiscoveryEndpoint = normalizeEnv(import.meta.env.VITE_ONEDRIVE_DISCOVERY);
export const oneDriveScope = normalizeEnv(import.meta.env.VITE_ONEDRIVE_SCOPE);
export const oneDriveClientId = normalizeEnv(import.meta.env.VITE_ONEDRIVE_CLIENT_ID);
export const oneDriveClientSecret = normalizeEnv(import.meta.env.VITE_ONEDRIVE_CLIENT_SECRET);
