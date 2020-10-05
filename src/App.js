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
        
        {/** Icons made by <a href="http://www.freepik.com/" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a> **/}
      </div>
    </Provider>
  );
}

export default App;
