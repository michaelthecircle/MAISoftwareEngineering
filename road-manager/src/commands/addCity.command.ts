import { MapState, City } from "../common/types";
import { Command } from "./command.interface";

export class AddCityCommand implements Command {
  private city: City;
  private previousState: MapState;

  constructor(city: City) {
    this.city = city;
    this.previousState = { cities: [], roads: [] };
  }

  execute(state: MapState): MapState {
    this.previousState = JSON.parse(JSON.stringify(state));
    return {
      ...state,
      cities: [...state.cities, this.city],
    };
  }

  undo(_state: MapState): MapState {
    return this.previousState;
  }
}
