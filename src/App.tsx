import React from 'react';
import './index.css';
import WorkflowEditor from './components/WorkflowEditor';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto p-4">
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Workflow Editor</h1>
        </header>
        <WorkflowEditor />
      </div>
    </div>
  );
}

export default App;
