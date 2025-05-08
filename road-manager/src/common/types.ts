export interface City {
    id: number;
    name: string;
    x: number;
    y: number;
}

export interface Road {
    id: string;
    source: string;
    target: string;
    cost: number;
}

export interface MapState {
    cities: City[];
    roads: Road[];
}

