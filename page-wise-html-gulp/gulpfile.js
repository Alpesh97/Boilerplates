const { src, dest, watch, series, parallel } = require('gulp');
const concat = require('gulp-concat');
const autoprefixer = require('autoprefixer');
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const uglify = require('gulp-uglify');
const plumber = require("gulp-plumber");
const imagemin = require('gulp-imagemin');
const del = require('del');
const path = require('path');
const rename = require('gulp-rename');
const merge = require('merge-stream');
const fs = require('fs');
const importCss = require('gulp-import-css');


// File paths
const files = {
	cssFolderPath: 'assets/css',
	jsFolderPath: 'assets/js',
	images: 'assets/images/*.!(db)',
	innerImages: 'assets/images/**/*.!(db)'
}

// delete task
function delTask() {
	return del('public/**', { force: true });
}

// get inner folders
function getFolders(dir) {
	return fs.readdirSync(dir).filter(function (subdir) {
		return fs.statSync(path.join(dir, subdir)).isDirectory();
	});
}

function cssFolderTask() {
	var folders = getFolders(files.cssFolderPath);
	var tasks = folders.map(function (folder) {
		return src(path.join(files.cssFolderPath, folder, '**/main.css'))
			.pipe(importCss())
			.pipe(concat(folder + '.css'))
			.pipe(plumber())
			.pipe(postcss([autoprefixer(), cssnano()]))
			.pipe(dest('public/css'))
			.pipe(rename(folder + '.css'))
			.pipe(dest('public/css'));
	});
	return merge(tasks);
};

// js task
function jsTask() {
		return src(['./assets/js/jquery.min.js','./assets/js/jquery-migrate.min.js','./assets/js/modernizr.js', './assets/js/general.js'])
		.pipe(concat( 'vendor.js'))
		.pipe(dest('public/js'))
		.pipe(uglify())
		.pipe(rename('vendor.js'))
		.pipe(dest('public/js'));
	};

function jsFolderTask() {
	var folders = getFolders(files.jsFolderPath);
	var innertasks = folders.map(function (folder) {
		return src(path.join(files.jsFolderPath, folder, "**/vendor/*.js"))
			.pipe(concat(folder + '.js'))
			.pipe(dest('public/js'))
			.pipe(uglify())
			.pipe(rename(folder + '.js'))
			.pipe(dest('public/js'));
	});
	var tasks = folders.map(function (folder) {
		return src(path.join(files.jsFolderPath, folder, '**/**/*.js'))
			.pipe(concat(folder + '.js'))
			.pipe(dest('public/js'))
			.pipe(uglify())
			.pipe(rename(folder + '.js'))
			.pipe(dest('public/js'));
	});

	return merge( innertasks, tasks);
};

// imageTask
function imageTask() {
	return src([
		files.images, files.innerImages
	])
		.pipe(plumber())
		.pipe(imagemin())
		.pipe(dest('public/images')
		);
}

// Watch SCSS and JS files for changes
function watchTask() {
	watch([files.images, files.cssFolderPath, files.jsFolderPath],
		series(
			imageTask,
			cssFolderTask,
			jsTask,
			jsFolderTask
		)
	);
}

// Export the default Gulp task so it can be run
exports.default = series(
	delTask,
	imageTask,
	cssFolderTask,
	jsTask,
	jsFolderTask,
	watchTask
);