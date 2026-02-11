gulp         = require 'gulp'
merge        = require 'merge-stream'
sync         = require('browser-sync').create()
notify       = require 'gulp-notify'
coffee       = require 'gulp-coffee'
uglify       = require 'gulp-uglify'
clean        = require 'gulp-clean-css'
htmlmin      = require 'gulp-htmlmin'
concat       = require 'gulp-concat'
stylus       = require 'gulp-stylus'
pug          = require 'gulp-pug'
sourcemaps   = require 'gulp-sourcemaps'
gulpif       = require 'gulp-if'
fs           = require 'fs'
objectus     = require 'objectus'

env = 'dev'

dirs =
  coffee: 'resources/coffee'
  pug:    'resources/views'
  stylus: 'resources/stylus'
  svg:    'resources/vector'

config = {}
objectify = (complete) ->
  objectus 'config/', (error, result) ->
    notify error if error
    config = result
    fs.writeFileSync(dirs.coffee + '/config.coffee', "config = " + JSON.stringify(config) + ";", 'utf8')
    complete?()
 

objectify()

gulp.task 'objectus', objectify

gulp.task 'goprod', (done) ->
  env = 'prod'
  done()

gulp.task 'vendor', ->
  js = gulp.src([
    'node_modules/jquery/dist/jquery.js',
    'node_modules/slick-carousel/slick/slick.js',
    'node_modules/jquery.scrollto/jquery.scrollTo.js',
    'node_modules/moment/min/moment.min.js',
  ])
    .pipe(gulpif(env != 'dev',uglify()))
    .pipe(concat('vendor.js'))
    .pipe gulp.dest('public/javascript')

  css = gulp.src([
    'node_modules/slick-carousel/slick/slick.css',
    'node_modules/slick-carousel/slick/slick-theme.css',
  ])
    .pipe(gulpif(env != 'dev',clean()))
    .pipe(concat('vendor.css'))
    .pipe gulp.dest('public/css/')

  return merge(js, css)

gulp.task 'coffee', ->
  return gulp.src(dirs.coffee + '/*.coffee')
    .pipe(gulpif(env == 'dev', sourcemaps.init(loadMaps: true)))
    .pipe(coffee(bare: true)
      .on('error', notify.onError((error) ->
        title: "Coffee error"
        message: error.message + "\r\n" + error.filename + ':' + error.location.first_line
        sound: 'Pop'
      )))
    .pipe(gulpif(env != 'dev',uglify()))
    .pipe(concat('bundle.js'))
    .pipe(gulpif(env == 'dev',sourcemaps.write()))
    .pipe(gulp.dest('./public/javascript'))
    .pipe(sync.stream())

gulp.task 'stylus', (done) ->
  objectify ->
    stream = gulp.src(dirs.stylus + '/main.styl')
      .pipe(gulpif(env == 'dev',sourcemaps.init(loadMaps: true)))
      .pipe(stylus(rawDefine: config: config)
      .on('error', notify.onError((error) ->
        title: 'Stylus error: ' + error.name
        message: error.message
        sound: 'Pop'
      )))
      .pipe(gulpif(env != 'dev',clean()))
      .pipe(gulpif(env == 'dev',sourcemaps.write()))
      .pipe(gulp.dest('public/css'))
      .pipe(sync.stream())
    stream.on 'end', done

gulp.task 'pug', (done) ->
  objectify ->
    stream = gulp.src(dirs.pug + '/**/index.pug')
      .pipe(pug(
        pretty: true
        locals:
          config: config
      ).on('error', notify.onError((error) ->
        title: 'Pug error: ' + error.name
        message: error.message
        sound: 'Pop')))
      .pipe(gulpif(env != 'dev',htmlmin(
        collapseWhitespace: true
        processScripts: ['application/ld+json', 'text/javascript']
      )))
      .pipe(gulp.dest('public'))
      .pipe sync.stream()
    stream.on 'end', done

watch = ->
  gulp.watch 'config/**/*', gulp.series('objectus', gulp.parallel('pug', 'stylus'))
  gulp.watch [dirs.coffee + '/**/*.coffee','!' + dirs.coffee + '/config.coffee'], gulp.series('coffee')
  gulp.watch dirs.stylus + '/**/*.styl', gulp.series('stylus')
  gulp.watch dirs.pug + '/**/*.pug', gulp.series('pug')
  gulp.watch dirs.svg + '/**/*.svg', gulp.series('pug')
  gulp.watch 'public/images/**/*', gulp.series('pug')

gulp.task 'sync', ->
  sync.init
    notify: false
    open: false
    server: baseDir: 'public/'
    ghostMode:
      clicks: false
      forms: false
      scroll: false
    scrollProportionally: false
  watch()

gulp.task 'watch', watch
gulp.task 'default', gulp.series('objectus', gulp.parallel('stylus', 'pug', 'vendor', 'coffee'))
gulp.task 'prod', gulp.series('goprod', 'default')
