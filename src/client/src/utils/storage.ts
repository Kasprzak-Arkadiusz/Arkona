const storage = localStorage;

export function getStorageItem (key: string): string | null {
    try {
        const serializedItem = storage.getItem(key);

        if (serializedItem === null) {
            return null;
        }

        return JSON.parse(serializedItem);
    } catch (error) {
        return null;
    }
};

export const setStorageItem = (key: string, value: object | null) => {
    try {
        if (value === null) {
            return;
        }

        const serializedItem = JSON.stringify(value);
        storage.setItem(key, serializedItem);
    } catch (error) {
    }
};