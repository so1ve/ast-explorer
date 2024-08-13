import { wxmlTemplate } from './template'
import type { Parser } from '.'

export const wxmlParser: Parser<any, any> = {
  id: 'wxml-parser',
  label: '@wxml/parser',
  icon: 'i-vscode-icons:file-type-wxml',
  link: 'https://github.com/wxmlfile/wxml-parser',
  options: {
    configurable: false,
    defaultValue: {},
    editorLanguage: 'json',
  },
  pkgName: '@wxml/parser',
  init: (pkg) =>
    importUrl(`https://cdn.jsdelivr.net/npm/${pkg}/+esm`).then(
      (mod) => mod.default,
    ),
  version: fetchVersion,
  parse(code) {
    return this.parse(code)
  },
  editorLanguage: 'html',
  getAstLocation,
}

export const wxml: LanguageOption = {
  label: 'WXML',
  // @unocss-include
  icon: 'i-vscode-icons:file-type-wxml',
  parsers: [wxmlParser],
  codeTemplate: wxmlTemplate,
}
