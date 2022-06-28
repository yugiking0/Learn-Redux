import { attach, connect } from './store.js';
import doApp from './app2.js';

attach(doApp, document.getElementById('root'));
