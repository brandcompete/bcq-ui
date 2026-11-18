// Type declarations for Becquerel UI.
// Used for the unbundled entry (src/lib.js) and copied by `npm run build:bundle`
// to lib/bcq-ui.d.ts and lib/bcq-ui.min.d.ts for the bundled files.

import type { Plugin } from 'vue'

/**
 * Becquerel UI Vue plugin. Registers all `Bc*` components and directives globally.
 *
 * @example
 * import BcqUi from 'bcq-ui'
 * app.use(BcqUi)
 */
declare const BcqUi: Plugin

export default BcqUi
