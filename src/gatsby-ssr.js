const React = require("react");
const { JssProvider } = require("react-jss");
const { MuiThemeProvider } = require("@material-ui/core/styles");

const context = require("./page-context");

let registry;

exports.wrapRootElement = ({ element }, options) => {
  const { theme, sheetsRegistry, generateClassName } = context(
    options.theme || {}
  );

  registry = sheetsRegistry;
  return React.createElement(
    JssProvider,
    { sheetsRegistry, generateClassName },
    React.createElement(MuiThemeProvider, { theme, sheetsRegistry }, element)
  );
};

exports.onRenderBody = ({ setHeadComponents }) => {
  if (registry) {
    setHeadComponents([
      React.createElement("style", {
        type: "text/css",
        id: "server-side-jss",
        key: "server-side-jss",
        dangerouslySetInnerHTML: {
          __html: registry.toString()
        }
      })
    ]);
  }
};
