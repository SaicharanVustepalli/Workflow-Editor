import { create } from 'zustand';
import { Edge } from 'reactflow';
import { CustomNode } from '../types/workflow';

interface WorkflowState {
  nodes: CustomNode[];
  edges: Edge[];
  selectedNode: CustomNode | null;
  history: {
    past: { nodes: CustomNode[]; edges: Edge[] }[];
    future: { nodes: CustomNode[]; edges: Edge[] }[];
  };
  setNodes: (nodes: CustomNode[]) => void;
  setEdges: (edges: Edge[]) => void;
  setSelectedNode: (node: CustomNode | null) => void;
  saveWorkflow: () => void;
  loadWorkflow: () => void;
  undo: () => void;
  redo: () => void;
}

export const useWorkflowStore = create<WorkflowState>((set, get) => ({
  nodes: [],
  edges: [],
  selectedNode: null,
  history: {
    past: [],
    future: [],
  },
  setNodes: (nodes: CustomNode[]) => {
    set((state) => {
      if (nodes === state.nodes) return state;
      return {
        nodes,
        history: {
          past: state.history.past.length >= 100 
            ? state.history.past.slice(-99).concat({ nodes: state.nodes, edges: state.edges })
            : [...state.history.past, { nodes: state.nodes, edges: state.edges }],
          future: [],
        },
      };
    });
  },
  setEdges: (edges: Edge[]) => {
    set((state) => {
      if (edges === state.edges) return state;
      return {
        edges,
        history: {
          past: state.history.past.length >= 100 
            ? state.history.past.slice(-99).concat({ nodes: state.nodes, edges: state.edges })
            : [...state.history.past, { nodes: state.nodes, edges: state.edges }],
          future: [],
        },
      };
    });
  },
  setSelectedNode: (node: CustomNode | null) => set({ selectedNode: node }),
  saveWorkflow: () => {
    const state = get();
    localStorage.setItem('workflow', JSON.stringify({ nodes: state.nodes, edges: state.edges }));
  },
  loadWorkflow: () => {
    const saved = localStorage.getItem('workflow');
    if (saved) {
      const { nodes, edges } = JSON.parse(saved);
      set({ nodes: nodes as CustomNode[], edges });
    }
  },
  undo: () => {
    const state = get();
    if (state.history.past.length === 0) return;

    const previous = state.history.past[state.history.past.length - 1];
    set({
      nodes: previous.nodes,
      edges: previous.edges,
      history: {
        past: state.history.past.slice(0, -1),
        future: [{ nodes: state.nodes, edges: state.edges }, ...state.history.future],
      },
    });
  },
  redo: () => {
    const state = get();
    if (state.history.future.length === 0) return;

    const next = state.history.future[0];
    set({
      nodes: next.nodes,
      edges: next.edges,
      history: {
        past: [...state.history.past, { nodes: state.nodes, edges: state.edges }],
        future: state.history.future.slice(1),
      },
    });
  },
}));