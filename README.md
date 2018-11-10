# sketch-export
A handy workflow to export from sketch

## Installation

Gulp, Homebrew, ImageMagick and GraphicsMagick need to be installed only once.

1. Install Gulp (optional)
```bash
npm install --global gulp-cli
```
2. Install Homebrew (optional)
```bash
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```
3. Install imagemagick & graphicsmagick (optional)
```bash
brew install imagemagick
brew install graphicsmagick
```
4. to use the latest version of sketchtool this must be added to the .bash_profile in the root folder.
```bash
alias sketchmigrate="/Applications/Sketch.app/Contents/Resources/sketchtool/bin/sketchmigrate"
alias sketchtool="/Applications/Sketch.app/Contents/Resources/sketchtool/bin/sketchtool"
```
5. Install dependencies
```bash
npm install
```

## Usage

Currently there are four tasks possible

1. svg-slices
2. sprites
3. png-iphonex
4. png

They are performed on the sketchfiles in the './input'-folder.

### 1. Svg-slices

```bash
gulp svg-slices
```
Exports all *artboards* as cleaned svg. Attributes related to stroke and fill are removed so the exported svg can be styled via css.

### 2. Sprites

```bash
gulp sprites
```
Exports all *artboards* and creates a sprite and demo files on how to use the result.

### 3. png-iphonex

Exports all artboards scaled to the width of 1125px and cropped to 2436px
```bash
gulp png-iphonex
```

### 4. png
Exports all *slices* @2x as png 
```bash
gulp png
```
