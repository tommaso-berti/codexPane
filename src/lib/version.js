import rawVersion from '../../VERSION?raw';

const fileVersion = rawVersion.trim().replace(/^v/i, '');
const envVersion = `${import.meta.env.VITE_APP_VERSION ?? ''}`.trim().replace(/^v/i, '');

export const APP_VERSION = envVersion || fileVersion || '0.0.0';
