import { markdownTemplate } from './template'
import type { LanguageOption, Parser } from './index'
import type * as Remark from 'remark'

export interface RemarkOptions {
  mdx?: boolean
  frontmatter?: boolean
}

// @unocss-include
const remarkAst: Parser<typeof Remark, RemarkOptions> = {
  id: 'remark',
  label: 'remark',
  icon: 'https://raw.githubusercontent.com/remarkjs/remark/refs/heads/main/logo-square.svg',
  link: 'https://github.com/remarkjs/remark',
  editorLanguage: 'markdown',
  options: {
    configurable: true,
    defaultValue: {
      mdx: false,
      frontmatter: false,
    },
    editorLanguage: 'json',
  },
  pkgName: 'remark',
  async parse(code, options) {
    let processor = this.remark()
    if (options?.mdx) {
      const { default: remarkMdx } = await importUrl(
        'https://esm.sh/remark-mdx',
      )
      processor = processor.use(remarkMdx)
    }
    if (options?.frontmatter) {
      const { default: remarkFrontmatter } = await importUrl(
        'https://esm.sh/remark-frontmatter',
      )
      processor = processor.use(remarkFrontmatter)
    }
    return processor.parse(code)
  },
  getNodeLocation: genGetNodeLocation('positionOffset'),
  gui: () => import('./RemarkGui.vue'),
}

export const markdown: LanguageOption = {
  label: 'Markdown',
  icon: 'i-vscode-icons:file-type-markdown',
  parsers: [remarkAst],
  codeTemplate: markdownTemplate,
}
