var gulp = require('gulp'),
  sketch = require('gulp-sketch'),
  svgmin = require('gulp-svgmin'),
  del = require('del'),
  imageResize = require('gulp-image-resize'),
  svgSprite = require("gulp-svg-sprites");


gulp.task('svg', function (complete) {

  del('./output/svg/**/**.*')

  return gulp.src('./input/*.sketch')
    .pipe(sketch({
      export: 'artboards',
      formats: 'svg'
    }))
    .pipe(svgmin({
        js2svg: {
          pretty: true
        }, //js2svg
        plugins: [
          {
            removeAttrs: {
              attrs: ['stroke.*', 'fill']
            }

          },
          {removeTitle: true}
                ]
      }

    )) //svgmin
    .pipe(gulp.dest('./output/svg/'));
  complete();
});
gulp.task('sprites', function () {
  return gulp.src('./input/*.sketch')
        .pipe(sketch({
          export: 'artboards',
          formats: 'svg'
        }))
        .pipe(svgSprite())
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
