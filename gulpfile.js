var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
gulp.task('inject', function() {
    var wiredep = require('wiredep').stream;
    var inject = require('gulp-inject');

    var options = {
        bowerJson: require("./bower.json"),
        directory: "./public/lib",
        ignorePath: "../../public"

    }
    var injectSrc = gulp.src(['./public/css/*.css', './public/js/*.js'], {read:false});

    var injectOptions = {
        ignorePath: "/public/"
    }

    console.log('injecting');
    return gulp.src('./src/views/*.ejs')
    .pipe(wiredep(options))
    .pipe(inject(injectSrc, injectOptions))
    .pipe(gulp.dest('./src/views'));
});

var jsFiles = ['*.js', 'src/**/*.js'];

gulp.task('serve', ['inject'], function() {
    var options = {
        script: 'index.js',
        delayTime: 1,
        env: {
            'PORT': 3000
        },
        watch: jsFiles
    }

    return nodemon(options).on('restart', function(ev) {
        console.log('restarted');
    });
});