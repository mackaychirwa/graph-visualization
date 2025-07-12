import React from 'react';
import ConnectionsPanel from './ConnectionsPanel';
import OptimizedPositionsPanel from './OptimizedPositionsPanel';

const Sidebar = ({ connections, optimizedPositions }) => {
  return (
    <div style={{
      width: '320px',
      borderLeft: '2px solid #e0e0e0',
      backgroundColor: '#f8f9fa',
      display: 'flex',
      flexDirection: 'column',
      marginLeft: '20px',
      borderRadius: '0 8px 8px 0',
      boxShadow: '-2px 0 10px rgba(0,0,0,0.1)'
    }}>
      <ConnectionsPanel connections={connections} />
      <OptimizedPositionsPanel optimizedPositions={optimizedPositions} />
    </div>
  );
};

export default Sidebar; 