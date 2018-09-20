const React = require("react");
const { JssProvider } = require("react-jss");
const { MuiThemeProvider } = require("@material-ui/core/styles");

const createContext = require("./create-context");

let registry;

exports.wrapRootElement = ({ element }, options) => {
  const {
    theme,
    sheetsRegistry,
    generateClassName,
    sheetsManager
  } = createContext(options);

  registry = sheetsRegistry;

  return (
    <JssProvider
      sheetsRegistry={sheetsRegistry}
      generateClassName={generateClassName}
    >
      <MuiThemeProvider theme={theme} sheetsManager={sheetsManager}>
        {element}
      </MuiThemeProvider>
    </JssProvider>
  );
};

exports.onRenderBody = ({ setHeadComponents }) => {
  if (registry) {
    setHeadComponents([
      <style
        type="text/css"
        id="server-side-jss"
        key="server-side-jss"
        dangerouslySetInnerHTML={{
          __html: registry.toString()
        }}
      />
    ]);
  }
};
