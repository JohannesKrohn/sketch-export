const gulp = require('gulp'),
    svgo = require('gulp-svgo'),
    cheerio = require('gulp-cheerio'),
    del = require('del'),
    svgSprite = require("gulp-svg-sprite"),
    svgmin = require('gulp-svgmin'),
    rename = require('gulp-rename'),
    fs = require('fs'),
    $fill1 = "#fff",
    $fill3 = "#39393A",
    $fillRed = "#EA1B0A",
    $fill2 = "#39393a";


const svgoSettings = [

    {
        removeViewBox: false
    },
    {
        mergePaths: true
    },
    {
        convertPathData: {
            floatPrecision: 4
        }
    },
    {
        convertShapeToPath: {
            convertArcs: true
        }
    },
    {
        cleanupNumericValues: {
            floatPrecision: 4
        }
    },
    {
        removeAttrs: {
            attrs: ['shape-rendering', 'color-rendering', 'clip-path']
        }
    }

];

const svgoPaths = [

    {
        removeViewBox: false
    },{
        convertShapeToPath: true
    },
    {
        mergePaths: true
    }

];


function svgExportTask() {

    del('./output/svg/nofill/')

    const eonUIpath = 'input/SVG/';

    const sourcePath = eonUIpath;
    const destinationPath = './output/eonUI/';


    const svgJson = {};
    return gulp
        .src( sourcePath + '/**/*.svg')

        .pipe(svgo({
            plugins: svgoSettings
        })) //svgo

        .pipe(cheerio({
            parserOptions: {xmlMode: true},
            run: ($, file, done) => {
                $('[fill]').removeAttr('fill');
                $('[stroke]').removeAttr('stroke');
                $('[style]').removeAttr('style');
                $('path, rect, circle').attr('fill', '#fff');
                done();
            }
        }))//cheerio
        .pipe(gulp.dest(destinationPath + '/white/'))
        .pipe(cheerio({
            parserOptions: {xmlMode: true},
            run: ($, file, done) => {
                $('[fill]').removeAttr('fill');
                $('[stroke]').removeAttr('stroke');
                $('[style]').removeAttr('style');
                $('path, rect, circle').attr('fill', '#39393a');
                done();
            }
        }))//cheerio
        .pipe(gulp.dest(destinationPath + '/darkgrey/'))
        .pipe(cheerio({
            parserOptions: {xmlMode: true},
            run: ($, file, done) => {
                $('[fill]').removeAttr('fill');
                done();
            }
        }))//cheerio
        .pipe(svgo({
            plugins: svgoPaths
        })) //svgo
        .pipe(gulp.dest(destinationPath + '/nofill/'))


    complete();

}

// Watch and start local server
const svgExport = gulp.series(svgExportTask);
exports.svgExport = svgExport;