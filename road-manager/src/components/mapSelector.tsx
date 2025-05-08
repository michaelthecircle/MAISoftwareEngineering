import React, { useEffect, useState } from "react";

export const MapSelector: React.FC<{ onSelect: (mapName: string) => void }> = ({ onSelect }) => {
  const [savedMaps, setSavedMaps] = useState<any[]>([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("savedMaps") || "[]");
    setSavedMaps(saved);
  }, []);

  return (
    <div className="map-selector">
      <h2>Select a saved map:</h2>
      <ul>
        {savedMaps.length === 0 ? (
          <li>No saved maps</li>
        ) : (
          savedMaps.map((map: any) => (
            <li key={map.mapName}>
              <button onClick={() => onSelect(map.mapName)}>{map.mapName}</button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};
