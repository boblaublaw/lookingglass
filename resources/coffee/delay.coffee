
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
      Delay.stuck = true

    if st < Delay.top and Delay.stuck is true
      $('header > .inner > .menu').addClass('unstuck').removeClass 'stuck'
      Delay.stuck = false

