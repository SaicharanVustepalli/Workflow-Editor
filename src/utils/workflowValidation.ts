import { Edge } from 'reactflow';
import { CustomNode } from '../types/workflow';

export const validateConnection = (
  sourceNode: CustomNode | null,
  targetNode: CustomNode | null,
  edges: Edge[]
): boolean => {
  if (!sourceNode || !targetNode) return false;

  // Start node can't have incoming connections
  if (targetNode.type === 'start') return false;

  // End node can't have outgoing connections
  if (sourceNode.type === 'end') return false;

  // Prevent self-connections
  if (sourceNode.id === targetNode.id) return false;

  // Prevent duplicate connections
  const isDuplicate = edges.some(
    edge => edge.source === sourceNode.id && edge.target === targetNode.id
  );
  if (isDuplicate) return false;

  // Decision nodes must have at least two outgoing connections
  if (sourceNode.type === 'decision') {
    const existingOutgoing = edges.filter(edge => edge.source === sourceNode.id);
    if (existingOutgoing.length >= 2) return false;
  }

  return true;
};

export const validateWorkflow = (nodes: CustomNode[], edges: Edge[]): string[] => {
  const errors: string[] = [];

  // Check for start node
  const startNodes = nodes.filter(node => node.type === 'start');
  if (startNodes.length === 0) {
    errors.push('Workflow must have a start node');
  } else if (startNodes.length > 1) {
    errors.push('Workflow cannot have multiple start nodes');
  }

  // Check for end node
  const endNodes = nodes.filter(node => node.type === 'end');
  if (endNodes.length === 0) {
    errors.push('Workflow must have an end node');
  }

  // Check for disconnected nodes
  nodes.forEach(node => {
    const hasIncoming = edges.some(edge => edge.target === node.id);
    const hasOutgoing = edges.some(edge => edge.source === node.id);

    if (node.type !== 'start' && !hasIncoming) {
      errors.push(`Node "${node.data.label}" has no incoming connections`);
    }

    if (node.type !== 'end' && !hasOutgoing) {
      errors.push(`Node "${node.data.label}" has no outgoing connections`);
    }
  });

  // Check decision nodes
  const decisionNodes = nodes.filter(node => node.type === 'decision');
  decisionNodes.forEach(node => {
    const outgoingEdges = edges.filter(edge => edge.source === node.id);
    if (outgoingEdges.length < 2) {
      errors.push(`Decision node "${node.data.label}" must have at least two outgoing connections`);
    }
  });

  return errors;
};