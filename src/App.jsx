import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import GraphData from './pages/graphData'


function App() {

  return (
    <>
     <div className="App" style={{ 
       minHeight: '100vh',
       backgroundColor: '#f5f5f5',
       width: '100%',
       maxWidth: '1290px',
       margin: '0 auto'
     }}>
      <div style={{
        padding: '20px',
        textAlign: 'center',
        backgroundColor: 'white',
        borderBottom: '2px solid #e0e0e0',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        width: '100%',
        maxWidth: '1290px'
      }}>
        <h1 style={{
          margin: 0,
          color: '#2c3e50',
          fontSize: '28px',
          fontWeight: '600'
        }}>
          Malawi District Graph Visualization
        </h1>
        <p style={{
          margin: '10px 0 0 0',
          color: '#6c757d',
          fontSize: '16px'
        }}>
          Interactive force-directed layout optimization
        </p>
      </div>
      <GraphData />
    </div>
    </>
  )
}

export default App
