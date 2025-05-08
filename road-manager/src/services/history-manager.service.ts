import { MapState } from "../common/types";
import cloneDeep from "lodash/cloneDeep";

export class HistoryManager {
    private undoStack: MapState[] = [];
    private redoStack: MapState[] = [];


    getUndoStack(): MapState[] {
      return [...this.undoStack];
    }

    save(state: MapState) {
      this.undoStack.push(cloneDeep(state));
      this.redoStack = [];
    }

    undo(current: MapState): MapState | null {
      if (this.undoStack.length === 0) return null;
      this.redoStack.push(cloneDeep(current));
      return this.undoStack.pop()!;
    }
  
    redo(current: MapState): MapState | null {
      if (this.redoStack.length === 0) return null;
      this.undoStack.push(cloneDeep(current));
      return this.redoStack.pop()!;
    }

    clear() {
      this.undoStack = [];
      this.redoStack = [];
    }
    
    getState() {
      return {
        undoStack: this.undoStack,
        redoStack: this.redoStack,
      };
    }
    
    setState(state: any) {
      this.undoStack = state.undoStack || [];
      this.redoStack = state.redoStack || [];
    }    
}
  