import React from 'react';
import ChatView from './ChatView';
import './App.css';

import { Provider, } from "react-redux";
import configureStore from "./modules/store";

const dataStore = configureStore();


function App() {
  return (
    <Provider store={dataStore}>
      <div className="App">
        <ChatView />        
      </div>
    </Provider>
  );
}

export default App;
