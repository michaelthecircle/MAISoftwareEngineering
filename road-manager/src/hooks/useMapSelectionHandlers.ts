import { useCallback } from "react";
import { HistoryManager } from "../services/history-manager.service";
import { MapState } from "../common/types";
import { Edge, Node } from "react-flow-renderer";
import { v4 as uuid } from "uuid";

type UseMapSelectionHandlersParams = {
    history: HistoryManager;
    mapState: MapState;
    setMapState: React.Dispatch<React.SetStateAction<MapState>>;
    setShowMapSelector: React.Dispatch<React.SetStateAction<boolean>>
    setNodes: React.Dispatch<React.SetStateAction<Node[]>>;
    setEdges: React.Dispatch<React.SetStateAction<Edge[]>>;
};


export function useMapSelectionHandlers({
    history,
    mapState,
    setMapState,
    setShowMapSelector,
    setNodes,
    setEdges,
}: UseMapSelectionHandlersParams) {

    const handleSaveMap = useCallback(() => {
        const mapName = prompt("Enter the name of the map to save:");
        
        if (!mapName) return;
        
        const savedMaps = JSON.parse(localStorage.getItem("savedMaps") || "[]");
        
        const existingMapIndex = savedMaps.findIndex((map: any) => map.mapName === mapName);
        
        if (existingMapIndex !== -1) {
          const confirmOverwrite = window.confirm(
            `A map with the name "${mapName}" already exists. Do you want to overwrite it?`
          );
        
          if (!confirmOverwrite) {
            return;
          }
    
          savedMaps[existingMapIndex] = {
            mapName,
            mapState,
            history: history.getUndoStack(),
          };
        } else {
          savedMaps.push({
            mapName,
            mapState,
            history: history.getUndoStack(),
          });
        }
        localStorage.setItem("savedMaps", JSON.stringify(savedMaps));
      
        alert(`Map "${mapName}" has been saved successfully!`);
        setNodes([]);
        setEdges([]);
        setMapState({ cities: [], roads: [] });
      }, [mapState, history.getUndoStack()]);
    
    const handleLoadMap = useCallback((mapName: string) => {
        const savedMaps = JSON.parse(localStorage.getItem("savedMaps") || "[]");
        const mapData = savedMaps.find((map: any) => map.mapName === mapName);
    
        if (!mapData) {
          console.error("Map not found:", mapName);
          return;
        }
    
        setMapState(mapData.mapState);
        history.setState(mapData.history);
    
        const newNodes = mapData.mapState.cities.map((city) => ({
          id: city.id.toString(),
          position: { x: city.x, y: city.y },
          data: { label: city.name },
          style: { background: "#F0FFFF", color: "#000", border: "1px solid #000" },
          type: "default",
        }));
    
        const newEdges = mapData.mapState.roads.map((road) => ({
          id: uuid(),
          source: road.source.toString(),
          target: road.target.toString(),
          label: road.cost.toString(),
        }));
    
        setNodes(newNodes);
        setEdges(newEdges);
    }, [history]);

    const handleNewMap = useCallback(() => {
        setNodes([]);
        setEdges([]);
        setMapState({ cities: [], roads: [] });
        history.clear();
      }, [history]);
    
    const handleSelectMap = useCallback((mapName: string) => {
      handleLoadMap(mapName);
      setShowMapSelector(false);
    }, [handleLoadMap]);

    return {
        handleSaveMap,
        handleNewMap,
        handleSelectMap
    }
}
