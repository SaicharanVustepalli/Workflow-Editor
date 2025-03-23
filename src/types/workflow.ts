import { Node } from 'reactflow';

export interface CustomNode extends Node {
  id: string;
  type: string;
  position: { x: number; y: number };
  data: {
    label: string;
    actionType?: string;
    description?: string;
    conditionType?: string;
    expression?: string;
  };
}