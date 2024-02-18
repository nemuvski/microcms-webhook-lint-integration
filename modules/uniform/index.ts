import { type HTMLBeautifyOptions, html_beautify as htmlBeautify } from 'js-beautify'

const options: HTMLBeautifyOptions = {
  end_with_newline: false,
  indent_with_tabs: true,
}

function uniformize(htmlText: string) {
  return htmlBeautify(htmlText, options)
}

export { uniformize }
