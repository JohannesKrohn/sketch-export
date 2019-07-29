var gulp = require('gulp'),
    sketch = require('gulp-sketch'),
    svgo = require('gulp-svgo'),
    cheerio = require('gulp-cheerio'),
    del = require('del'),
    imageResize = require('gulp-image-resize'),
    svgSprite = require("gulp-svg-sprites"),
    $fill = "#EA1C0A";
config = {
    mode: {
        view: { // Activate the «view» mode
            bust: false,
            render: {
                scss: true // Activate Sass output (with default options)
            }
        },
        symbol: true // Activate the «symbol» mode
    }
};

gulp.task('svg', function (complete) {

    del('./output/**/**.*')

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
                    removeTitle: true
                }, {
                    collapseGroups: true
                }, {
                    removeStyleElement: true
                }
            ]
        })) //svgo
        .pipe(svgo({
            js2svg: {
                pretty: true
            } //js2svg
        }))
        .pipe(gulp.dest('./output/svg/'));
    complete();
});
gulp.task('sprites', function () {
    return gulp.src('./input/*.sketch')
        .pipe(sketch({
            export: 'slices',
            formats: 'svg'
        }))
        .pipe(cheerio({
            parserOptions: { xmlMode: true },
            run: ($, file, done) => {
                $('[fill]').removeAttr('fill');
                $('[stroke]').removeAttr('stroke');
                $('[style]').removeAttr('style');
                done();
            }
        }))
        .pipe(svgSprite(config)).on('error', function(error){ console.log(error); })
        .pipe(gulp.dest("./output/assets"));
});

gulp.task('png-iphonex', function (complete) {
    return gulp.src('./input/*.sketch')
        .pipe(sketch({
            export: 'artboards',
            formats: 'png',
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
gulp.task('png', function (complete) {
    return gulp.src('./input/*.sketch')
        .pipe(sketch({
            export: 'slices',
            formats: 'png',
            scales: 2.0
        }))
        .pipe(gulp.dest('./output/png'));

    complete();
});
