export enum Archetype {
    LessThan15m,
    MoreThan15m,
}

export function maintenance(archetype : Archetype) : number {
    switch (archetype) {
        case Archetype.LessThan15m: return 1.0;
        case Archetype.MoreThan15m: return 1.5;
    }
}
// it was just landcosts
export function landCostsIncluded(archetype : Archetype) : boolean {
    switch (archetype) {
        case Archetype.LessThan15m: return false;
        case Archetype.MoreThan15m: return false;
    }
}

export function ownConsumption(archetype : Archetype) : boolean {
    switch (archetype) {
        case Archetype.LessThan15m: return true;
        case Archetype.MoreThan15m: return false;
    }
}

export function gridConnection(archetype : Archetype) : boolean {
    switch (archetype) {
        case Archetype.LessThan15m: return false;
        case Archetype.MoreThan15m: return true;
    }
}