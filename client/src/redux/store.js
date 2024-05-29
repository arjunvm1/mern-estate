import { combineReducers, configureStore } from '@reduxjs/toolkit'; 
import userReducer from './user/userSlice';
import { persistReducer } from 'redux-persist'; 
import storage from 'redux-persist/lib/storage'; 
import persistStore from 'redux-persist/es/persistStore'; 
// Combining reducers into a root reducer
const rootReducer = combineReducers({ user:  userReducer });

// Configuration for Redux state persistence
const persistConfig = {
  key: "root", // Key for the storage
  storage, // Storage mechanism (localStorage, AsyncStorage, etc.)
  version: 1, // Version of the persisted state
};

// Creating a persisted reducer using persistReducer function
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configuring the Redux store with persisted reducer and middleware
export const store = configureStore({
  reducer: persistedReducer, // Using the persisted reducer
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Required by Redux Toolkit to work with Electron and Immer
    }),
});

// Creating a persistor for managing persistence
export const persistor = persistStore(store); 
