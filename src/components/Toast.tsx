import React from 'react';

interface ToastProps {
  message: string;
  type: 'error' | 'warning' | 'success';
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
  return (
    <div className={`fixed bottom-4 right-4 p-4 rounded-lg shadow-lg ${
      type === 'error' ? 'bg-red-500' :
      type === 'warning' ? 'bg-yellow-500' : 'bg-green-500'
    } text-white`}>
      <p>{message}</p>
      <button onClick={onClose} className="absolute top-1 right-1 text-white">&times;</button>
    </div>
  );
};

export default Toast;