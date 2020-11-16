export type BoxStatus = { top: number, left: number, active: boolean };
export type mapCoordinates = [number, number];

export class User {
    email: string; // primary key
    ownerId: string; // foreign key
    zoomLevel: number;
    mapCoordinates: mapCoordinates;
    siteBoxCoordinates: BoxStatus;
    resultBoxCoordinates: BoxStatus;

    constructor(other: Partial<User> & Pick<User, "email" | "ownerId">) {
        this.email = other.email;
        this.ownerId = other.ownerId;
        this.zoomLevel = other.zoomLevel || 10;
        this.siteBoxCoordinates = other.siteBoxCoordinates || { top: 40, left: 100, active: true };
        this.resultBoxCoordinates = other.resultBoxCoordinates || { top: 100, left: 1000, active: true };
        this.mapCoordinates = other.mapCoordinates || [52.3628434, 4.8443875];
    }
}