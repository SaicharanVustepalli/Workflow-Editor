import { Edge } from 'reactflow';
import { CustomNode } from '../types/workflow';

interface WorkflowTemplate {
  name: string;
  nodes: CustomNode[];
  edges: Edge[];
}

export const templates: WorkflowTemplate[] = [
  {
    name: 'Basic Flow',
    nodes: [
      {
        id: 'start_1',
        type: 'start',
        position: { x: 250, y: 50 },
        data: { label: 'Start' },
      },
      {
        id: 'action_1',
        type: 'action',
        position: { x: 250, y: 150 },
        data: { label: 'Process' },
      },
      {
        id: 'end_1',
        type: 'end',
        position: { x: 250, y: 250 },
        data: { label: 'End' },
      },
    ],
    edges: [
      { id: 'e1-2', source: 'start_1', target: 'action_1' },
      { id: 'e2-3', source: 'action_1', target: 'end_1' },
    ],
  },
  {
    name: 'Decision Flow',
    nodes: [
      {
        id: 'start_1',
        type: 'start',
        position: { x: 250, y: 50 },
        data: { label: 'Start' },
      },
      {
        id: 'decision_1',
        type: 'decision',
        position: { x: 250, y: 150 },
        data: { label: 'Condition' },
      },
      {
        id: 'action_1',
        type: 'action',
        position: { x: 100, y: 250 },
        data: { label: 'Yes Path' },
      },
      {
        id: 'action_2',
        type: 'action',
        position: { x: 400, y: 250 },
        data: { label: 'No Path' },
      },
      {
        id: 'end_1',
        type: 'end',
        position: { x: 250, y: 350 },
        data: { label: 'End' },
      },
    ],
    edges: [
      { id: 'e1-2', source: 'start_1', target: 'decision_1' },
      { id: 'e2-3', source: 'decision_1', target: 'action_1' },
      { id: 'e2-4', source: 'decision_1', target: 'action_2' },
      { id: 'e3-5', source: 'action_1', target: 'end_1' },
      { id: 'e4-5', source: 'action_2', target: 'end_1' },
    ],
  },
];