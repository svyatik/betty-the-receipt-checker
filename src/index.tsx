import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createStores } from './stores';
import { StoreContext } from './contexts';

import './main.scss';

ReactDOM.render(
  <StoreContext.Provider value={createStores()}>
    <App />
  </StoreContext.Provider>,
  document.getElementById('root')
);
