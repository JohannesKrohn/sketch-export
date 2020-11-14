const gulp = require('gulp'),
    sketch = require('gulp-sketch'),
    svgo = require('gulp-svgo'),
    cheerio = require('gulp-cheerio'),
    del = require('del'),
    imageResize = require('gulp-image-resize'),
    svgSprite = require("gulp-svg-sprite"),
    gulpsvgtojsontoscss = require('gulp-svg-to-json-to-scss'),
    svgmin = require('gulp-svgmin'),
    $fill1 = "#fff",
    $fill3 = "#39393A",
    $fillRed = "#EA1B0A",
    $fill2 = "#39393a";
const svgoSettings = [

    // {
    //     removeAttrs: {
    //         attrs: ['stroke', 'fill']
    //     }
    //
    // },
    {
        removeViewBox: false
    }
    // ,
    // {
    //     removeTitle: true
    // }, {
    //     collapseGroups: true
    // }, {
    //     removeStyleElement: true
    // }
];

gulp.task('svgNoFill', function (complete) {

    del('./output/svg/nofill/')

    return gulp.src('./input/*.sketch')
        .pipe(sketch({
            export: 'slices',
            formats: 'svg'
        }))
        .pipe(svgo({
            plugins: svgoSettings
        })) //svgo
        // .pipe(cheerio({
        //     parserOptions: {xmlMode: true},
        //     run: ($, file, done) => {
        //         $('[fill]').removeAttr('fill');
        //         $('[stroke]').removeAttr('stroke');
        //         $('[style]').removeAttr('style');
        //         done();
        //     }
        // }))//cheerio
        // .pipe(svgo({
        //     js2svg: {
        //         pretty: true
        //     } //js2svg
        // }))
        .pipe(gulp.dest('./output/svg/nofill/'));
    complete();
});// SVG No fill


gulp.task('svgWhite', function (complete) {

    del('./output/svg/fillWhite/')

    return gulp.src('./input/*.sketch')
        .pipe(sketch({
            export: 'slices',
            formats: 'svg'
        }))
        .pipe(svgo({
            js2svg: {
                pretty: true
            }, //js2svg
            plugins: [

                {
                    removeAttrs: {
                        attrs: ['stroke.*', 'fill', 'id', 'class']
                    }

                }, {
                    removeViewBox: false
                },
                {
                    removeTitle: true
                }, {
                    collapseGroups: true
                }, {
                    removeStyleElement: true
                }
            ]
        })) //svgo
        .pipe(cheerio({
            parserOptions: {xmlMode: true},
            run: ($, file, done) => {
                $('[fill]').removeAttr('fill');
                $('[stroke]').removeAttr('stroke');
                $('[style]').removeAttr('style');
                $('path, rect, circle').attr('fill', $fill1);
                done();
            }
        }))//cheerio
        // .pipe(svgo({
        //     js2svg: {
        //         pretty: true
        //     } //js2svg
        // }))
        .pipe(gulp.dest('./output/svg/fillWhite/'));
    complete();
});// SVG White

gulp.task('svgDarkgrey', function (complete) {

    del('./output/svg/fillDarkgrey/')

    return gulp.src('./input/*.sketch')
        .pipe(sketch({
            export: 'slices',
            formats: 'svg'
        }))
        .pipe(svgo({
            js2svg: {
                pretty: true
            }, //js2svg
            plugins: [

                {
                    removeAttrs: {
                        attrs: ['stroke.*', 'fill', 'id', 'class']
                    }

                }, {
                    removeViewBox: false
                },
                {
                    removeTitle: true
                }, {
                    collapseGroups: true
                }, {
                    removeStyleElement: true
                }
            ]
        })) //svgo
        .pipe(cheerio({
            parserOptions: {xmlMode: true},
            run: ($, file, done) => {
                $('[fill]').removeAttr('fill');
                $('[stroke]').removeAttr('stroke');
                $('[style]').removeAttr('style');
                $('path, rect, circle').attr('fill', $fill2);
                done();
            }
        }))//cheerio
        // .pipe(svgo({
        //     js2svg: {
        //         pretty: true
        //     } //js2svg
        // }))
        .pipe(gulp.dest('./output/svg/fillDarkgrey/'));
    complete();
});// SVG White


gulp.task('sketchSVG', function (complete) {

    del('./output/sketch/**/*')

    return gulp.src('./input/*.sketch')
        .pipe(sketch({
            export: 'slices',
            formats: 'svg'
        }))
        .pipe(svgo({
            js2svg: {
                pretty: true
            }, //js2svg
            plugins: [

                {
                    removeViewBox: false
                },
                {
                    removeTitle: true
                }, {
                    collapseGroups: true
                }
            ]
        })) //svgo
        .pipe(gulp.dest('./output/sketch/'));
    complete();
});// sketch

const spriteConfig = {
    log: true,
    mode: {
        css: true, // Create a «css» sprite
        view: true, // Create a «view» sprite
        defs: true, // Create a «defs» sprite
        symbol: true, // Create a «symbol» sprite
        stack: true // Create a «stack» sprite
    }
};

gulp.task('sprites', function () {
    return gulp.src('./output/svg/nofill/pictograms/no_container/*.svg')
        .pipe(svgSprite(spriteConfig))
        .pipe(gulp.dest("./output/sprites/"));
});

gulp.task('png-artboards-iphonex', function (complete) {
    return gulp.src('./input/*.sketch')
        .pipe(sketch({
            export: 'artboards',
            formats: 'png-artboards',
            scales: 4.0
        }))
        .pipe(imageResize({
            width: 1125,
            height: 2436,
            crop: true,
            gravity: "North",
            upscale: false
        }))
        .pipe(gulp.dest('./output/iphonex'));

    complete();
});
gulp.task('png-artboards', function (complete) {
    return gulp.src('./input/png-artboards/*.sketch')
        .pipe(sketch({
            export: 'artboards',
            formats: 'png-artboards',
            scales: 1.0
        }))
        .pipe(gulp.dest('./output/png-artboards'));

    complete();
});


gulp.task('svgAll', function (complete) {

    del('./output/svg/**/*')

    return gulp.src('./input/*.sketch')
        .pipe(sketch({
            export: 'slices',
            formats: 'svg',
        }))
        .pipe(svgo({
            js2svg: {
                pretty: true
            }, //js2svg
            plugins: [

                {
                    removeAttrs: {
                        attrs: ['stroke.*', 'fill', 'id', 'class']
                    }

                }, {
                    removeViewBox: false
                }, {
                    cleanupNumericValues: {
                        floatPrecision: 4
                    }
                },
                {
                    removeTitle: true
                }, {
                    collapseGroups: true
                }, {
                    removeStyleElement: true
                }
            ]
        })) //svgo
        .pipe(cheerio({
            parserOptions: {xmlMode: true},
            run: ($, file, done) => {
                $('[fill]').removeAttr('fill');
                $('[stroke]').removeAttr('stroke');
                $('[style]').removeAttr('style');
                done();
            }
        }))//cheerio
        .pipe(gulp.dest('./output/svg/nofill/'))
        .pipe(cheerio({
            parserOptions: {xmlMode: true},
            run: ($, file, done) => {
                $('[fill]').removeAttr('fill');
                $('[stroke]').removeAttr('stroke');
                $('[style]').removeAttr('style');
                $('path, rect, circle').attr('fill', $fill1);
                done();
            }
        }))//cheerio
        .pipe(gulp.dest('./output/svg/fillWhite/'))
        .pipe(cheerio({
            parserOptions: {xmlMode: true},
            run: ($, file, done) => {
                $('[fill]').removeAttr('fill');
                $('[stroke]').removeAttr('stroke');
                $('[style]').removeAttr('style');
                $('path, rect, circle').attr('fill', $fillRed);
                done();
            }
        }))//cheerio
        .pipe(gulp.dest('./output/svg/fillRed/'))
        .pipe(cheerio({
            parserOptions: {xmlMode: true},
            run: ($, file, done) => {
                $('[fill]').removeAttr('fill');
                $('[stroke]').removeAttr('stroke');
                $('[style]').removeAttr('style');
                $('path, rect, circle').attr('fill', $fill2);
                done();
            }
        }))//cheerio
        .pipe(gulp.dest('./output/svg/fillDarkgrey/'));

    complete();
});// SVG White

gulp.task('json', function () {
    return gulp.src('./output/svg/nofill/icon/no_container/**/*.svg')
        .pipe(gulpsvgtojsontoscss({
            jsonFile: 'images.json',
            scssFile: '_images.scss',
            basePath: "./images",
            noExt: true,
            delim: "_"
        }))
        .pipe(gulp.dest('./output/svgtxt/'));
});
gulp.task('cleanup', function () {
    return gulp.src('./input/svg/**/*.svg')
        .pipe(svgmin({
            plugins: [{
                removeViewBox: false
            }, {
                removeComments: false
            }, {
                cleanupNumericValues: {
                    floatPrecision: 4
                }

            }]
        }))
        .pipe(cheerio({
            parserOptions: {xmlMode: true},
            run: ($, file, done) => {
                $('[fill]').removeAttr('fill');
                $('[stroke]').removeAttr('stroke');
                $('[style]').removeAttr('style');
                done();
            }
        }))//cheerio
        .pipe(gulp.dest('./output/cleanup/svg/fill-no-fill/'))
        .pipe(cheerio({
                parserOptions: {xmlMode: true},
                run: ($, file, done) => {
                    $('[fill]').removeAttr('fill');
                    $('[stroke]').removeAttr('stroke');
                    $('[style]').removeAttr('style');
                    $('path, rect, circle').attr('fill', $fillRed);
                    done();
                }
            }))//cheerio
        .pipe(gulp.dest('./output/cleanup/svg/fill-red/'));

    complete();

});