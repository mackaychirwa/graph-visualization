import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

const GraphVisualization = ({ graphData, onOptimizedPositionsChange, onConnectionsChange }) => {
  const svgRef = useRef();
  const simulationRef = useRef(null);
  const callbackRef = useRef();
  const [isRunning, setIsRunning] = useState(false);

  // Store the callback in a ref to avoid dependency issues
  callbackRef.current = onOptimizedPositionsChange;

  useEffect(() => {
    // Only run this effect once when component mounts
    const initializeGraph = () => {
      const width = window.innerWidth * 0.8;
      const height = 700;

      const svg = d3.select(svgRef.current);
      svg.selectAll('*').remove();

      const g = svg.append('g'); 

      const zoom = d3.zoom().on('zoom', (event) => {
        g.attr('transform', event.transform);
      });
      svg.call(zoom);

      // Use the provided initial positions from data.json, scaled to canvas size
      const nodes = graphData.nodes.map(node => ({
          ...node,
          x: node.x * width,
          y: node.y * height
        }));
      const links = graphData.edges.map(([source, target]) => ({
        source: nodes.find(n => n.id === source),
        target: nodes.find(n => n.id === target)
      }));

      // Build connection map for sidebar
      const connectedMap = {};
      links.forEach(({ source, target }) => {
        if (!connectedMap[source.id]) connectedMap[source.id] = new Set();
        if (!connectedMap[target.id]) connectedMap[target.id] = new Set();
        connectedMap[source.id].add(target.id);
        connectedMap[target.id].add(source.id);
      });

      // Sidebar display - only call once
      onConnectionsChange(
        Object.entries(connectedMap).map(([district, conn]) => ({
          district,
          connected: [...conn].join(', ')
        }))
        .sort((a, b) => a.district.localeCompare(b.district))
      );

    // Normalize positions to [0,1] unit square
    const normalizePositions = (nodes, width, height) => {
      return nodes.map(node => ({
        id: node.id,
        x: parseFloat((node.x / width).toFixed(4)),
        y: parseFloat((node.y / height).toFixed(4))
      }));
    };

    // Simulation setup
    const simulation = d3.forceSimulation(nodes);
    simulationRef.current = simulation;
    simulation
    .force("link", d3.forceLink(links)
      .id(d => d.id)
      .distance(80)    
      .strength(1))     
    .force("charge", d3.forceManyBody()
      .strength(-400)    
      .theta(0.8))      
    .force("center", d3.forceCenter(width / 2, height / 2))
    .force("collision", d3.forceCollide()
      .radius(30)        
      .strength(0.85))  
    .alphaDecay(0.02)    
    .velocityDecay(0.4); 

    // Enforce bounds [0,1]
    simulation.on("tick", () => {
        // Boundary constraints
        nodes.forEach(node => {
          node.x = Math.max(30, Math.min(width - 30, node.x));
          node.y = Math.max(30, Math.min(height - 30, node.y));
        });
      
        // Update visual elements
        link
          .attr("x1", d => d.source.x)
          .attr("y1", d => d.source.y)
          .attr("x2", d => d.target.x)
          .attr("y2", d => d.target.y);
      
        node.attr("cx", d => d.x).attr("cy", d => d.y);
        label.attr("x", d => d.x).attr("y", d => d.y);
      });

    // Final tick: capture optimized positions
    simulation.on('end', () => {
      const normalized = normalizePositions(nodes, width, height);
      if (callbackRef.current) {
        callbackRef.current(normalized);
      }
      console.log('Optimized Positions:', normalized);
    });

    // Render edges
    const link = g.append('g')
      .attr('stroke', '#aaa')
      .attr('stroke-opacity', 0.6)
      .selectAll('line')
      .data(links)
      .join('line')
      .attr('stroke-width', 2);

    // Render nodes
    const node = g.append('g')
      .selectAll('circle')
      .data(nodes)
      .join('circle')
      .attr('r', 10)
      .attr('fill', '#3fa6c5')
      .on('mouseover', function (e, d) {
        node.attr('fill', o =>
          o.id === d.id || connectedMap[d.id]?.has(o.id)
            ? '#ff5722'
            : '#3fa6c5'
        );
        link.attr('stroke', l =>
          l.source.id === d.id || l.target.id === d.id
            ? '#ff5722'
            : '#aaa'
        ).attr('stroke-opacity', l =>
          l.source.id === d.id || l.target.id === d.id
            ? 1
            : 0.3
        );
      })
      .on('mouseout', () => {
        node.attr('fill', '#3fa6c5');
        link.attr('stroke', '#aaa').attr('stroke-opacity', 0.6);
      });

    // Render labels
    const label = g.append('g')
      .selectAll('text')
      .data(nodes)
      .join('text')
      .text(d => d.id)
      .attr('font-size', 12)
      .attr('dx', 15)
      .attr('dy', 4);

    // Stop simulation after stabilization
    simulation.stop();
    setTimeout(() => {
        setIsRunning(true);
        simulation.alpha(1).restart();
        setTimeout(() => {
            simulation.stop();
            setIsRunning(false);
            const normalized = normalizePositions(nodes, width, height);
            if (callbackRef.current) {
              callbackRef.current(normalized);
            }
        }, 3000); 
    }, 100);

      // Show collision circles during debugging
      g.selectAll(".debug")
      .data(nodes)
      .enter()
      .append("circle")
      .attr("class", "debug")
      .attr("r", 30)
      .attr("fill", "none")
      .attr("stroke", "#f00")
      .attr("stroke-opacity", 0.3);
    };

    // Initialize the graph
    initializeGraph();

    // Cleanup function
    return () => {
      if (simulationRef.current) {
        simulationRef.current.stop();
      }
    };
  }, []); 

  const handleReset = () => {
    if (simulationRef.current) {
      setIsRunning(true);
      simulationRef.current.alpha(1).restart();
      setTimeout(() => {
        simulationRef.current.stop();
        setIsRunning(false);
      }, 3000);
    }
  };

  return (
    <div style={{ flex: 1, overflow: 'hidden' }}>
      <div style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
        <button 
          onClick={handleReset}
          disabled={isRunning}
          style={{
            padding: '8px 16px',
            backgroundColor: isRunning ? '#ccc' : '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: isRunning ? 'not-allowed' : 'pointer'
          }}
        >
          {isRunning ? 'Optimizing...' : 'Re-run Optimization'}
        </button>
      </div>
      <svg
        ref={svgRef}
        width="100%"
        height={700}
        style={{ border: '1px solid #ddd', background: '#fefefe' }}
      />
    </div>
  );
};

export default GraphVisualization; 