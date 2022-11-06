import {grpc} from "@improbable-eng/grpc-web";
import useAuth from "./useAuth/useAuth";

const key = "authorization";

export function useJwtMetadata(): grpc.Metadata {
    const auth = useAuth();

    const metadata = new grpc.Metadata();
    metadata.set(key, "Bearer " + auth.authData?.accesstoken!);
    
    return metadata;
}
