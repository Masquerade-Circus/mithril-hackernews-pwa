// Include gulp
let gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    nodemon = require('gulp-nodemon'),
    browserSync = require('browser-sync'),
    stylus = require('stylus'),
    gulpStylus = require('gulp-stylus'),
    fs = require('fs'),
    gulpFn = require('gulp-fn'),
    cssnano = require('cssnano'),
    CleanCSS = require('clean-css'),
    webpack = require('webpack'),
    webpackStream = require('webpack-stream'),
    named = require('vinyl-named'),
    favicons = require('favicons'),
    config = require('./gulpconfig');

// Assign gulpstylus to the most recent version
gulpStylus.stylus = stylus;

// Creates a proxy to the default server to inject css files and reload on js changes
gulp.task('connect', () => {
    browserSync.init({
        proxy: '127.0.0.1:3000',
        open: false,
        port: 3010,
        injectChanges: true,
        codeSync: true,
        ui: false
    });
});

gulp.task('nodemon', (done) => {
    let called = false;
    let stream = nodemon({
        nodemon: require('nodemon'),
        script: 'index.js',
        watch: ['src', 'public/js', 'public/css/app.css', 'public/images']
    });

    stream.on('start', () => {
        if (!called) {
            done();
        }
        called = true;
    });

    stream.on('restart', () => setTimeout(() => browserSync.reload({stream: false}), 400));

    stream.on('crash', () => stream.emit('restart', 10));

    return stream;
});

gulp.task('stylus', () => {
    return gulp.src(__dirname + '/public/css/app.styl')
        .pipe(plumber())
        .pipe(gulpStylus({ compress: false, sourcemap: true, 'include css': true }))
        .pipe(gulp.dest(__dirname + '/public/css/'))
        .pipe(browserSync.stream({ match: '**/*.css' }));
});

// Bundle the main app.js and the sw.js service worker
gulp.task("webpack", () => {
    return gulp.src([__dirname + '/public/src/app.js', __dirname + '/public/src/sw.js'])
        .pipe(plumber())
        .pipe(named())
        .pipe(webpackStream(config.webpackOptions, webpack, (err, stats) => {
            if (err) {
                throw error;
            }
            console.log(stats.toString({chunks: false, colors: true}));
        }))
        .pipe(gulp.dest(__dirname + '/public/js/'))
        .pipe(browserSync.stream({match: '**/*.js'}));
});

gulp.task('build-stylus', () => {
    return gulp.src(__dirname + '/public/css/app.styl')
        .pipe(plumber())
        .pipe(gulpStylus({ compress: false, sourcemap: false, 'include css': true }))
        .pipe(gulpFn(file => {
            file.contents = new Buffer(new CleanCSS(config.CleanCSSOptions).minify(file.contents.toString()).styles, 'utf-8');
            return file;
        }))
        .pipe(gulpFn(file => {
            return cssnano.process(file.contents.toString()).then(result => {
                file.contents = new Buffer(result.css, 'utf-8');
                return file;
            });
        }))
        .pipe(gulp.dest(__dirname + '/public/css/'));
});

gulp.task("build-webpack", () => {
    return gulp.src([__dirname + '/public/src/app.js', __dirname + '/public/src/sw.js'])
        .pipe(plumber())
        .pipe(named())
        .pipe(webpackStream(Object.assign({}, config.webpackOptions, {
            plugins: [
                new webpack.optimize.UglifyJsPlugin({
                    mangle: true,
                    compress: {
                        warnings: false, // Suppress uglification warnings
                        pure_getters: true,
                        unsafe: true,
                        screw_ie8: true
                    },
                    output: {
                        comments: false
                    },
                    exclude: [/\.min\.js$/gi] // skip pre-minified libs
                })
            ]
        }), webpack, (err, stats) => {
            if (err) {
                throw error;
            }
            console.log(stats.toString({chunks: true, colors: true}));
        }))
        .pipe(gulp.dest(__dirname + '/public/js/'))
        .pipe(browserSync.stream({match: '**/*.js'}));
});

gulp.task('build-icons', (done) => {
    favicons(config.favicons.logo, config.favicons, (error, response) => {
        if (error) {
            console.log(error.status);  // HTTP error code (e.g. `200`) or `null`
            console.log(error.name);    // Error name e.g. "API Error"
            console.log(error.message); // Error description e.g. "An unknown error has occurred"
            return;
        }
        let errorHandler = error => error && console.log(error);

        for (let i in response.images) {
            fs.writeFile(config.favicons.iconsPath + response.images[i].name, response.images[i].contents, errorHandler);
        }

        for (let i in response.files) {
            let name = response.files[i].name;
            if (name === 'manifest.json') {
                try {
                    let jsonObj = JSON.parse(response.files[i].contents);
                    jsonObj.display = config.favicons.display;
                    jsonObj.theme_color = config.favicons.background;
                    jsonObj.short_name = config.favicons.shortName;
                    response.files[i].contents = JSON.stringify(jsonObj);
                } catch (e) {
                    console.log(e);
                }
            }

            fs.writeFile(config.favicons.iconsPath + response.files[i].name, response.files[i].contents, errorHandler);
        }

        let html = '';
        for (let i in response.html) {
            html += response.html[i] + '\n';
        }

        fs.writeFile(config.favicons.linksViewPath + 'links.html', html, errorHandler);

        done();
    });
});

gulp.task('dev', ['build-icons','stylus', 'webpack', 'connect', 'nodemon'], () => {
    gulp.watch(__dirname + '/public/css/**/*.styl', ['stylus']);
    gulp.watch(__dirname + '/public/src/**/*.js', ['webpack']);
});

gulp.task('build', ['build-webpack', 'build-stylus', 'build-icons'], () => {
    console.log('Done');
});
