import { Owner } from "./owner.model";

// TODO(RR AND MILEN) ADD COMMON IN BUILD FOLDER
/**
 * Site is one Leaflet polygon
 */
export class Site {
    id: string; // primary key (random)
    coordinates: {};
    ownerIds: Array<string>; // foreign key

    /**
     * @returns a new object
     * 
     * @param1 partial data object
     */
    constructor(data: Partial<Site>) {
    }
}