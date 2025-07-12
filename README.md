# Malawi Districts Graph Visualization

A React-based interactive visualization of Malawi's district connections using a force-directed graph layout (D3.js).

## Overview
This project visualizes the connections between Malawi's 28 districts as a graph. Each district is a node, and connections (edges) are defined by an adjacency list. The layout is optimized using a force-directed algorithm to minimize edge crossings and node overlap, providing a clear and interactive representation of the network.

## Features
- **Interactive Graph Visualization**: Zoom, pan, and hover to explore the network.
- **Force-Directed Layout**: Nodes are automatically positioned for clarity using D3.js physics simulation.
- **District Connections Panel**: See which districts are connected to each other.
- **Optimized Positions Panel**: View the normalized (x, y) coordinates for each district after layout optimization.
- **Responsive Dashboard Layout**: Header, graph, and information panels are arranged as a modern dashboard.

## Data Structure
- **Nodes**: Each district is represented as a node with an initial (x, y) position (values between 0 and 1).
- **Edges**: Connections between districts are defined as pairs of district names in an adjacency list.

Example (`src/assets/data.json`):
```json
{
  "nodes": [
    { "id": "Blantyre", "x": 0.91, "y": 0.25 },
    { "id": "Chikwawa", "x": 0.14, "y": 0.39 },
    ...
    { "id": "Likoma", "x": 0.34, "y": 0.62 }
  ],
  "edges": [
    ["Blantyre", "Chikwawa"],
    ["Blantyre", "Chiradzulu"],
    ...
  ]
}
```

## Layout & UI
- **Header**: Project title at the top.
- **Graph Area**: Large, central visualization of the district network.
- **Bottom Row**: Two horizontally-aligned panels:
  - **District Connections**: Lists each district and its direct neighbors.
  - **Optimized Positions**: Shows the final (x, y) coordinates for each district after layout optimization.

## How It Works
1. **Data Loading**: The app loads the nodes and edges from `data.json`.
2. **Force Simulation**: D3.js applies forces (link, charge, collision, centering) to optimize node positions.
3. **Rendering**: The graph is rendered as SVG, with interactive features for exploration.
4. **Panels**: The sidebar panels update in real time to reflect the current graph state.

## Getting Started
### Prerequisites
- Node.js (v16 or later recommended)
- npm

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/mackaychirwa/graph-visualization.git
   cd graph-visualization
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

### Running the App
Start the development server:
```bash
npm run dev
```
Open your browser to the local address shown in the terminal (e.g., http://localhost:5173/).

## Project Structure
```
graph-visualization/
├── public/
├── src/
│   ├── assets/
│   │   └── data.json         # Districts and connections data
│   ├── components/
│   │   ├── GraphVisualization.jsx
│   │   ├── ConnectionsPanel.jsx
│   │   ├── OptimizedPositionsPanel.jsx
│   ├── pages/
│   │   └── graphData.jsx     # Main dashboard layout
│   ├── App.jsx
│   └── main.jsx
├── package.json
└── README.md
```

## Technical Details
- **React**: UI framework for component-based architecture.
- **D3.js**: Handles force-directed graph layout and SVG rendering.
- **Vite**: Fast development server and build tool.
- **Component Structure**:
  - `GraphVisualization.jsx`: Handles D3 simulation and SVG rendering.
  - `ConnectionsPanel.jsx`: Lists district connections.
  - `OptimizedPositionsPanel.jsx`: Lists normalized coordinates.
  - `graphData.jsx`: Arranges the dashboard layout.