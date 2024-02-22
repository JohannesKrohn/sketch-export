const gulp = require('gulp'),
    svgo = require('gulp-svgo'),
    cheerio = require('gulp-cheerio'),
    del = require('del'),
    svgSprite = require("gulp-svg-sprite"),
    svgmin = require('gulp-svgmin'),
    rename = require('gulp-rename'),
    fs = require('fs'),
    $fill1 = "#fff",
    $fill3 = "#3A1F40",
    $fillRed = "#FAD689",
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
                $('path, rect, circle').attr('fill', '#FAAD66');
                done();
            }
        }))//cheerio
        .pipe(rename(function (path) {
            // Updates the object in-place
            path.basename = path.basename.replaceAll(" ", "_");
            path.basename = path.basename.replaceAll("ä", "ae");
            path.basename = path.basename.replaceAll("ö", "oe");
            path.basename = path.basename.replaceAll("ü", "ue");
            path.basename = path.basename.toLowerCase();

        }))
        .pipe(gulp.dest(destinationPath + '/sunset/'))


        .pipe(cheerio({
            parserOptions: {xmlMode: true},
            run: ($, file, done) => {
                $('[fill]').removeAttr('fill');
                $('[stroke]').removeAttr('stroke');
                $('[style]').removeAttr('style');
                $('path, rect, circle').attr('fill', '#3A1F40');
                done();
            }
        }))//cheerio
        .pipe(rename(function (path) {
            // Updates the object in-place
            path.basename = path.basename.replaceAll(" ", "_");
            path.basename = path.basename.replaceAll("ä", "ae");
            path.basename = path.basename.replaceAll("ö", "oe");
            path.basename = path.basename.replaceAll("ü", "ue");
            path.basename = path.basename.toLowerCase();

        }))
        .pipe(gulp.dest(destinationPath + '/warm nightsky/'))
        .pipe(cheerio({
            parserOptions: {xmlMode: true},
            run: ($, file, done) => {
                $('[fill]').removeAttr('fill');
                $('[stroke]').removeAttr('stroke');
                $('[style]').removeAttr('style');
                $('path, rect, circle').attr('fill', '#FAD689');
                done();
            }
        }))//cheerio
        .pipe(rename(function (path) {
            // Updates the object in-place
            path.basename = path.basename.replaceAll(" ", "_");
            path.basename = path.basename.replaceAll("ä", "ae");
            path.basename = path.basename.replaceAll("ö", "oe");
            path.basename = path.basename.replaceAll("ü", "ue");
            path.basename = path.basename.toLowerCase();

        }))
        .pipe(gulp.dest(destinationPath + '/pale sun/'))

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
