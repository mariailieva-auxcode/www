export enum Archetype {
    RoofMountedProsumer,
    RoofMountedProducer,
    GroundMountedProducer,
}

export function LandCostsIncluded(archetype : Archetype) : boolean {
    switch (archetype) {
        case Archetype.RoofMountedProsumer: return false;
        case Archetype.RoofMountedProducer: return false;
        case Archetype.GroundMountedProducer: return true;
    }
}

export function OwnConsumption(archetype : Archetype) : boolean {
    switch (archetype) {
        case Archetype.RoofMountedProsumer: return true;
        case Archetype.RoofMountedProducer: return false;
        case Archetype.GroundMountedProducer: return false;
    }
}

export function GridConnectionCosts(archetype : Archetype) : boolean {
    switch (archetype) {
        case Archetype.RoofMountedProsumer: return false;
        case Archetype.RoofMountedProducer: return false;
        case Archetype.GroundMountedProducer: return true;
    }
}