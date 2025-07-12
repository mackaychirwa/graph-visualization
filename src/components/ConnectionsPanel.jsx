import React from 'react';

const ConnectionsPanel = ({ connections }) => {
  return (
    <div style={{
      padding: '20px',
      borderBottom: '2px solid #e0e0e0',
      backgroundColor: '#f8f9fa'
    }}>
      <h3 style={{
        margin: '0 0 15px 0',
        color: '#2c3e50',
        fontSize: '18px',
        fontWeight: '600'
      }}>
        District Connections
      </h3>
      <div style={{
        maxHeight: '300px',
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
          {connections.map((conn, i) => (
            <li key={i} style={{
              padding: '8px 0',
              borderBottom: i < connections.length - 1 ? '1px solid #f1f3f4' : 'none',
              fontSize: '14px'
            }}>
              <strong style={{ color: '#495057' }}>{conn.district}</strong>
              <div style={{ 
                color: '#6c757d', 
                fontSize: '12px',
                marginTop: '2px'
              }}>
                Connected to: {conn.connected}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ConnectionsPanel; 