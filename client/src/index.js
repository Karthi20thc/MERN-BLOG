import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { ContextProvider } from './context/Context';

// const Root = ReactDOM.createRoot(document.getElementById('root'))
// Root.render(
//  <ContextProvider>
//   <App />
//  </ContextProvider>
// );

ReactDOM.render(
 <React.StrictMode>
  <ContextProvider>
   <App />
  </ContextProvider>
 </React.StrictMode>,
 document.getElementById("root")
);