import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import {AppProvider} from './components/items/contextapi/Context'
ReactDOM.render(
  <AppProvider>
    <App />
  </AppProvider>
  ,document.getElementById('root')
);



