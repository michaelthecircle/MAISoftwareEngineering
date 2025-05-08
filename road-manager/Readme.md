# Road Manager

It is web-based application developed using React, TypeScript, and React Flow. It enables users to create and manage interactive maps by adding cities (nodes) and connecting them with roads (edges). The application supports features such as undo/redo functionality, map saving and loading, and inline editing of city names and road costs.

### 🔧 Features

-   **Add Cities**: Easily add new cities to the map. You can either press a button on topbar or press `n` .
    
-   **Connect Roads**: Link cities with roads and specify associated costs.
    
-   **Edit Road Costs**: Modify the cost of existing roads directly on the map.
-   **Edit City Names**: Double-click on a city to rename it.
-   **Delete Cities and Roads**: Delete city by clicking on it and pressing `delete`. Delete road by escaping modal window and also pressing `delete` (selected road would be highlighted as black).
    
-   **Undo/Redo**: Navigate through changes using undo and redo functionalities.
Utilize shortcuts are `Cmd + Z` for undo and `Cmd + Shift + Z` for redo.
    
-   **Save Maps**: Store the current state of the map for future use.
    
-   **Load Maps**: Retrieve and load previously saved maps.
   

### 🧠 Design Patterns

-   **Memento**: The application implements the Memento pattern to capture and restore the state of the map, enabling undo and redo functionalities. Each change creates a snapshot of the map's state, which can be reverted to as needed.
    
-   **Command**: User actions such as adding, deleting, or editing cities and roads are encapsulated as command objects. This abstraction allows for a clean separation of concerns and facilitates the implementation of undoable operations.

### 🛠️ Technologies Used
-   **TypeScript**
-  **React**
- **React Flow**