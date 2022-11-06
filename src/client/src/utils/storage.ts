const storage = localStorage;
const storageSession = sessionStorage;

export function getStorageItem(key: string): string | null {
    try {
        const item = storage.getItem(key);

        if (item === null) {
            return null;
        }
        
        return item
    } catch (error) {
        return null;
    }
}

export const setStorageItem = (key: string, value: string | null) => {
    try {
        if (value === null) {
            storage.removeItem(key);
            return;
        }

        storage.setItem(key, value);
    } catch (error) {
    }
};

export function getSessionStorageItem(key: string): string | null {
    return storageSession.getItem(key);
}

export function setSessionStorageItem(key: string, value: string | null) {
    if (value === null) {
        storageSession.removeItem(key);
        return;
    }

    storageSession.setItem(key, value);
}