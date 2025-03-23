import React from 'react';
import { Node, Edge } from 'reactflow';

interface ValidationPanelProps {
  nodes: Node[];
  edges: Edge[];
}

const ValidationPanel: React.FC<ValidationPanelProps> = ({ nodes, edges }) => {
  const validateWorkflow = () => {
    const issues = [];

    // Check for isolated nodes
    const connectedNodes = new Set(edges.flatMap(edge => [edge.source, edge.target]));
    const isolatedNodes = nodes.filter(node => !connectedNodes.has(node.id));
    if (isolatedNodes.length > 0) {
      issues.push(`Found ${isolatedNodes.length} disconnected node(s)`);
    }

    // Check for nodes without outgoing connections
    const nodesWithoutOutgoing = nodes.filter(node => 
      node.type !== 'decision' && !edges.some(edge => edge.source === node.id)
    );
    if (nodesWithoutOutgoing.length > 0) {
      issues.push(`Found ${nodesWithoutOutgoing.length} node(s) without outgoing connections`);
    }

    return issues;
  };

  const issues = validateWorkflow();

  return (
    <div className="p-4 bg-white shadow rounded-lg">
      <h3 className="text-lg font-semibold mb-2">Workflow Validation</h3>
      {issues.length === 0 ? (
        <p className="text-green-600">No issues found</p>
      ) : (
        <ul className="list-disc pl-5">
          {issues.map((issue, index) => (
            <li key={index} className="text-red-600">{issue}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ValidationPanel;