/* --------- plugins --------- */

var
	gulp = require('gulp'),
	compass = require('gulp-compass'),
    jade = require('gulp-jade'),
    browserSync = require('browser-sync'),
    plumber = require('gulp-plumber'),
    del = require('del'), //  для удаления файлов и папок перед сборкой dist
    imagemin = require('gulp-imagemin'), 
    pngquant = require('imagemin-pngquant'),
    cache = require('gulp-cache'),
    autoprefixer = require('gulp-autoprefixer');
    
	
  
/*----------------sass-compass------------------*/
gulp.task('compass', function() {
  gulp.src('app/sass/main.scss')
    .pipe(plumber())
    .pipe(autoprefixer(['last 15 versions', '> 1%'], { cascade: true }))
    .pipe(compass({
      config_file: './config.rb',
      css: 'app/css',
      sass: 'app/sass'
    }))
    .pipe(gulp.dest('app/css'));

});
/*----------------jade------------------*/
gulp.task('jade', function() {
    return gulp.src('app/jade/index.jade')
     .pipe(plumber())
    .pipe(jade({
        pretty: true
    }))
    .pipe(gulp.dest('app'))
});
 
/*----------------browser-sync------------------*/
gulp.task('browser-sync', function () {
    browserSync.init({
        server:'app'
    });

browserSync.watch('app/**/*.*').on('change',browserSync.reload);
});
/*----------------watch------------------*/
gulp.task('watch',['compass','jade','browser-sync'],function(){
    gulp.watch('app/sass/**/*.scss',['compass']);
    gulp.watch('app/jade/**/*.jade',['jade']);
    gulp.watch('app/*.html');
    gulp.watch('app/js/**/*.js');
});
/*----------------images------------------*/
gulp.task('img', function() {
    return gulp.src('app/img/**/*') 
        .pipe(cache(imagemin({  
            interlaced: true,
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        })))
        .pipe(gulp.dest('dist/img')); 
});

/*----------------in production------------------*/
gulp.task('clean', function() {
    return del.sync('dist'); // Удаляем папку dist перед сборкой
});

gulp.task('build', ['clean', 'jade', 'compass','img',], function() {

    var buildCss = gulp.src('app/css/**/*')
    .pipe(gulp.dest('dist/css'))

    var buildFonts = gulp.src('app/fonts/**/*') 
    .pipe(gulp.dest('dist/fonts'))

    var buildJs = gulp.src('app/js/**/*') 
    .pipe(gulp.dest('dist/js'))

    var buildHtml = gulp.src('app/*.html') 
    .pipe(gulp.dest('dist'));

});

gulp.task('clear', function () {
    return cache.clearAll();
});

gulp.task('default', ['watch']);