import React from 'react';
import { CustomNode } from '../types/workflow';

interface NodeEditorProps {
  selectedNode: CustomNode | null;
  onUpdateNode: (id: string, data: any) => void;
}

const NodeEditor: React.FC<NodeEditorProps> = ({ selectedNode, onUpdateNode }) => {
  if (!selectedNode) {
    return (
      <div className="w-64 p-4 border-l">
        <p className="text-gray-500">Select a node to edit its properties</p>
      </div>
    );
  }

  const handleLabelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdateNode(selectedNode.id, { ...selectedNode.data, label: e.target.value });
  };

  const renderNodeSpecificProperties = () => {
    switch (selectedNode.type) {
      case 'action':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Action Type</label>
              <select 
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                value={selectedNode.data.actionType || 'default'}
                onChange={(e) => onUpdateNode(selectedNode.id, { 
                  ...selectedNode.data, 
                  actionType: e.target.value 
                })}
              >
                <option value="default">Default Action</option>
                <option value="api">API Call</option>
                <option value="notification">Send Notification</option>
                <option value="email">Send Email</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                value={selectedNode.data.description || ''}
                onChange={(e) => onUpdateNode(selectedNode.id, {
                  ...selectedNode.data,
                  description: e.target.value
                })}
                rows={3}
              />
            </div>
          </div>
        );

      case 'decision':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Condition Type</label>
              <select
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                value={selectedNode.data.conditionType || 'boolean'}
                onChange={(e) => onUpdateNode(selectedNode.id, {
                  ...selectedNode.data,
                  conditionType: e.target.value
                })}
              >
                <option value="boolean">Boolean</option>
                <option value="numeric">Numeric Comparison</option>
                <option value="string">String Match</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Expression</label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                value={selectedNode.data.expression || ''}
                onChange={(e) => onUpdateNode(selectedNode.id, {
                  ...selectedNode.data,
                  expression: e.target.value
                })}
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="w-64 p-4 border-l space-y-4">
      <h3 className="text-lg font-medium">Node Properties</h3>
      <div>
        <label className="block text-sm font-medium text-gray-700">Label</label>
        <input
          type="text"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          value={selectedNode.data.label}
          onChange={handleLabelChange}
        />
      </div>
      {renderNodeSpecificProperties()}
    </div>
  );
};

export default NodeEditor;