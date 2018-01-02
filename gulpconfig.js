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
        rules: [{test: /\.js$/,exclude: /node_modules/, loader: 'babel-loader',query: {presets: ['env']}}]
    },
    resolve: {modules: ['node_modules', __dirname + '/public/src']},
    devtool: 'source-map',
    plugins: []
};

let favicons = {
    logo: __dirname + '/public/images/logo.png', // File that will serve as the icon
    iconsPath: __dirname + '/public/images/icons/', // Path to the generated icons
    linksViewPath: __dirname + '/src/views/', // Path to the generated links.html file
    appName: 'Mithril Hackernews',                  // Your application's name. `string`
    shortName: 'HN - Mithril',      // Your application's short name. It must be lower than 12 characters. `string`
    appDescription: "Hackernews clone built with Micro.js + Mithril.js + Pure Material",           // Your application's description. `string`
    background: "#3f51b5",             // Background colour for flattened icons. `string`
    path: "/images/icons/",                      // Path for overriding default icons path. `string`
    display: "standalone",          // Android display: "browser" or "standalone". `string`
    start_url: "/",    // Android start application's URL. `string`
    orientation: "portrait",        // Android orientation: "portrait" or "landscape". `string`
    version: "1.0",                 // Your application's version number. `number`
    developerName: "Christian César Robledo López (Masquerade Circus)",            // Your (or your developer's) name. `string`
    developerURL: "http://masquerade-circus.net",             // Your (or your developer's) URL. `string`
    logging: false,                 // Print logs to console? `boolean`
    icons: {
        android: true,              // Create Android homescreen icon. `boolean`
        appleIcon: true,            // Create Apple touch icons. `boolean` or `{ offset: offsetInPercentage }`
        appleStartup: true,         // Create Apple startup images. `boolean`
        coast: false,      // Create Opera Coast icon with offset 25%. `boolean` or `{ offset: offsetInPercentage }`
        favicons: false,             // Create regular favicons. `boolean`
        firefox: true,              // Create Firefox OS icons. `boolean` or `{ offset: offsetInPercentage }`
        windows: false,              // Create Windows 8 tile icons. `boolean`
        yandex: false                // Create Yandex browser icon. `boolean`
    },
    // Default favicon file
    defaultFavicon: {
        size: 60,
        fileName: '/images/icons/firefox_app_60x60.png'
    }
};

module.exports = {
    CleanCSSOptions,
    webpackOptions,
    favicons
}
