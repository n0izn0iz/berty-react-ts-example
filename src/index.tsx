import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import protobuf from 'protobufjs'

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

protobuf.util.toJSONOptions = { longs: String, enums: Number, json: true }

const container = document.getElementById('root');

if (!container) {
  console.error("React root not found!")
} else {
  const root = ReactDOMClient.createRoot(container);

  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );

  // If you want to start measuring performance in your app, pass a function
  // to log results (for example: reportWebVitals(console.log))
  // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
  reportWebVitals();
}