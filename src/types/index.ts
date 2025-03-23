import { Node, Edge } from '@xyflow/react';

export type NodeType = 'action' | 'decision' | 'start' | 'end';

export interface CustomNode extends Node {
  type: NodeType;
  data: {
    label: string;
    description?: string;
    properties?: Record<string, any>;
  };
}

export interface WorkflowState {
  nodes: CustomNode[];
  edges: Edge[];
  selectedNode: CustomNode | null;
  addNode: (node: CustomNode) => void;
  updateNode: (id: string, data: Partial<CustomNode['data']>) => void;
  removeNode: (id: string) => void;
  addEdge: (edge: Edge) => void;
  removeEdge: (id: string) => void;
  setSelectedNode: (node: CustomNode | null) => void;
  clearWorkflow: () => void;
}