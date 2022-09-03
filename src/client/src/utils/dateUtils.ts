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
