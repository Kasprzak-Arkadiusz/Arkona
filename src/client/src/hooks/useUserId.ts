import {getStorageString, setStorageString} from "utils/storage";

const userIdKey = "userId";

export function useUserId(): string {    
    const userId = getStorageString(userIdKey);
    if (userId === null) {
        const newUserId = self.crypto.randomUUID()
        setStorageString(userIdKey, newUserId);
        return newUserId;
    }

    return userId;
}