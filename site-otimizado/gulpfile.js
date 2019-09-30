const {src, dest, parallel} = require('gulp');
const rename = require('gulp-rename');
const minifyJS = require('gulp-uglify');
const minifyCSS = require('gulp-uglifycss');
const sass = require('gulp-sass');
const babel = require('gulp-babel');
const cssimport = require('gulp-cssimport');
const image = require('gulp-image');

function html() {
	return src('src/templates/*.html')
		.pipe(dest('public/'));
}

function javascript() {
	return src('src/js/*.js')
		.pipe(babel({
            "presets": ["@babel/preset-env"]
        }))
		.pipe(minifyJS())
		.pipe(rename({extname:'.min.js'}))
		.pipe(dest('public/assets/js/'));
}


function css() {
	return src('src/css/*.css')
		.pipe(cssimport())
		.pipe(sass())
		.pipe(minifyCSS())
		.pipe(rename({extname:'.min.css'}))
		.pipe(dest('public/assets/css/'));
}
function img() {
	return src('src/img/*.png')
		.pipe(image())
		.pipe(rename({extname:'.png'}))
		.pipe(dest('public/assets/img/'));
}
function img2() {
	return src('src/img/*.svg')
		.pipe(image())
		.pipe(rename({extname:'.svg'}))
		.pipe(dest('public/assets/img/'));
}


exports.default = parallel(html, javascript, css, img, img2);