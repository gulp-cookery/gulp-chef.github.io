'use strict';

var gulp = require('gulp');
var chef = require('gulp-chef');

var browserSync = require('browser-sync');
var ghpages = require('gulp-gh-pages');

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
	make: {
		script: {
			recipe: 'browserify',
			bundle: {
				entry: 'index.js',
				file: 'scripts.js',
				transform: ['stringify', 'browserify-shim'],
				production: {
					uglify: true
				}
			}
		},
		style: {
			src: 'styles.css',
			recipe: 'postcss',
			processors: {
				import: {},
				cssnext: {
					features: {
						autoprefixer: {
							browser: 'last 2 versions'
						}
					}
				},
				bem: {},
				lost: {},
				production: {
					cssnano: {}
				}
			}
		},
		markup: {
			src: 'index.html',
			recipe: 'copy'
		},
		assets: {
			src: {
				globs: [
					'favicon.ico',
					'opensearch.xml',
					'gulp-chef-white-text.svg',
					'blackList.json'
				]
			},
			task: assets
		}
	},
	build: ['clean', 'make'],
	serve: ['build', watch],
	default: 'build'
};

var meals = chef(ingredients);

gulp.registry(meals);

function watch() {
	browserSync.init({
		server: this.config.dest.path
	});

	gulp.watch(this.config.src.globs[0] + '**/*', gulp.parallel(gulp.task('make'), browserSync.reload));
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
