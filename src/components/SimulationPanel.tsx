import React, { useState, useCallback } from 'react';
import { Edge } from 'reactflow';
import { CustomNode } from '../types/workflow';

interface SimulationPanelProps {
  nodes: CustomNode[];
  edges: Edge[];
}

const SimulationPanel: React.FC<SimulationPanelProps> = ({ nodes, edges }) => {
  const [activeNodeId, setActiveNodeId] = useState<string | null>(null);
  const [simulationLog, setSimulationLog] = useState<string[]>([]);

  const startSimulation = useCallback(() => {
    setSimulationLog([]);
    const startNode = nodes.find(node => node.type === 'start');
    if (startNode) {
      setActiveNodeId(startNode.id);
      setSimulationLog(prev => [...prev, `Starting at: ${startNode.data.label}`]);
    }
  }, [nodes]);

  const stepSimulation = useCallback(() => {
    if (!activeNodeId) return;

    const currentNode = nodes.find(node => node.id === activeNodeId);
    if (!currentNode) return;

    const outgoingEdges = edges.filter(edge => edge.source === activeNodeId);
    
    if (outgoingEdges.length === 0) {
      setSimulationLog(prev => [...prev, 'Simulation complete']);
      setActiveNodeId(null);
      return;
    }

    let nextEdge = outgoingEdges[0];
    if (currentNode.type === 'decision') {
      // Randomly choose a path for demonstration
      nextEdge = outgoingEdges[Math.floor(Math.random() * outgoingEdges.length)];
    }

    const nextNode = nodes.find(node => node.id === nextEdge.target);
    if (nextNode) {
      setActiveNodeId(nextNode.id);
      setSimulationLog(prev => [...prev, `Executing: ${nextNode.data.label}`]);
    }
  }, [activeNodeId, nodes, edges]);

  return (
    <div className="p-4 border-t">
      <div className="flex gap-2 mb-4">
        <button
          onClick={startSimulation}
          className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
          disabled={!!activeNodeId}
        >
          Start Simulation
        </button>
        <button
          onClick={stepSimulation}
          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
          disabled={!activeNodeId}
        >
          Step Forward
        </button>
      </div>
      <div className="h-32 overflow-y-auto border rounded p-2">
        {simulationLog.map((log, index) => (
          <div key={index} className="text-sm">{log}</div>
        ))}
      </div>
    </div>
  );
};

export default SimulationPanel;