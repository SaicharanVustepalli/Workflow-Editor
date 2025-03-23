import React from 'react';

const Sidebar = () => {
  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    // Clear any existing data
    event.dataTransfer.clearData();
    
    // Set the node type as transfer data
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
    
    // Add a drag preview image (optional)
    if (event.dataTransfer.setDragImage) {
      const preview = event.currentTarget.cloneNode(true) as HTMLElement;
      preview.style.opacity = '0.5';
      document.body.appendChild(preview);
      event.dataTransfer.setDragImage(preview, 0, 0);
      setTimeout(() => document.body.removeChild(preview), 0);
    }
  };

  return (
    <aside className="w-48 bg-white p-4 border-r">
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Nodes</h3>
        <div 
          className="bg-indigo-100 p-2 mb-2 rounded cursor-grab active:cursor-grabbing"
          draggable={true}
          onDragStart={(e) => onDragStart(e, 'action')}
        >
          Action Node
        </div>
        <div 
          className="bg-yellow-100 p-2 mb-2 rounded cursor-grab active:cursor-grabbing"
          draggable={true}
          onDragStart={(e) => onDragStart(e, 'decision')}
        >
          Decision Node
        </div>
        <div 
          className="bg-green-100 p-2 mb-2 rounded cursor-grab active:cursor-grabbing"
          draggable={true}
          onDragStart={(e) => onDragStart(e, 'start')}
        >
          Start Node
        </div>
        <div 
          className="bg-red-100 p-2 rounded cursor-grab active:cursor-grabbing"
          draggable={true}
          onDragStart={(e) => onDragStart(e, 'end')}
        >
          End Node
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;