import {grpc} from "@improbable-eng/grpc-web";
import useAuth from "./useAuth/useAuth";
import {getStorageItem} from "../utils/storage";

const key = "authorization";

export function useJwtMetadata(): grpc.Metadata {
    const auth = useAuth();

    const metadata = new grpc.Metadata();
    metadata.set(key, "Bearer " + getStorageItem("authData"));
    
    return metadata;
}
