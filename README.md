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
5. Install dependencies
```bash
npm install
```

## Usage

Currently there is on tasks possible

1. svgExport

This will optimise all svg in the input/SVG folder and create a folder
output
--eonUI
----darkgrey
----nofill
----white

The SVG in the nofill folder can be added to eon-ui