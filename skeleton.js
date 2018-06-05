const fs = require('fs')
const path = require('path')
const htmlMinifier = require('html-minifier')
const createBundleRenderer = require('vue-server-renderer').createBundleRenderer
// 读取`skeleton.json`，以`index.html`为模板写入内容
const renderer = createBundleRenderer(path.resolve(__dirname, './dist/skeleton.json'), {template: fs.readFileSync(path.resolve(__dirname, './index.html'), 'utf-8')})
// 把上一步模板完成的内容写入（替换）`index.html`
renderer.renderToString({}, (err, html) => {
  html = htmlMinifier.minify(html, { collapseWhitespace: true, minifyCSS: true})
  fs.writeFileSync('index.html', html, 'utf-8')
})