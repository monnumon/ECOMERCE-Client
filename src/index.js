import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import{ BrowserRouter } from "react-router-dom";
import 'antd/dist/antd.css';
import "../node_modules/bootstrap/dist/css/bootstrap.css"
import 'mdbreact/dist/css/mdb.css'


import {createStore} from "redux"
import { Provider } from 'react-redux';
import {composeWithDevTools} from "redux-devtools-extension"
import  rootReducer  from './reducers';

//store
const store = createStore(rootReducer, composeWithDevTools())


ReactDOM.render(
  // <Provider store={store}></Provider> cho phép các file khác truy cập vào redux
  <Provider store={store}> 
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  // </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
