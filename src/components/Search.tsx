import React, { useState, useCallback } from 'react';
import { useReactFlow } from 'reactflow';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { getNodes, setCenter } = useReactFlow();

  const handleSearch = useCallback(() => {
    const nodes = getNodes();
    const matchingNode = nodes.find(node => 
      node.data.label.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (matchingNode) {
      setCenter(matchingNode.position.x, matchingNode.position.y, { zoom: 1.5, duration: 800 });
    }
  }, [searchTerm, getNodes, setCenter]);

  return (
    <div className="flex gap-2 p-2">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search nodes..."
        className="px-3 py-1 border rounded"
      />
      <button
        onClick={handleSearch}
        className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Find
      </button>
    </div>
  );
};

export default Search;