export class SeatInfo {
    private defaultUserId: string = "0"

    public seatNumber: number;
    public isFree: boolean;
    public userId: string;

    public constructor(seatNumber: number, isFree: boolean, userId: string) {
        this.seatNumber = seatNumber;
        this.isFree = isFree;
        this.userId = userId;
    }

    setUserId(userId: string) {
        this.userId = this.isFree ? this.defaultUserId : userId;
    };
}