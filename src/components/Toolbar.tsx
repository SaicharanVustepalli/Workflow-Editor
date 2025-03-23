import React from 'react';
import { templates } from '../utils/workflowTemplates';

interface ToolbarProps {
  onSave: () => void;
  onLoad: () => void;
  onExport: () => void;
  onTemplateSelect: (templateName: string) => void;
  canUndo: boolean;
  canRedo: boolean;
  onUndo: () => void;
  onRedo: () => void;
}

const Toolbar: React.FC<ToolbarProps> = ({
  onSave,
  onLoad,
  onExport,
  onTemplateSelect,
  canUndo,
  canRedo,
  onUndo,
  onRedo,
}) => {
  return (
    <div className="flex items-center gap-2 p-2 border-b">
      <button
        onClick={onUndo}
        disabled={!canUndo}
        className="px-3 py-1 bg-gray-100 rounded disabled:opacity-50"
      >
        Undo
      </button>
      <button
        onClick={onRedo}
        disabled={!canRedo}
        className="px-3 py-1 bg-gray-100 rounded disabled:opacity-50"
      >
        Redo
      </button>
      <div className="border-l mx-2 h-6" />
      <select
        onChange={(e) => onTemplateSelect(e.target.value)}
        className="px-3 py-1 bg-gray-100 rounded"
      >
        <option value="">Select Template</option>
        {templates.map((template) => (
          <option key={template.name} value={template.name}>
            {template.name}
          </option>
        ))}
      </select>
      <div className="border-l mx-2 h-6" />
      <button onClick={onSave} className="px-3 py-1 bg-blue-500 text-white rounded">
        Save
      </button>
      <button onClick={onLoad} className="px-3 py-1 bg-gray-100 rounded">
        Load
      </button>
      <button onClick={onExport} className="px-3 py-1 bg-gray-100 rounded">
        Export
      </button>
    </div>
  );
};

export default Toolbar;