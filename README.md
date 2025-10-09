# SVG Cleaner
A local, Webpack‑based workflow to **clean and minify SVGs** for E.ON UI.

## What it does
- Reads all `.svg` files from `input/SVG/`.
- Runs **SVGO** (multipass, float precision 4).
- Removes `fill`, `stroke`, and `style` attributes.
- Normalizes file names (spaces → `_`, `ä/ö/ü` → `ae/oe/ue`, lowercased).
- Writes one clean SVG per input file and logs each created file.


## Requirements
- Node.js 18+ (Node 20 recommended)
- Dependencies are listed in `package.json`.

## Install
```bash
npm install
```

## Usage
One‑time export:
```bash
npm run svg:export
```
This will:
- clean `output/eonUI/`,
- process all `input/SVG/*.svg`,
- write cleaned files into `output/eonUI/`,
- print `Created: <filename>.svg` for each file.

## Folder structure
```
input/
  SVG/          # put your raw SVGs here
output/
  eonUI/        # cleaned/minified SVGs are written here
webpack.config.js
package.json
```

## Customization
- Change input/output paths in `webpack.config.js`:
  - `inputDir = path.resolve(__dirname, 'input/SVG')`
  - `outputDir = path.resolve(__dirname, 'output/eonUI')`
- Adjust SVGO options inside `optimize(...)` if needed.

## Troubleshooting
- **`Can't resolve './src'`**  
  The config is plugin‑only. Ensure your `webpack.config.js` sets:
  ```js
  module.exports = {
    mode: 'development',
    entry: {},      // no app bundle, run the plugin only
    plugins: [new SvgExportPlugin()],
  }
  ```
- **No files exported**  
  Make sure `input/SVG/` exists and contains `.svg` files.

## Previously (Gulp)
This project used to provide a Gulp task `gulp svgExport`.  
Gulp and its tasks were removed in favor of the Webpack‑based plugin.