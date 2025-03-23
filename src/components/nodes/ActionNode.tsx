import React from 'react';
import { Handle, Position } from 'reactflow';

const ActionNode = ({ data }: { data: { label: string } }) => {
  return (
    <div className="px-4 py-2 shadow-md rounded-md bg-white border-2 border-blue-500">
      <Handle type="target" position={Position.Top} />
      <div className="font-bold text-sm">{data.label}</div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

export default ActionNode;