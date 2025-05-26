import { useState, useEffect } from 'react';

interface StoredValue<T> {
    value: T;
    timestamp: number;
}
export function usePersistedState<T>(key: string, defaultValue: T, ttl: number): [T, (v: T) => void] {
    const [state, setState] = useState<T>(() => {
        if (typeof window === 'undefined') return defaultValue;
        const json = localStorage.getItem(key);
        if (!json) return defaultValue;
        try {
            const stored: StoredValue<T> = JSON.parse(json);
            if (Date.now() - stored.timestamp > ttl) {
                localStorage.removeItem(key);
                return defaultValue;
            }
            return stored.value;
        } catch {
            return defaultValue;
        }
    });

    useEffect(() => {
        try {
            const stored: StoredValue<T> = {
                value: state,
                timestamp: Date.now(),
            };
            localStorage.setItem(key, JSON.stringify(stored));
        } catch {}
    }, [key, state]);

    return [state, setState];
}
