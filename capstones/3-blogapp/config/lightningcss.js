import browserslist from 'browserslist'
import { bundle, browserslistToTargets } from 'lightningcss'
import path from 'node:path'
import fs from 'node:fs'

let targets = browserslistToTargets(browserslist())

let { code, map } = bundle({
  filename: path.resolve('css/main.css'),
  // minify: true,
  sourceMap: true,
  targets,
})

function compileCss(output, code, map) {
  fs.writeFile(path.resolve(`public/${output}`), code, (err) => {
    if (err) throw err
    console.log(`⚡️ Generated public/${output}`)
  })

  fs.writeFile(path.resolve(`public/${output}.map`), map, (err) => {
    if (err) throw err
    console.log(`⚡️ Generated public/${output}.map`)
  })
}

compileCss('style.css', code, map)
