'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var reactJss = require('react-jss');
var styles = require('@material-ui/core/styles');
var React = _interopDefault(require('react'));

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

/* eslint-disable react/prop-types, react/destructuring-assignment */

var Wrapper = function Wrapper(props) {
  var _theme = props.theme,
      children = props.children;

  var _context = getPageContext(_theme),
      theme = _context.theme,
      sheetsManager = _context.sheetsManager;

  return React.createElement(styles.MuiThemeProvider, {
    theme: theme,
    sheetsManager: sheetsManager
  }, children);
};

module.exports = Wrapper;
