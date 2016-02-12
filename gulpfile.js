'use strict';

var gulp = require('gulp');
var chef = require('gulp-chef');

var browserSync = require('browser-sync');

var gif = require('gulp-if');
var cached = require('gulp-cached');
var uglify = require('gulp-uglify');
var stylus = require('gulp-stylus');
var nib = require('nib');
var jeet = require('jeet');
var ghpages = require('gulp-gh-pages');
var ngmin = require('gulp-ngmin');
var useref = require('gulp-useref');
var saveLicense = require('uglify-save-license');

var meals = chef({
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
				'logo.svg',
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
	watch: ['assets', 'make'],
	serve: ['build', sync, 'watch'],
	default: 'build'
});

function sync() {
	return browserSync.init({
		server: this.config.dest.path
	});
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
	var nonVendor = 'scripts/**/*.js';
	var postcss = require('gulp-postcss');
	var processors = [
		require('lost'),
		require('postcss-autoreset'),
		require('postcss-cssnext')({
			features: {
				autoprefixer: {
					browser: 'last 2 versions'
				}
			}
		}),
		require('cssnano')
	];

	function styl() {
		return gif('*.styl', stylus({
			use: [
				nib(),
				jeet()
			]
		}));
	}

	return gulp.src(config.src.globs, config.src.options)
		.pipe(useref({}, styl))
		.pipe(cached('build'))
		.pipe(gif(nonVendor, ngmin()))
		.pipe(gif('*.js', uglify({
			mangle: false,
			preserveComments: saveLicense
		})))
		.pipe(gif('*.css', postcss(processors)))
		.pipe(gulp.dest(config.dest.path))
		.pipe(browserSync.stream());
}

gulp.registry(meals);
