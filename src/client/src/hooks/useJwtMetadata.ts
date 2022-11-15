import {grpc} from "@improbable-eng/grpc-web";
import {getStorageItem} from "../utils/storage";
import {accessTokenKey} from "../utils/storageItemKeys";

const key = "authorization";

export function useJwtMetadata(): grpc.Metadata {
    const metadata = new grpc.Metadata();
    metadata.set(key, "Bearer " + getStorageItem(accessTokenKey));
    
    return metadata;
}
