# Workflow Editor

A visual workflow editor built with React and React Flow, allowing users to create, edit, and simulate workflow diagrams.

## Features

- Drag and drop nodes to create workflows
- Connect nodes with edges
- Edit node properties
- Validate workflow connections
- Simulate workflow execution
- Undo/Redo functionality
- Export/Import workflows
- Template selection
- Search functionality

## Setup Instructions

1. Install dependencies:

npm install

To Start the development server

npm start

## Project Structure
- /src/components - React components including nodes and editor
- /src/store - State management using Zustand
- /src/types - TypeScript type definitions
- /src/utils - Utility functions for validation and templates
## Node Types
- Start Node : Entry point of the workflow
- Action Node : Represents a task or action
- Decision Node : Represents a conditional branch
- End Node : Terminal point of the workflow
## Usage
1. Drag nodes from the sidebar onto the canvas
2. Connect nodes by dragging from one node's handle to another
3. Click on nodes to edit their properties
4. Use the toolbar to:
   - Save/Load workflows
   - Export workflows as JSON
   - Apply templates
   - Undo/Redo changes
## Simulation
The workflow can be simulated using the simulation panel:

1. Click "Start Simulation" to begin
2. Use "Step Forward" to execute each node
3. View execution logs in the simulation panel
## Validation
The editor validates:

- Node connections
- Workflow structure
- Start/End node requirements
- Cycle detection
## Technologies Used
- React
- React Flow
- TypeScript
- Tailwind CSS
- Zustand
