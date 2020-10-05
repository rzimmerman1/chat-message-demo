import React from 'react';
import ChatView from './ChatView';
import './App.css';
import Header from './components/Header';


import { Provider, } from "react-redux";
import configureStore from "./modules/store";

const dataStore = configureStore();


function App() {
  return (
    <Provider store={dataStore}>
      <ChatView />        
    </Provider>
  );
}

export default App;
