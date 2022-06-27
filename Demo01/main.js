import { attach, connect } from './store.js';
import doApp from './app.js';

attach(doApp, document.getElementById('root'));
