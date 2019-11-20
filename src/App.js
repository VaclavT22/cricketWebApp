import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer'
import TestFile from './components/TestFile'

function App() {
  return (
    <div className="App">
           <body className='App-body'>
           <img src={logo} className="App-logo" alt="logo" />
           <div className="App-intro">
             <h1>Product to sell List</h1>
           </div>
           </body>
           <Footer />
       </div>
  );
}

export default App;
