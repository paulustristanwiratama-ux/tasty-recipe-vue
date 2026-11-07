export const databaseUrl = (import.meta.env.VITE_FIREBASE_DATABASE_URL || '').replace(/\/$/, '');

export const apiKey = import.meta.env.VITE_FIREBASE_API_KEY;
