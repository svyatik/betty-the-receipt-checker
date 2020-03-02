import React from 'react';
import ReactDOM from 'react-dom';
import App from './src/App';
import { createStores } from './src/stores';
import { StoreContext } from './src/contexts';

import 'bootstrap';

ReactDOM.render(
  <StoreContext.Provider value={createStores()}>
    <App />
  </StoreContext.Provider>,
  document.getElementById('root')
);
