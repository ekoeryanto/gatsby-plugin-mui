const React = require("react");
const { MuiThemeProvider } = require("@material-ui/core/styles");
const context = require("./page-context");

exports.onInitialClientRender = () => {
  const jssheets = document.getElementById("server-side-jss");
  if (jssheets && jssheets.parentNode) {
    jssheets.parentNode.removeChild(jssheets);
  }
};

exports.wrapRootElement = ({ element }, options) => {
  const { theme, sheetsManager } = context(options.theme || {});
  return React.createElement(
    MuiThemeProvider,
    { theme, sheetsManager },
    element
  );
};
