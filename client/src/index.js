import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
    <a href="http://10.10.221.63:3001/donate">Link to exact page</a>
  </React.StrictMode>
);
