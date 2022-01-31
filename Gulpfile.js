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
        convertShapeToPath: true
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

const spriteConfig = {
    log: true,
    mode: {
        css: false, // Create a «css» sprite
        view: false, // Create a «view» sprite
        defs: false, // Create a «defs» sprite
        symbol: true, // Create a «symbol» sprite
        stack: false // Create a «stack» sprite
    }
};

gulp.task('sprites', function(complete) {

    return gulp.src('./input/SVG/icon/no_container/**/*.svg')
        .pipe(svgo({
            plugins: svgoSettings
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

        .pipe(svgSprite(spriteConfig))
        .pipe(gulp.dest("./output/sprites/icon/"));

});
gulp.task('spritesPictogram', function(complete) {

    return gulp.src('./input/SVG/pictograms/no_container/**/*.svg')
        .pipe(svgo({
            plugins: svgoSettings
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

        .pipe(svgSprite(spriteConfig))
        .pipe(gulp.dest("./output/sprites/pictograms"));

});




gulp.task('jsonPictogram', function (complete) {



    function svgToJson(metadata) {
        // Creates /tmp/a/apple, regardless of whether `/tmp` and /tmp/a exist.
        fs.mkdir('./output/json/', {recursive: true}, (err) => {
            if (err) throw err;
        });
        fs.writeFile(
            './output/json/pictogramsSVG.json',
            JSON.stringify(metadata, null, 4),
            function (err) {
                if (err) {
                    return console.log(err + 'Metadata writing error...');

                } else {
                    console.log(`SVG created`);

                }
            }
        );// write json
        let sourceCode = JSON.stringify(metadata, null, 8);
        let wrapper = '-\n    var eonUiPictograms = '
        sourceCode = sourceCode.slice(0, -1) + '    }'
        fs.writeFile('./output/json/pictogramsSVG.pug',

            wrapper + sourceCode

            , (err) => {
                if (err) throw err;
                console.log('The file has been saved!');
            });//write pug
    }// svgToJson <--


    const svgJson = {};
    const fileSrc = './output/sprites/pictograms/symbol/svg/sprite.symbol.svg';
    const svg = fs.readFileSync(fileSrc, 'utf8');
    const captureID = new RegExp(/(?:id=")(?<svgid>.*?)(?:")/, 'g');
    const captureViewBox = new RegExp(/(viewBox=")(?<viewBox>(\d+\s+)(\d+)(\s+)(?<widthSVG>\d+)(\s+)(?<heightSVG>\d+))("?)/, 'g');
    const capturePath = new RegExp(/(?:<path\s+d=")(?<pathSVG>.*?)(?:")/, 'g')
    let match = captureID.exec(svg);


    do {

        let matchViewBox = captureViewBox.exec(svg);
        let matchPath = capturePath.exec(svg);
        svgJson[match.groups.svgid] =
            {
                viewBox: matchViewBox.groups.viewBox,
                width: matchViewBox.groups.widthSVG,
                height: matchViewBox.groups.heightSVG,
                path: matchPath.groups.pathSVG
            };
    } while ((match = captureID.exec(svg)) !== null);
    svgToJson(svgJson);
    complete();
})


gulp.task('jsonIcon', function (complete) {


    // write the metadata in JSON format
    function writeMetadata(metadata) {
        // Creates /tmp/a/apple, regardless of whether `/tmp` and /tmp/a exist.
        fs.mkdir('./output/json/', {recursive: true}, (err) => {
            if (err) throw err;
        });
        fs.writeFile(
            './output/json/iconSVG.json',
            JSON.stringify(metadata, null, 4),
            function (err) {
                if (err) {
                    return console.log(err + 'Metadata writing error...');

                } else {
                    console.log(`SVG created`);

                }
            }
        );// write json
        let sourceCode = JSON.stringify(metadata, null, 8);
        let wrapper = '-\n    var eonUiIcons = '
        sourceCode = sourceCode.slice(0, -1) + '    }'
        fs.writeFile('./output/json/iconSVG.pug',

            wrapper + sourceCode

            , (err) => {
                if (err) throw err;
                console.log('The file has been saved!');
            });//write pug
    }// writeMetadata <--


    const svgJson = {};
    const fileSrc = './output/sprites/icon/symbol/svg/sprite.symbol.svg'
    const svg = fs.readFileSync(fileSrc, 'utf8');
    const captureID = new RegExp(/(?:id=")(?<svgid>.*?)(?:")/, 'g');
    const captureViewBox = new RegExp(/(viewBox=")(?<viewBox>(\d+\s+)(\d+)(\s+)(?<widthSVG>\d+)(\s+)(?<heightSVG>\d+))("?)/, 'g');
    const capturePath = new RegExp(/(?:<path\s+d=")(?<pathSVG>.*?)(?:")/, 'g')
    let match = captureID.exec(svg);


    do {

        let matchViewBox = captureViewBox.exec(svg);
        let matchPath = capturePath.exec(svg);
        svgJson[match.groups.svgid] =
            {
                viewBox: matchViewBox.groups.viewBox,
                width: matchViewBox.groups.widthSVG,
                height: matchViewBox.groups.heightSVG,
                path: matchPath.groups.pathSVG
            };
    } while ((match = captureID.exec(svg)) !== null);
    writeMetadata(svgJson);
    complete();
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
                $('path, rect, circle').removeAttr('fill-rule');
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
                $('path, rect, circle').removeAttr('fill-rule');
                $('[stroke]').removeAttr('stroke');
                $('[style]').removeAttr('style');
                $('path, rect, circle').attr('fill', $fillRed);
                done();
            }
        }))//cheerio
        .pipe(gulp.dest('./output/cleanup/svg/fill-red/'));

    complete();

});

gulp.task('scaleUp', function () {
    let scaleFactor = 50;
    return gulp.src('./output/eonui/nofill/**/*.svg')
        .pipe(cheerio({
            parserOptions: {xmlMode: true},
            run: ($, file, done) => {
                let viewBoxTemp = $('svg').attr('viewBox').split(" ");

                let viewBoxX = parseInt(viewBoxTemp[2]) * scaleFactor;
                let viewBoxY = 24 * scaleFactor;
                let transformY = 24 - viewBoxTemp[3];

                $('svg').attr('viewBox', '0 0 ' + viewBoxX + ' ' + viewBoxY)
                    .attr('width', viewBoxX)
                    .attr('height', viewBoxY);
                $('path').attr('transform', 'scale(' + scaleFactor + ') translate(0 ' + transformY / 2 + ')');

                done();
            }
        }))//cheerio
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
        .pipe(gulp.dest('./iconfont/_srcsvg/'))


    complete();

});

gulp.task('svgEONUI', function (complete) {

    del('./output/svg/nofill/')

    const eonUIpath = 'input/SVG/';

    const sourcePath = eonUIpath;
    const destinationPath = './output/eonUI/';


    const svgJson = {};

    function writeIconJson(iconData) {
        // Creates /tmp/a/apple, regardless of whether `/tmp` and /tmp/a exist.
        fs.mkdir(destinationPath, {recursive: true}, (err) => {
            if (err) throw err;
        });
        fs.writeFile(
            destinationPath + '/iconSVG.json',
            JSON.stringify(iconData, null, 4),
            function (err) {
                if (err) {
                    return console.log(err + 'Metadata writing error...');

                } else {
                    console.log(`SVG created`);

                }
            }
        );// write json
        let sourceCode = JSON.stringify(iconData, null, 8);
        let wrapper = '-\n    var eonUiIcons = '
        sourceCode = sourceCode.slice(0, -1) + '    }'
        fs.writeFile(destinationPath + '/iconSVG.pug',

            wrapper + sourceCode

            , (err) => {
                if (err) throw err;
                console.log('The file has been saved!');
            });//write pug
    }// writeIconJson <--

    return gulp.src( sourcePath + '/**/*.svg')
        .pipe(svgo({
            plugins: svgoSettings
        })) //svgo


        .pipe(cheerio({
            parserOptions: {xmlMode: true},
            run: ($, file, done) => {
                $('[fill]').removeAttr('fill');
                $('[stroke]').removeAttr('stroke');
                $('[style]').removeAttr('style');
                $('path, rect, circle').attr('fill', '#EA1B0A');
                done();
            }
        }))//cheerio
        .pipe(rename(function (path) {
            // Updates the object in-place

            path.basename = path.basename.replace(" ", "_");;

        }))
        .pipe(gulp.dest(destinationPath + '/red/'))

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
        .pipe(rename(function (path) {
            // Updates the object in-place

            path.basename = path.basename.replace(" ", "_");;

        }))
        .pipe(gulp.dest(destinationPath + '/white/'))

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

        .pipe(cheerio({
            parserOptions: {xmlMode: true},
            run: ($, file, done) => {
                let scaleFactor = 0.75;
                let viewBoxTemp = $('svg').attr('viewBox').split(" ");

                let viewBoxX = parseInt(viewBoxTemp[2]) * scaleFactor;
                let viewBoxY = 24;
                let transformY = 24 - viewBoxTemp[3];

                $('svg').attr('viewBox', '0 0 ' + viewBoxX + ' ' + viewBoxY)
                    .attr('width', viewBoxX)
                    .attr('height', viewBoxY);
                $('path').attr('transform', 'scale(' + scaleFactor + ') translate(0 ' + transformY / 2 + ')');

                done();
            }
        }))//cheerio
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
        .pipe(gulp.dest(destinationPath + '/24/'))

        // TODO The "fill-rule" destroys the regex search for the path properties
        // .pipe(through.obj((chunk, enc, cb) => {
        //     const svg = chunk.contents.toString(enc);
        //     const captureViewBox = new RegExp(/(viewBox=")(?<viewBox>(\d+\s+)(\d+)(\s+)(?<widthSVG>\d+)(\s+)(?<heightSVG>\d+))("?)/, 'g');
        //     const capturePath = new RegExp(/(?:<path\s+d=")(?<pathSVG>.*?)(?:")/, 'g')
        //     let matchViewBox = captureViewBox.exec(svg);
        //     let matchPath = capturePath.exec(svg);
        //     console.log(svg, matchPath)
        //     svgJson[chunk.stem] =
        //         {
        //             viewBox: matchViewBox.groups.viewBox,
        //             width: matchViewBox.groups.widthSVG,
        //             height: matchViewBox.groups.heightSVG,
        //             path: matchPath.groups.pathSVG,
        //             name: chunk.stem
        //         };
        //     writeIconJson(svgJson)
        //     cb(null, chunk)
        // }))
    complete();
});// SVG No fill


const fontName = 'eon-ui-icons' // set name of your symbol font
const className = 'eon-ui-icons' // set class name in your CSS

