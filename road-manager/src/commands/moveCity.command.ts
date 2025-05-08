import { Command } from "./command.interface";
import { MapState } from "../common/types";

export class MoveCityCommand implements Command {
  constructor(
    private cityId: string,
    private prevX: number,
    private prevY: number,
    private newX: number,
    private newY: number
  ) {}

  execute(state: MapState): MapState {
    const updatedCities = state.cities.map((city) =>
      city.id.toString() === this.cityId ? { ...city, x: this.newX, y: this.newY } : city
    );
    return { ...state, cities: updatedCities };
  }

  undo(state: MapState): MapState {
    const updatedCities = state.cities.map((city) =>
      city.id.toString() === this.cityId ? { ...city, x: this.prevX, y: this.prevY } : city
    );
    return { ...state, cities: updatedCities };
  }
}
