export class SeatInfo {
    private defaultUserId: string = "0"

    public seatNumber: number;
    public isFree: boolean;
    public userId: string = this.defaultUserId;
    public isTakenInDatabase: boolean = false;

    public constructor(seatNumber: number, isFree: boolean, isTakenInDatabase: boolean) {
        this.seatNumber = seatNumber;
        this.isFree = isFree;
        this.isTakenInDatabase = isTakenInDatabase;
    }

    setUserId(userId: string) {
        this.userId = this.isFree ? this.defaultUserId : userId;
    };
}