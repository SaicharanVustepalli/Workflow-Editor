import React, { useState, useCallback } from 'react';
import { EdgeProps, getBezierPath, useReactFlow } from 'reactflow';

const CustomEdge: React.FC<EdgeProps> = ({
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
  const [isEditing, setIsEditing] = useState(false);
  const [labelText, setLabelText] = useState(data?.label || '');
  const { setEdges } = useReactFlow();

  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const handleLabelClick = useCallback(() => {
    setIsEditing(true);
  }, []);

  const handleLabelChange = useCallback((evt: React.ChangeEvent<HTMLInputElement>) => {
    setLabelText(evt.target.value);
  }, []);

  const handleLabelBlur = useCallback(() => {
    setIsEditing(false);
    setEdges((edges) =>
      edges.map((edge) =>
        edge.id === id ? { ...edge, data: { ...edge.data, label: labelText } } : edge
      )
    );
  }, [id, labelText, setEdges]);

  return (
    <>
      <path
        id={id}
        style={style}
        className="react-flow__edge-path"
        d={edgePath}
        markerEnd={markerEnd}
      />
      {isEditing ? (
        <foreignObject
          x={labelX - 50}
          y={labelY - 15}
          width={100}
          height={30}
          className="edgebutton-foreignobject"
          requiredExtensions="http://www.w3.org/1999/xhtml"
        >
          <input
            type="text"
            value={labelText}
            onChange={handleLabelChange}
            onBlur={handleLabelBlur}
            className="nodrag nopan w-full h-full text-center bg-white border rounded"
            autoFocus
          />
        </foreignObject>
      ) : (
        <text
          x={labelX}
          y={labelY}
          className="react-flow__edge-text cursor-pointer"
          textAnchor="middle"
          dominantBaseline="middle"
          style={{ fill: '#666', fontSize: '12px' }}
          onClick={handleLabelClick}
        >
          {labelText || 'Add label'}
        </text>
      )}
    </>
  );
};

export default CustomEdge;