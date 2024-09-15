import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js'; // Adjust the path according to your project structure
import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';

// Register the app with React Native Web
AppRegistry.registerComponent(appName, () => App);

// Render the app into the DOM
AppRegistry.runApplication(appName, {
  initialProps: {},
  rootTag: document.getElementById('app-root'),
});
