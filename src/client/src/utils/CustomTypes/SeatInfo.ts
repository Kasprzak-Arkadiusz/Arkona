export class SeatInfo {
    public seatNumber: number;
    public isFree: boolean;
    public userId: string;

    public constructor(seatNumber: number, isFree: boolean, userId: string) {
        this.seatNumber = seatNumber;
        this.isFree = isFree;
        this.userId = userId;
    }

}