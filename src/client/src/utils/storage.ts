import {AuthenticationResponse} from "generated/user/user_pb";

const storage = localStorage;

export function getStorageItem(key: string): AuthenticationResponse.AsObject | null {
    try {
        const serializedItem = storage.getItem(key);

        if (serializedItem === null) {
            return null;
        }
        const parsed = JSON.parse(serializedItem);
        return Object.assign(new AuthenticationResponse(), parsed)
    } catch (error) {
        return null;
    }
}

export const setStorageItem = (key: string, value: object | null) => {
    try {
        if (value === null) {
            storage.removeItem(key);
            return;
        }

        const serializedItem = JSON.stringify(value);
        storage.setItem(key, serializedItem);
    } catch (error) {
    }
};

export function getStorageString(key: string): string | null {
    return storage.getItem(key);
}

export function setStorageString(key: string, value: string | null) {
    if (value === null) {
        storage.removeItem(key);
        return;
    }

    storage.setItem(key, value);
}