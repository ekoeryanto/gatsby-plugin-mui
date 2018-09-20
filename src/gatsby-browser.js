const React = require("react");
const MuiThemeProvider = require("@material-ui/core/styles").MuiThemeProvider;

const createContext = require("./create-context");

exports.onInitialClientRender = () => {
  const jssheets = document.getElementById("server-side-jss");
  if (jssheets && jssheets.parentNode) {
    jssheets.parentNode.removeChild(jssheets);
  }
};

exports.wrapRootElement = ({ element }, options) => {
  if (!global.__INIT_MATERIAL_UI__) {
    global.__INIT_MATERIAL_UI__ = createContext(options);
  }

  const { theme, sheetsManager } = global.__INIT_MATERIAL_UI__;

  return (
    <MuiThemeProvider theme={theme} sheetsManager={sheetsManager}>
      {element}
    </MuiThemeProvider>
  );
};
