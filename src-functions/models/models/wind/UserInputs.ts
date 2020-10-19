import { Archetype } from './Archetypes';

export interface UserInputs {
    capacity:number,
    number:number,
    latitude:number,
    longitude:number,
    landLength:number,
    landWidth:number,
    investmentYear:number,
    energyYear:number,
    directOwnConsumption:number,
    rentingLand: boolean,
    archetype: Archetype.MoreThan15m,
    networkOperator: string,
    connectionType: string,
    distanceToGrid: number,
}