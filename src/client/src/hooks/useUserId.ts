import {getSessionStorageItem, setSessionStorageItem} from "utils/storage";

const userIdKey = "userId";

export function useUserId(): string {    
    const userId = getSessionStorageItem(userIdKey);
    if (userId === null) {
        const newUserId = self.crypto.randomUUID()
        setSessionStorageItem(userIdKey, newUserId);
        return newUserId;
    }

    return userId;
}

export function clearUserId() {    
    setSessionStorageItem(userIdKey, null);
}