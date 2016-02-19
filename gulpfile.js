'use strict';

var gulp = require('gulp');
var chef = require('gulp-chef');

var browserSync = require('browser-sync');

var gif = require('gulp-if');
var cached = require('gulp-cached');
var uglify = require('gulp-uglify');
var ghpages = require('gulp-gh-pages');
var useref = require('gulp-useref');
var saveLicense = require('uglify-save-license');

var ingredients = {
	src: 'src/',
	dest: 'dist/',
	clean: {},
	deploy: {
		src: {
			globs: '{{dest.path}}**/*',
			options: {
				join: ''
			}
		},
		config: {
			options: {
				remoteUrl: 'git@github.com:gulp-cookery/gulp-chef.git',
				branch: 'gh-pages'
			}
		},
		task: deploy
	},
	assets: {
		src: {
			globs: [
				'favicon.ico',
				'opensearch.xml',
				'img/*'
			],
			base: 'src/'
		},
		task: assets
	},
	make: {
		src: 'index.html',
		task: make
	},
	build: ['clean', { parallel: ['assets', 'make'] }],
	serve: ['build', watch],
	default: 'build'
};

var meals = chef(ingredients);

gulp.registry(meals);

function watch() {
	browserSync.init({
		server: this.config.dest.path
	});

	gulp.watch(ingredients.src + '**/*')
		.on('change', run);

	function run() {
		return gulp.parallel(gulp.task('make'), browserSync.reload)(done);
	}

	function done() {
	}
}

function deploy() {
	var config = this.config;

	return gulp.src(config.src.globs, config.src.options)
		.pipe(ghpages(config.options));
}

function assets() {
	var config = this.config;

	return gulp.src(config.src.globs, config.src.options)
		.pipe(gulp.dest(config.dest.path))
		.pipe(browserSync.stream());
}

function make() {
	var config = this.config;
	var postcss = require('gulp-postcss');
	var processors = [
		require('postcss-import'),
		require('postcss-cssnext')({
			features: {
				autoprefixer: {
					browser: 'last 2 versions'
				}
			}
		}),
		require('lost'),
		require('cssnano')({
		})
	];

	return gulp.src(config.src.globs, config.src.options)
		.pipe(useref())
		.pipe(cached('build'))
		.pipe(gif('*.js', uglify({
			mangle: false,
			preserveComments: saveLicense
		})))
		.pipe(gif('*.css', postcss(processors)))
		.pipe(gulp.dest(config.dest.path))
		.pipe(browserSync.stream());
}
