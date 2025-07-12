import React from 'react';

const OptimizedPositionsPanel = ({ optimizedPositions }) => {
  return (
    <div style={{
      padding: '20px',
      backgroundColor: '#f8f9fa',
      flex: 1
    }}>
      <h3 style={{
        margin: '0 0 15px 0',
        color: '#2c3e50',
        fontSize: '18px',
        fontWeight: '600'
      }}>
        Optimized Positions
      </h3>
      <div style={{
        maxHeight: '400px',
        overflowY: 'auto',
        backgroundColor: 'white',
        borderRadius: '8px',
        padding: '15px',
        border: '1px solid #e9ecef'
      }}>
        <ul style={{ 
          listStyleType: 'none', 
          paddingLeft: 0,
          margin: 0
        }}>
          {optimizedPositions.map((pos, i) => (
            <li key={i} style={{
              padding: '8px 0',
              borderBottom: i < optimizedPositions.length - 1 ? '1px solid #f1f3f4' : 'none',
              fontSize: '14px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <strong style={{ color: '#495057' }}>{pos.id}</strong>
              <div style={{ 
                color: '#6c757d', 
                fontSize: '12px',
                fontFamily: 'monospace',
                backgroundColor: '#f8f9fa',
                padding: '2px 6px',
                borderRadius: '4px'
              }}>
                ({pos.x}, {pos.y})
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default OptimizedPositionsPanel; 