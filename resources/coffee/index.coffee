Index =
  offset: -60

  i: ->
    console.log 'Index.i()'
    Delay.i()
    @handlers()

  handlers: ->
    $('header > .inner > .menu > .outer > .inner > .item').click @menuHandler

  menuHandler: ->
    Index.section $(this).data 'item'
    return false

  section: (section) ->
    setTimeout ->
      $('html, body').scrollTo "##{section}",
        duration: 500
        offset: Index.offset
      location.hash = section
    , 100


