import React from 'react';
import { EdgeProps, getBezierPath } from 'reactflow';

const StyledEdge: React.FC<EdgeProps> = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
  style = {},
  markerEnd,
}) => {
  const [edgePath] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const getEdgeStyle = () => {
    const baseStyle = {
      strokeWidth: 2,
      ...style,
    };

    switch (data?.type) {
      case 'success':
        return { ...baseStyle, stroke: '#22c55e' };
      case 'failure':
        return { ...baseStyle, stroke: '#ef4444' };
      case 'conditional':
        return { ...baseStyle, stroke: '#f59e0b', strokeDasharray: '5,5' };
      default:
        return { ...baseStyle, stroke: '#6366f1' };
    }
  };

  return (
    <path
      id={id}
      style={getEdgeStyle()}
      className="react-flow__edge-path"
      d={edgePath}
      markerEnd={markerEnd}
    />
  );
};

export default StyledEdge;