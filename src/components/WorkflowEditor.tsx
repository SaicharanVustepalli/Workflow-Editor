import React, { useCallback, useEffect, useState } from 'react';
import ReactFlow, { 
  Background, 
  Controls,
  MiniMap,
  addEdge,
  Connection,
  useKeyPress,
  Node,
  Edge,
  NodeChange,
  EdgeChange,
  OnNodesChange,
  OnEdgesChange,
  NodeMouseHandler,
  applyNodeChanges,
  applyEdgeChanges,
  useReactFlow,
  OnConnectStart,
  OnConnectEnd,
} from 'reactflow';
import { useWorkflowStore } from '../store/workflowStore';
import { CustomNode } from '../types/workflow';
import Toolbar from './Toolbar';
import 'reactflow/dist/style.css';
import ActionNode from './nodes/ActionNode';
import DecisionNode from './nodes/DecisionNode';
import Sidebar from './Sidebar';
import NodeEditor from './NodeEditor';
import { ReactFlowProvider } from 'reactflow';
import { validateConnection } from '../utils/workflowValidation';
import Toast from './Toast';
import ValidationPanel from './ValidationPanel';
import StartNode from './nodes/StartNode';
import EndNode from './nodes/EndNode';
import { templates } from '../utils/workflowTemplates';
import Search from './Search';
import SimulationPanel from './SimulationPanel';
import StyledEdge from './edges/StyledEdge';

// Remove the duplicate CustomNode import from line 74
const nodeTypes = {
  action: ActionNode,
  decision: DecisionNode,
  start: StartNode,
  end: EndNode,
};

// Remove this standalone MiniMap component
// Update MiniMap colors
// <MiniMap
//   nodeColor={(node) => {
//     switch (node.type) {
//       case 'start':
//         return '#22c55e';
//       case 'end':
//         return '#ef4444';
//       case 'action':
//         return '#6366f1';
//       case 'decision':
//         return '#f59e0b';
//       default:
//         return '#10b981';
//     }
//   }}
//   nodeStrokeWidth={3}
//   zoomable
//   pannable
// />

// Remove this section
// First, move the CustomNode import to the top with other imports
// import { CustomNode } from '../types/workflow';

const initialNodes: CustomNode[] = [
  {
    id: '1',
    type: 'action',
    position: { x: 250, y: 100 },
    data: { label: 'Action Node' },
  },
  {
    id: '2',
    type: 'decision',
    position: { x: 250, y: 200 },
    data: { label: 'Decision Node' },
  },
];

const initialEdges: Edge[] = [
  { id: 'e1-2', source: '1', target: '2' },
];

// Add edgeTypes definition near other type definitions
const edgeTypes = {
  default: StyledEdge,
};

const Flow = () => {
  const reactFlowInstance = useReactFlow();
  
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const deletePressed = useKeyPress('Delete');
  const { 
    nodes, 
    edges,
    selectedNode,
    setSelectedNode,
    setNodes: setStoreNodes,
    setEdges: setStoreEdges,
  } = useWorkflowStore();

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => {
      const updatedNodes = applyNodeChanges(changes, nodes) as CustomNode[];
      setStoreNodes(updatedNodes);
    },
    [nodes, setStoreNodes]
  );

  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => {
      const updatedEdges = applyEdgeChanges(changes, edges);
      setStoreEdges(updatedEdges);
    },
    [edges, setStoreEdges]
  );

  const onConnect = useCallback(
    (params: Connection) => {
      const sourceNode = nodes.find(node => node.id === params.source);
      const targetNode = nodes.find(node => node.id === params.target);
  
      if (sourceNode && targetNode && params.source && params.target) {
        const newEdge: Edge = {
          id: `e${params.source}-${params.target}`,
          source: params.source,
          target: params.target,
          sourceHandle: params.sourceHandle || null,
          targetHandle: params.targetHandle || null,
          type: 'default',
          animated: true,
          style: { stroke: '#666', strokeWidth: 2 },
        };
        setStoreEdges([...edges, newEdge]);
      }
    },
    [nodes, edges, setStoreEdges]
  );

  const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      const reactFlowBounds = event.currentTarget.getBoundingClientRect();
      const type = event.dataTransfer.getData('application/reactflow');
      if (!type) return;

      const position = {
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      };

      const newNode: CustomNode = {
        id: `${type}_${Date.now()}`,
        type,
        position,
        data: { label: `${type.charAt(0).toUpperCase() + type.slice(1)} Node` },
      };

      setStoreNodes([...nodes, newNode]);
    },
    [nodes, setStoreNodes]
  );

  const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    setSelectedNode(node as CustomNode);
  }, [setSelectedNode]);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      onDragOver={onDragOver}
      onDrop={onDrop}
      onNodeClick={onNodeClick}
      nodeTypes={nodeTypes}
      edgeTypes={edgeTypes}
      deleteKeyCode="Delete"
      fitView
      snapToGrid
      snapGrid={[15, 15]}
      defaultEdgeOptions={{
        type: 'default',
        animated: true,
        style: { stroke: '#666', strokeWidth: 2 }
      }}
    >
      <Background />
      <Controls />
      <MiniMap
        nodeColor={(node) => {
          switch (node.type) {
            case 'action':
              return '#6366f1';
            case 'decision':
              return '#f59e0b';
            default:
              return '#10b981';
          }
        }}
        nodeStrokeWidth={3}
        zoomable
        pannable
      />
    </ReactFlow>
  );
};

const WorkflowEditor = () => {
  const { 
    nodes, 
    edges,
    selectedNode,
    saveWorkflow,
    loadWorkflow,
    setNodes,
    setEdges,
    undo,
    redo,
    history 
  }: {
    nodes: CustomNode[];
    edges: Edge[];
    selectedNode: CustomNode | null;
    saveWorkflow: () => void;
    loadWorkflow: () => void;
    setNodes: (nodes: CustomNode[]) => void;
    setEdges: (edges: Edge[]) => void;
    undo: () => void;
    redo: () => void;
    history: {
      past: { nodes: CustomNode[]; edges: Edge[] }[];
      future: { nodes: CustomNode[]; edges: Edge[] }[];
    };
  } = useWorkflowStore();

  // Add keyboard shortcuts for undo/redo
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === 'z') {
        event.preventDefault();
        if (event.shiftKey) {
          redo();
        } else {
          undo();
        }
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [undo, redo]);

  const onUpdateNode = useCallback(
    (id: string, data: any) => {
      setNodes(
        nodes.map((node: CustomNode) => (node.id === id ? { ...node, data } : node))
      );
    },
    [nodes, setNodes]
  );

  const handleExport = useCallback(() => {
    const dataStr = JSON.stringify({ nodes, edges }, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.download = 'workflow.json';
    link.href = url;
    link.click();
  }, [nodes, edges]);

  const handleTemplateSelect = useCallback((templateName: string) => {
    if (!templateName) return;
    const template = templates.find(t => t.name === templateName);
    if (template) {
      setNodes(template.nodes as CustomNode[]);
      setEdges(template.edges);
    }
  }, [setNodes, setEdges]);

  return (
    <ReactFlowProvider>
      <div className="flex flex-col h-[600px] bg-white rounded-lg shadow-lg">
        <Toolbar 
          onSave={saveWorkflow}
          onLoad={loadWorkflow}
          onExport={handleExport}
          onTemplateSelect={handleTemplateSelect}
          canUndo={history.past.length > 0}
          canRedo={history.future.length > 0}
          onUndo={undo}
          onRedo={redo}
        />
        <Search />
        <div className="flex flex-1">
          <Sidebar />
          <div className="flex-1 flex flex-col">
            <div className="flex-1">
              <Flow />
            </div>
            <ValidationPanel nodes={nodes} edges={edges} />
            <SimulationPanel nodes={nodes} edges={edges} />
          </div>
          <NodeEditor selectedNode={selectedNode} onUpdateNode={onUpdateNode} />
        </div>
      </div>
    </ReactFlowProvider>
  );
};

export default WorkflowEditor;