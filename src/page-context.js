/* eslint-disable no-underscore-dangle */

import SheetsRegistry from 'jss/lib/SheetsRegistry'
import createGenerateClassName from '@material-ui/core/styles/createGenerateClassName'

function createPageContext (theme) {
  return {
    theme,
    // This is needed in order to deduplicate the injection of CSS in the page.
    sheetsManager: new Map(),
    // This is needed in order to inject the critical CSS.
    sheetsRegistry: new SheetsRegistry(),
    // The standard class name generator.
    generateClassName: createGenerateClassName()
  }
}

module.exports = function getPageContext (theme) {
  // Make sure to create a new context for every server-side request so that data
  // isn't shared between connections (which would be bad).
  if (!process.browser) {
    return createPageContext(theme)
  }

  // Reuse context on the client-side.
  if (!global.__INIT_MATERIAL_UI__) {
    global.__INIT_MATERIAL_UI__ = createPageContext(theme)
  }

  return global.__INIT_MATERIAL_UI__
}
