import {grpc} from "@improbable-eng/grpc-web";
import {getStorageItem} from "utils/storage";
import {accessTokenKey} from "utils/storageItemKeys";

const key = "authorization";

export function useJwtMetadata(): grpc.Metadata {
    const accessToken = getStorageItem(accessTokenKey)    
    const metadata = new grpc.Metadata();
    metadata.set(key, "Bearer " + accessToken);
    
    return metadata;
}
