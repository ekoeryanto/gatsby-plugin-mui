const SheetsRegistry = require("react-jss").SheetsRegistry;
const createGenerateClassName = require("@material-ui/core/styles")
  .createGenerateClassName;
const createMuiTheme = require("@material-ui/core/styles").createMuiTheme;

module.exports = options => ({
  theme: createMuiTheme({
    palette: {
      primary: {
        main: "#663399"
      },
      secondary: {
        main: "#ffb238"
      }
    }
  }),
  // This is needed in order to deduplicate the injection of CSS in the page.
  sheetsManager: new Map(),
  // This is needed in order to inject the critical CSS.
  sheetsRegistry: new SheetsRegistry(),
  // The standard class name generator.
  generateClassName: createGenerateClassName(),
  ...(options || {})
});
