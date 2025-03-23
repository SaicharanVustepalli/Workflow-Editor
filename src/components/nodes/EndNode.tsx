import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';

const EndNode = memo(({ data }: { data: { label: string } }) => {
  return (
    <div className="px-4 py-2 shadow-md rounded-full bg-red-500 text-white">
      <Handle type="target" position={Position.Top} />
      {data.label}
    </div>
  );
});

export default EndNode;