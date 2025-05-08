import { MapState } from "../common/types";

export interface Command {
    execute(state: MapState): MapState;
    undo(state: MapState): MapState;
}
  