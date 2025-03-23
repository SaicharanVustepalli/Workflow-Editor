import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';

const StartNode = memo(({ data }: { data: { label: string } }) => {
  return (
    <div className="px-4 py-2 shadow-md rounded-full bg-green-500 text-white">
      <Handle type="source" position={Position.Bottom} />
      {data.label}
    </div>
  );
});

export default StartNode;