import {attach, connect, dispatch} from './store.js';
import doApp from './app.js';

attach(doApp,document.getElementById('root'));