import { MapState, Road } from "../common/types";
import { Command } from "./command.interface";


export class AddRoadCommand implements Command {
    private road: Road;
    private previousState: MapState
    
    constructor(road: any) {
        this.road = road;
        this.previousState = { cities: [], roads: [] };
    }

    execute(state: MapState): MapState {
        this.previousState = JSON.parse(JSON.stringify(state));
        return {
            ...state,
            roads: [...state.roads, this.road],
        };
    }
    undo(_state: any): any {
        return this.previousState;
    }
}