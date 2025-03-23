import React from 'react';
import { Handle, Position } from 'reactflow';

const DecisionNode = ({ data }: { data: { label: string } }) => {
  return (
    <div className="relative">
      <div
        className="border-2 border-yellow-500 bg-yellow-100 p-4 min-w-[150px] min-h-[80px] flex items-center justify-center"
        style={{
          clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
          transform: 'rotate(0deg)',
        }}
      >
        <div className="text-center">{data.label}</div>
      </div>
      <Handle type="target" position={Position.Top} className="w-2 h-2" />
      <Handle type="source" position={Position.Bottom} className="w-2 h-2" />
      <Handle type="source" position={Position.Right} className="w-2 h-2" />
      <Handle type="source" position={Position.Left} className="w-2 h-2" />
    </div>
  );
};

export default DecisionNode;