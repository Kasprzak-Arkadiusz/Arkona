import { RegisterResponse } from "generated/user/user_pb";

const storage = localStorage;

export function getStorageItem (key: string): RegisterResponse.AsObject | null {
    try {
        const serializedItem = storage.getItem(key);

        if (serializedItem === null) {
            return null;
        }
        const parsed = JSON.parse(serializedItem);
        return Object.assign(new RegisterResponse(), parsed)
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