import React from 'react';
import { createStores } from '../stores';

export const StoreContext = React.createContext(createStores());
