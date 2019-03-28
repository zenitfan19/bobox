const gulp = require('gulp');
const pug = require('gulp-pug');
const del = require('del');
const browserSync = require('browser-sync').create();
const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');
const cache = require('gulp-cache');
const autoprefixer = require('gulp-autoprefixer');

// styles
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');

const paths = {
	root: './app',	
	styles: {
		src: 'app/scss/**/*.*',
		dest: 'app/css/'
	}
}

//scss
function styles() {
	return gulp.src('./app/scss/main.scss')
		.pipe(sourcemaps.init())
		.pipe(sass({ outputStyle: 'compressed' }))
		.pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true })) // Создаем префиксы
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(paths.styles.dest))
}

// очистка
function clean() {
	return del(paths.root);
}

// следим за исходниками, папка src
function watch() {
	gulp.watch(paths.styles.src, styles);	
}

// следим за build и релоадим браузер
function server() {
	browserSync.init({
		server: paths.root
	});
	browserSync.watch(paths.root + '/**/*.*', browserSync.reload)
}


exports.styles = styles;
exports.clean = clean;


// просто работаем
gulp.task('default', gulp.series(
	gulp.parallel(styles),
	gulp.parallel(watch, server)
));

// контрольная сборка на продакшен
gulp.task('build', gulp.series(
	clean,
	gulp.parallel(styles)
));