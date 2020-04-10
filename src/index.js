import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery'
import App from './App.js';
import './index.css';

console.log($);

ReactDOM.render(<App />, document.getElementById('root'));

if('serviceWorker' in navigator){
    window.addEventListener('load',()=>{
        navigator.serviceWorker.register('./service-worker.js')
        .then(()=>{
            console.log('successful registeration!')
        })
        .catch(()=>{
            console.log('failed registeration!')
        })
    })
}


