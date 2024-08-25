import type { Parser } from '..'
import type * as Oxc from '@oxc-parser/wasm/web/oxc_parser_wasm'

export const oxc: Parser<typeof Oxc, Partial<Oxc.ParserOptions>> = {
  id: 'oxc',
  label: 'Oxc',
  icon: 'https://cdn.jsdelivr.net/gh/oxc-project/oxc-assets/logo-square-min.png',
  link: 'https://oxc-project.github.io/docs/guide/usage/parser.html',
  options: {
    configurable: true,
    defaultValue: {
      sourceType: 'module',
      sourceFilename: 'foo.ts',
    },
    editorLanguage: 'json',
  },
  pkgName: '@oxc-parser/wasm',
  init: (pkg) =>
    importJsdelivr(pkg, `/web/oxc_parser_wasm.js`).then(
      async (mod: typeof Oxc) => {
        await mod.default()
        return mod
      },
    ),
  version: fetchVersion,
  parse(code, options) {
    const { program, errors } = this.parseSync(code, { ...options })
    return { program, errors }
  },
  editorLanguage(options) {
    return options.sourceFilename?.endsWith('.ts') ? 'typescript' : 'javascript'
  },
  getAstLocation,
  gui: () => import('./OxcGui.vue'),
}
