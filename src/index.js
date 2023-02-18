import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import Rotas from './Rotas';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
   <Rotas/>  {/* aqui fica o controle das rotas */}
  </React.StrictMode>
);
reportWebVitals();
