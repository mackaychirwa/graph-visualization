import React, { useState, useCallback } from 'react';
import graphData from '../assets/data.json';
import GraphVisualization from '../components/GraphVisualization';
import ConnectionsPanel from '../components/ConnectionsPanel';
import OptimizedPositionsPanel from '../components/OptimizedPositionsPanel';

const GraphData = () => {
  const [connections, setConnections] = useState([]);
  const [optimizedPositions, setOptimizedPositions] = useState([]);

  const handleOptimizedPositionsChange = useCallback((positions) => {
    setOptimizedPositions(positions);
  }, []);

  const handleConnectionsChange = useCallback((conns) => {
    setConnections(conns);
  }, []);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '100%',
      maxWidth: '1290px',
      margin: '0 auto',
      minHeight: '100vh',
      backgroundColor: '#f5f5f5',
      padding: '0 0 40px 0'
    }}>
      {/* Graph Panel - full width */}
      <div style={{
        width: '100%',
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        margin: '30px 0 30px 0',
        padding: '20px 0',
        display: 'flex',
        justifyContent: 'center',
      }}>
        <GraphVisualization
          graphData={graphData}
          onOptimizedPositionsChange={handleOptimizedPositionsChange}
          onConnectionsChange={handleConnectionsChange}
        />
      </div>

      {/* Bottom Row: Two Panels */}
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        gap: '24px',
        justifyContent: 'center',
        alignItems: 'stretch',
      }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <ConnectionsPanel connections={connections} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <OptimizedPositionsPanel optimizedPositions={optimizedPositions} />
        </div>
      </div>
    </div>
  );
};

export default GraphData;