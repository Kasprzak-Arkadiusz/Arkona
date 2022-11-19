import {Timestamp} from "google-protobuf/google/protobuf/timestamp_pb";

export const toDateString = (timestamp: Timestamp | undefined): string => {
    if (typeof timestamp === 'undefined') {
        return ""
    }

    const date = new Date(timestamp.toDate());

    let month = date.getMonth().toString();
    if (month.length === 1) {
        month = `0${month}`;
    }

    let day = date.getDate().toString();
    if (day.length === 1) {
        day = `0${day}`;
    }

    return `${date.getFullYear()}-${month}-${day}`;
}

export function addDays(date: Date, days: number) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

export function toISODateString(date: Date) {
    const offset = date.getTimezoneOffset()
    date = new Date(date.getTime() - (offset*60*1000))
    return date.toISOString().split('T')[0]
}
