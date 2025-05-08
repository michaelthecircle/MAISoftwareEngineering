import { useCallback } from "react";
import { Edge, Node, Connection, addEdge, NodeChange, applyNodeChanges } from "react-flow-renderer";
import { v4 as uuid } from "uuid";
import { MapState, City, Road } from "../common/types";
import { AddCityCommand } from "../commands/addCity.command";
import { HistoryManager } from "../services/history-manager.service";
import { AddRoadCommand } from "../commands/addRoad.command";
import { MoveCityCommand } from "../commands/moveCity.command";
import { isCityNameTaken } from "../utils/cityNameUtils";

type UseMapHandlersParams = {
  history: HistoryManager;
  mapState: MapState;
  setMapState: React.Dispatch<React.SetStateAction<MapState>>;
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>;
  setEdges: React.Dispatch<React.SetStateAction<Edge[]>>;
  nodes: Node[];
};

export function useMapHandlers({
  history,
  mapState,
  setMapState,
  setNodes,
  setEdges,
  nodes,
}: UseMapHandlersParams) {
  const addCity = useCallback(() => {
    const id = uuid();
    const name = prompt("Enter city name:", `${id.slice(0, 4)}`)?.trim();
    if (!name) {
      alert("Invalid name");
      return;
    }

    if (isCityNameTaken(name, mapState.cities)) {
      alert("A city with this name already exists.");
      return;
    }

    const x = Math.random() * 200 + 100;
    const y = Math.random() * 200 + 100;

    const newCity: City = { id, name, x, y };
    const command = new AddCityCommand(newCity);
    const newState = command.execute(mapState);
    const newNode: Node = {
      id,
      data: { label: name },
      position: {
        x,
        y,
      },
      style: { background: "#F0FFFF", color: "#000", border: "1px solid #000" },
      type: "default",
    };

    history.save(newState);

    setMapState(newState);
    setNodes((nds) => [...nds, newNode]);
  }, [mapState, setMapState, setNodes]);


  const onNodesChangeHandler = useCallback(
    (changes: NodeChange[]) => {
      setNodes((prevNodes) => applyNodeChanges(changes, prevNodes));
      changes.forEach((change) => {
        if (change.type === "position" && !change.dragging) {
          const node = nodes.find((n) => n.id === change.id);
          if (!node) return;

          const cityId = change.id;
          const city = mapState.cities.find((c) => c.id.toString() === cityId);
          if (!city) {
            console.error("City not found for node id:", node.id);
            return;
          }

          const prevX = city.x;
          const prevY = city.y;
          const newX = node.position.x;
          const newY = node.position.y;

          if (prevX === newX && prevY === newY) return;

          const command = new MoveCityCommand(cityId.toString(), prevX, prevY, newX, newY);
          const nextState = command.execute(mapState);
          history.save(nextState);
          setMapState(nextState);
        }
      });
    },
    [mapState, nodes]
  );

  const onConnect = useCallback(
    (params: Edge | Connection) => {
      if (!params.source || !params.target) return;

      const costStr = prompt("Enter road cost:", Math.floor(Math.random() * 1000).toString());
      const cost = parseInt(costStr || "0", 10);

      if (isNaN(cost) || cost <= 0) {
        alert("Invalid cost value.");
        return;
      }

      const edgeId = uuid();
      const newEdge: Edge = {
        ...params,
        id: edgeId,
        label: cost.toString(),
        source: params.source,
        target: params.target,
      };

      const newRoad: Road = {
        id: edgeId,
        source: newEdge.source,
        target: newEdge.target,
        cost,
      };

      const command = new AddRoadCommand(newRoad);
      const newState = command.execute(mapState);

      history.save(newState);

      setEdges((eds) => addEdge(newEdge, eds));
      setMapState((prev) => ({
        ...prev,
        roads: [...prev.roads, newRoad],
      }));
    },
    [mapState, setMapState, setEdges]
  );

  const onNodeDoubleClick = useCallback(
    (_event: React.MouseEvent, node: Node) => {
      const newName = prompt("Enter new city name:", node.data.label);
      if (!newName || newName.trim() === "") return;
      
      if (isCityNameTaken(newName, mapState.cities, node.id)) {
        alert("A city with this name already exists.");
        return;
      }

      setNodes((prevNodes) =>
        prevNodes.map((n) =>
          n.id === node.id ? { ...n, data: { ...n.data, label: newName } } : n
        )
      );
      const updatedState: MapState = {
        ...mapState,
        cities: mapState.cities.map((city) =>
          city.id.toString() === node.id ? { ...city, name: newName } : city
        ),
      };
  
      setMapState(updatedState);
      history.save(updatedState);
    },
    [mapState, setMapState, setNodes]
  );  

  const onEdgeClick = useCallback(
    (event: React.MouseEvent, edge: Edge) => {
      event.stopPropagation();

      const newCostStr = prompt("Enter new road cost:", edge.label?.toString() || "0");
      const newCost = parseInt(newCostStr || "0", 10);

      if (newCostStr === null) {
        return;
      } else if (isNaN(newCost) || newCost <= 0) {
        alert("Invalid cost");
        return;
      }

      setEdges((eds) =>
        eds.map((e) => (e.id === edge.id ? { ...e, label: newCost.toString() } : e))
      );

      setMapState((prev) => ({
        ...prev,
        roads: prev.roads.map((r) =>
          r.id === edge.id ? { ...r, cost: newCost } : r
        ),
      }));

      history.save(mapState);
    },
    [mapState, setMapState, setEdges]
  );

  const onEdgesDelete = useCallback(
    (deletedEdges: Edge[]) => {
      const deletedIds = deletedEdges.map((e) => e.id);
  
      const updatedState: MapState = {
        ...mapState,
        roads: mapState.roads.filter((r) => !deletedIds.includes(r.id)),
      };
  
      setMapState(updatedState);
      history.save(updatedState);
    },
    [mapState]
  );

  const onNodesDelete = useCallback(
    (deletedNodes: Node[]) => {
      const deletedIds = deletedNodes.map((node) => node.id.toString());
  
      const updatedState: MapState = {
        cities: mapState.cities.filter((city) => !deletedIds.includes(city.id.toString())),
        roads: mapState.roads.filter(
          (road) =>
            !deletedIds.includes(road.source.toString()) &&
            !deletedIds.includes(road.target.toString())
        ),
      };
  
      history.save(updatedState);
      setMapState(updatedState);
    },
    [mapState]
  );
  

  const handleUndo = () => {
    const prev = history.undo(mapState);

    if (prev) {
      setMapState(prev);
      setNodes(
        prev.cities.map((c) => ({
          id: c.id.toString(),
          data: { label: c.name },
          position: { x: c.x, y: c.y },
          style: { background: "#F0FFFF", color: "#000", border: "1px solid #000" },
          type: "default",
        }))
      );
      setEdges(
        prev.roads.map((r) => ({
          id: r.id.toString(),
          source: r.source,
          target: r.target.toString(),
          label: r.cost.toString(),
        }))
      );
    }
  };
  const handleRedo = () => {
    const next = history.redo(mapState);
    if (next) {
      setMapState(next);
      setNodes(
        next.cities.map((c) => ({
          id: c.id.toString(),
          data: { label: c.name },
          position: { x: c.x, y: c.y },
          style: { background: "#F0FFFF", color: "#000", border: "1px solid #000" },
          type: "default",
        }))
      );
      setEdges(
        next.roads.map((r) => ({
          id: r.id.toString(),
          source: r.source.toString(),
          target: r.target.toString(),
          label: r.cost.toString(),
        }))
      );
    }
  };

  return {
    addCity,
    onConnect,
    onEdgeClick,
    onNodeDoubleClick,
    onEdgesDelete,
    onNodesDelete,
    handleUndo,
    handleRedo,
    onNodesChange: onNodesChangeHandler,
  };
}
