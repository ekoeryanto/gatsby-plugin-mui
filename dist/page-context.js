'use strict';

var reactJss = require('react-jss');
var styles = require('@material-ui/core/styles');

/* eslint-disable no-underscore-dangle */

function createPageContext(theme) {
  return {
    theme: theme,
    // This is needed in order to deduplicate the injection of CSS in the page.
    sheetsManager: new Map(),
    // This is needed in order to inject the critical CSS.
    sheetsRegistry: new reactJss.SheetsRegistry(),
    // The standard class name generator.
    generateClassName: styles.createGenerateClassName()
  };
}

function getPageContext() {
  // Make sure to create a new context for every server-side request so that data
  // isn't shared between connections (which would be bad).
  if (!process.browser) {
    return createPageContext();
  } // Reuse context on the client-side.


  if (!global.__INIT_MATERIAL_UI__) {
    global.__INIT_MATERIAL_UI__ = createPageContext();
  }

  return global.__INIT_MATERIAL_UI__;
}

module.exports = getPageContext;
