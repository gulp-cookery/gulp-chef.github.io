```javascript
var gulp = require('gulp');
var chef = require('gulp-chef');

var ingredients = {
	src: 'src/',
	dest: 'dist/',
	clean: {},
	make: {
		postcss: {
			src: 'styles.css',
			processors: {
				stylelint: {},
				import: {},
				cssnext: {
					features: {
						autoprefixer: {
							browser: 'last 2 versions'
						}
					}
				},
				lost: {},
				production: {
					cssnano: {}
				}
			}
		},
		browserify: {
			bundle: {
				entry: 'main.js',
				file: 'scripts.js',
				transform: ['stringify', 'browserify-shim'],
				production: {
					uglify: true
				}
			}
		},
		assets: {
			src: [
				'index.html',
				'favicon.ico',
				'opensearch.xml'
			],
			recipe: 'copy'
		}
	},
	build: ['clean', 'make'],
	default: 'build'
};

var meals = chef(ingredients);

gulp.registry(meals);
```
