# Gatsby Plugin MUI
MaterialUI plugin for Gatsby 2

## Installation
```bash
yarn add gatsby-plugin-mui react-jss @material-ui/core
```

## Configuration
```js
const { createMuiTheme } = require("@material-ui/core/styles");

module.exports = {
  plugins: [
    {
      resolve: `gatsby-plugin-mui`,
      options: {
        theme: createMuiTheme({
          // custom theme
        })
      }
    }
  ]
}
```
