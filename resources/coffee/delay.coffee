
Delay =
  top: 200
  win: false
  stuck: false

  i: ->

    @win = $ window
    $(window).scroll @checkScroll

  checkScroll: ->

    st = Delay.win.scrollTop()

    if st > Delay.top and Delay.stuck is false
      $('header > .inner > .menu').addClass('stuck').removeClass 'unstuck'
      _.on 'header > .inner > .menu > .outer > .inner > .left > .lg'
      _.off 'header > .inner > .menu > .outer > .inner > .left > .loc'
      Delay.stuck = true

    if st < Delay.top and Delay.stuck is true
      $('header > .inner > .menu').addClass('unstuck').removeClass 'stuck'
      _.off 'header > .inner > .menu > .outer > .inner > .left > .lg'
      _.on 'header > .inner > .menu > .outer > .inner > .left > .loc'
      Delay.stuck = false

