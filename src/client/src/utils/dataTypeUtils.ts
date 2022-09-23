export function toBoolean(value: boolean | undefined | null) : boolean {
    if (value === undefined || value === null || !value){
        return false;
    } else {
        return true;   
    }
}