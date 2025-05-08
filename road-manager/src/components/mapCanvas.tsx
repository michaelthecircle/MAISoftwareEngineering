import React, { useEffect, useState } from "react";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
} from "react-flow-renderer";
import { MapState } from "../common/types";
import { HistoryManager } from "../services/history-manager.service";
import { useMapHandlers } from "../hooks/useMapHandlers";
import { MapSelector } from "./mapSelector";
import "./styles/styles.css";
import { useMapSelectionHandlers } from "../hooks/useMapSelectionHandlers";

const history = new HistoryManager();

export const MapCanvas: React.FC = () => {
  const [nodes, setNodes] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [mapState, setMapState] = useState<MapState>({ cities: [], roads: [] });

  const [showMapSelector, setShowMapSelector] = useState(false);

  const {
    addCity,
    onConnect,
    onEdgeClick,
    onNodeDoubleClick,
    onEdgesDelete,
    onNodesDelete,
    handleUndo,
    handleRedo,
    onNodesChange: onNodesChangeHandler,
  } = useMapHandlers({
    history,
    mapState,
    setMapState,
    setNodes,
    setEdges,
    nodes,
  });

  const {
    handleSaveMap,
    handleNewMap,
    handleSelectMap
  } = useMapSelectionHandlers({
    mapState,
    setMapState,
    setShowMapSelector,
    setNodes,
    setEdges,
  })

  useEffect(() => {
    const newEdges = mapState.roads.map((r) => ({
      id: r.id,
      source: r.source,
      target: r.target,
      label: r.cost.toString(),
    }));
    setEdges(newEdges);
  }, [mapState.roads]);  

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const isMac = navigator.platform.toLowerCase().includes("mac");
      const ctrlOrCmd = isMac ? event.metaKey : event.ctrlKey;
  
      if (ctrlOrCmd && event.key.toLowerCase() === "z" && !event.shiftKey) {
        event.preventDefault();
        handleUndo();
      }
  
      if (ctrlOrCmd && event.key.toLowerCase() === "z" && event.shiftKey) {
        event.preventDefault();
        handleRedo();
      }

      if (ctrlOrCmd && event.key.toLowerCase() === "s") {
        event.preventDefault();
        handleSaveMap();
      }
  
      if (event.key.toLowerCase() === "n") {
        addCity();
      }
    };
  
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [addCity, handleUndo, handleRedo]);
  

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <div className="top-bar">
        <div className="p-2 flex gap-2">
          <button className="btn add-city" onClick={addCity}>Add City</button>
          <div className="actions">
            <button className="btn undo-redo" onClick={handleUndo}>Undo</button>
            <button className="btn undo-redo" onClick={handleRedo}>Redo</button>
          </div>

          <div className="map-actions">
            <button className="btn new-map" onClick={handleNewMap}>New Map</button>
            <button className="btn save-map" onClick={handleSaveMap}>Save Map</button>
            <button className="btn load-map" onClick={() => setShowMapSelector((prev) => !prev)}>
              {showMapSelector ? "Hide Maps" : "Load Map"}
            </button>
          </div>
        </div>
        {showMapSelector && (
          <div className="map-selector-container">
            <MapSelector onSelect={handleSelectMap} />
          </div>
        )}
      </div>

      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChangeHandler}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onEdgeClick={onEdgeClick}
        onNodeDoubleClick={onNodeDoubleClick}
        onEdgesDelete={onEdgesDelete}
        onNodesDelete={onNodesDelete}
        fitView
      >
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
};
