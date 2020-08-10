export enum Archetype {
    RoofMountedProsumer,
    RoofMountedProducer,
    GroundMountedProducer,
}

export function landCostsIncluded(archetype : Archetype) : boolean {
    switch (archetype) {
        case Archetype.RoofMountedProsumer: return false;
        case Archetype.RoofMountedProducer: return false;
        case Archetype.GroundMountedProducer: return true;
    }
}

export function ownConsumption(archetype : Archetype) : boolean {
    switch (archetype) {
        case Archetype.RoofMountedProsumer: return true;
        case Archetype.RoofMountedProducer: return false;
        case Archetype.GroundMountedProducer: return false;
    }
}

export function gridConnectionCosts(archetype : Archetype) : boolean {
    switch (archetype) {
        case Archetype.RoofMountedProsumer: return false;
        case Archetype.RoofMountedProducer: return false;
        case Archetype.GroundMountedProducer: return true;
    }
}