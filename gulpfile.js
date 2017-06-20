// Include gulp
var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    browserSync = require('browser-sync'),
    stylus = require('stylus'),
    gulpStylus = require('gulp-stylus'),
    fs = require('fs'),
    gulpFn = require('gulp-fn'),
    cssnano = require('cssnano'),
    CleanCSS = require('clean-css'),
    webpack = require('webpack'),
    webpackStream = require('webpack-stream'),
    named = require('vinyl-named');

let CleanCSSOptions = {
    level: {
        1: {
            roundingPrecision: 'all=3', // rounds pixel values to `N` decimal places; `false` disables rounding; defaults to `false`
            specialComments: 'none' // denotes a number of /*! ... */ comments preserved; defaults to `all`
        },
        2: {
            restructureRules: true // controls rule restructuring; defaults to false
        }
    },
    compatibility: 'ie11'
};

let webpackOptions = {
    output: {filename: '[name].js', sourceMapFilename: '[name].map'},
    module: {
        rules: [{test: /\.js$/,loader: 'babel-loader',query: {presets: ['env']}}]
    },
    resolve: {modules: ['node_modules', __dirname + '/public/src']},
    devtool: 'cheap-source-map',
    plugins: []
};

let webpackHandler = (err, stats) => {
    if (err) {
        throw error;
    }
    console.log(stats.toString({chunks: false, colors: true}));
};

gulpStylus.stylus = stylus;

gulp.task('connect', function () {
    browserSync.init({
        proxy: '127.0.0.1:3000',
        open: false,
        port: 8000,
        injectChanges: true,
        codeSync: true
    });
});

gulp.task('stylus', function () {
    return gulp.src(__dirname + '/public/css/app.styl')
        .pipe(plumber())
        .pipe(gulpStylus({ compress: false, sourcemap: true, 'include css': true }))
        .pipe(gulp.dest(__dirname + '/public/css/'))
        .pipe(browserSync.stream({ match: '**/*.css' }));
});

gulp.task("webpack", function () {
    return gulp.src([__dirname + '/public/src/app.js', __dirname + '/public/src/sw.js'])
        .pipe(plumber())
        .pipe(named())
        .pipe(webpackStream(webpackOptions, webpack, webpackHandler))
        .pipe(gulp.dest(__dirname + '/public/js/'))
        .pipe(browserSync.stream({match: '**/*.js'}));
});

gulp.task('watch', ['connect', 'stylus', 'webpack'], function () {
    gulp.watch(__dirname + '/public/css/**/*.styl', ['stylus']);
    gulp.watch(__dirname + '/public/src/**/*.js', ['webpack']);
});

gulp.task('build-stylus', function () {
    return gulp.src(__dirname + '/public/css/app.styl')
        .pipe(plumber())
        .pipe(gulpStylus({ compress: false, sourcemap: false, 'include css': true }))
        .pipe(gulpFn(file => {
            file.contents = new Buffer(new CleanCSS(CleanCSSOptions).minify(file.contents.toString()).styles, 'utf-8');
            return file;
        }))
        .pipe(gulpFn(file => {
            return cssnano.process(file.contents.toString()).then(function (result) {
                file.contents = new Buffer(result.css, 'utf-8');
                return file;
            });
        }))
        .pipe(gulp.dest(__dirname + '/public/css/'));
});

gulp.task("build-webpack", function () {
    return gulp.src([__dirname + '/public/src/app.js', __dirname + '/public/src/sw.js'])
        .pipe(plumber())
        .pipe(named())
        .pipe(webpackStream(Object.assign({}, webpackOptions, {
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
        }), webpack, webpackHandler))
        .pipe(gulp.dest(__dirname + '/public/js/'))
        .pipe(browserSync.stream({match: '**/*.js'}));
});

gulp.task('build-icons', function () {
    let fs = require('fs'),
        favicons = require('favicons'),
        logo = __dirname + '/public/images/logo.png',
        iconsPath = __dirname + '/public/icons/',
        linksViewPath = __dirname + '/src/views/',
        config = {
            appName: 'Mithril Hackernews',                  // Your application's name. `string`
            shortName: 'HN - Mithril',
            appDescription: "Hackernews clone made with Micro.js + Mithril.js + Pure Material",           // Your application's description. `string`
            background: "#3f51b5",             // Background colour for flattened icons. `string`
            path: "/icons/",                      // Path for overriding default icons path. `string`
            display: "standalone",          // Android display: "browser" or "standalone". `string`
            start_url: "/top",    // Android start application's URL. `string`
            orientation: "portrait",        // Android orientation: "portrait" or "landscape". `string`
            version: "1.0",                 // Your application's version number. `number`
            developerName: "Christian César Robledo López (Masquerade Circus)",            // Your (or your developer's) name. `string`
            developerURL: "http://masquerade-circus.net",             // Your (or your developer's) URL. `string`
            logging: false,                 // Print logs to console? `boolean`
            icons: {
                android: true,              // Create Android homescreen icon. `boolean`
                appleIcon: true,            // Create Apple touch icons. `boolean` or `{ offset: offsetInPercentage }`
                appleStartup: true,         // Create Apple startup images. `boolean`
                coast: { offset: 25 },      // Create Opera Coast icon with offset 25%. `boolean` or `{ offset: offsetInPercentage }`
                favicons: true,             // Create regular favicons. `boolean`
                firefox: true,              // Create Firefox OS icons. `boolean` or `{ offset: offsetInPercentage }`
                windows: true,              // Create Windows 8 tile icons. `boolean`
                yandex: true                // Create Yandex browser icon. `boolean`
            }
        };

    gulp.src(logo)
        .pipe(plumber())
        .pipe(gulpFn(() => {
            return favicons(logo, config, (error, response) => {
                if (error) {
                    console.log(error.status);  // HTTP error code (e.g. `200`) or `null`
                    console.log(error.name);    // Error name e.g. "API Error"
                    console.log(error.message); // Error description e.g. "An unknown error has occurred"
                    return;
                }
                let errorHandler = error => error && console.log(error);

                for (let i in response.images) {
                    fs.writeFile(iconsPath + response.images[i].name, response.images[i].contents, errorHandler);
                }

                for (let i in response.files) {
                    let name = response.files[i].name;
                    if (name === 'manifest.json') {
                        try {
                            let jsonObj = JSON.parse(response.files[i].contents);
                            jsonObj.display = config.display;
                            jsonObj.theme_color = config.background;
                            jsonObj.short_name = config.shortName;
                            response.files[i].contents = JSON.stringify(jsonObj);
                        } catch (e) {
                            console.log(e);
                        }
                    }

                    fs.writeFile(iconsPath + response.files[i].name, response.files[i].contents, errorHandler);
                }

                let html = '';
                for (let i in response.html) {
                    html += response.html[i] + '\n';
                }

                fs.writeFile(linksViewPath + 'links.html', html, errorHandler);

                console.log('Build icons done.');
                return true;
            });
        }));
});

gulp.task('build', ['build-webpack', 'build-stylus', 'build-icons'], function () {
    console.log('Done');
});
