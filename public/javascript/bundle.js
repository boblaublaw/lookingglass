var _,
  hasProp = {}.hasOwnProperty,
  slice = [].slice;

_ = {
  i: function() {
    return this.console = setInterval(this.detect.bind(this), 200);
  },
  p: {
    offing: false,
    offtime: 0
  },
  turn: function(el, remove, add) {
    if (remove == null) {
      remove = false;
    }
    if (add == null) {
      add = false;
    }
    if (!(el instanceof jQuery)) {
      el = $(el);
    }
    if (remove !== false) {
      el.removeClass(remove);
    }
    if (add !== false) {
      el.addClass(add);
    }
    return true;
  },
  off: function(el, p) {
    if (p == null) {
      p = {};
    }
    if (p.offing && p.offtime > 0) {
      this.turn(el, false, 'offing');
      setTimeout((function(_this) {
        return function() {
          _this.turn(el, 'offing', false);
          return _this.turn(el, 'on', 'off');
        };
      })(this), p.offtime * 1000 + 100);
    } else {
      this.turn(el, 'on', 'off');
    }
  },
  on: function(el, p) {
    return this.turn(el, 'off', 'on');
  },
  swap: function(el, p) {
    if (!(el instanceof jQuery)) {
      el = $(el);
    }
    if (el.hasClass('off')) {
      this.on(el, p);
    } else {
      this.off(el, p);
    }
  },
  encode: function(str) {
    return encodeURIComponent(str).replace(/!/g, '%21').replace(/'/g, '%27').replace(/\(/g, '%28').replace(/\)/g, '%29').replace(/\*/g, '%2A').replace(/%20/g, '+');
  },
  t: function(category, action, label, value) {
    return _gaq.push(['_trackEvent', category, action, label, value]);
  },
  rand: function(min, max) {
    return Math.floor(Math.random() * max) + min;
  },
  fit: function(srcWidth, srcHeight, maxWidth, maxHeight) {
    var ratio;
    ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);
    return {
      width: srcWidth * ratio,
      height: srcHeight * ratio
    };
  },
  hex2rgb: function(hex) {
    var result;
    result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    };
  },
  objc: function(obj) {
    var k;
    return ((function() {
      var results;
      results = [];
      for (k in obj) {
        if (!hasProp.call(obj, k)) continue;
        results.push(k);
      }
      return results;
    })()).length;
  },
  load: function(script, initiate, complete) {
    var el;
    el = document.createElement('script');
    el.type = 'text/javascript';
    el.src = script;
    el.addEventListener('load', function(e) {
      if (typeof complete === 'function') {
        complete();
      }
      if (initiate !== void 0 && initiate !== false) {
        return window[initiate].i();
      }
    }, false);
    return document.body.appendChild(el);
  },
  jinit: function() {
    return $.ajaxSetup({
      dataType: "json"
    });
  },
  patch: function(url, data) {
    var jpatch;
    this.jinit();
    jpatch = $.ajax({
      url: url,
      data: data,
      type: 'PATCH'
    });
    jpatch.fail(function(response) {
      return this.fail(response);
    });
    return jpatch;
  },
  get: function() {
    var args, jget;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    this.jinit();
    jget = $.get.apply($, args);
    jget.fail((function(_this) {
      return function(response) {
        _this.fail(response);
        return jget.fail(response);
      };
    })(this));
    return jget;
  },
  post: function() {
    var args, jpost;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    jpost = $.post.apply($, args);
    jpost.fail((function(_this) {
      return function(response) {
        _this.fail(response);
        return jpost.fail(response);
      };
    })(this));
    return jpost;
  },
  fail: function(response) {
    var body, editor, error, file, pug, ref, ref1;
    error = (ref = response.responseJSON) != null ? (ref1 = ref.errors) != null ? ref1[0] : void 0 : void 0;
    if (error === void 0) {
      return Prompt.i(response.status, response.statusText);
    }
    pug = error.message.match(/Pug Error: (.*?):([0-9]+)/);
    if (pug !== null) {
      error.message = error.message.replace(/Pug Error: (.*?):([0-9]+)/, '');
      error.file = pug[1];
      error.line = pug[2];
    }
    file = this.encode("" + error.file);
    switch (config.app.editor) {
      case 'macvim':
        editor = 'mvim://open?url=file://';
        break;
      case 'sublime':
        editor = 'subl://open?url=file://';
        break;
      case 'emacs':
        editor = 'emacs://open?url=file://';
        break;
      case 'textmate':
        editor = 'textmate://open/?url=file://';
        break;
      case 'phpstorm':
        editor = 'phpstorm://open?file=';
    }
    if (error.file !== null) {
      body = "<pre>" + error.message + "</pre>\n<a href=\"" + editor + file + "&line=" + error.line + "\"><b>" + error.file + ":" + error.line + "</b></a>";
    } else {
      body = error.message;
    }
    return Prompt.i(error.type, body, ['OK']);
  },
  methods: function(obj) {
    var i, m, res;
    res = [];
    for (i in obj) {
      m = obj[i];
      if (typeof m === 'function') {
        res.push(m);
      }
    }
    return res;
  },
  llc: function() {
    var ascii;
    ascii = "\n%cmmm/............................................................./mmm\nmmo................-:://::-.......-:::::::::::::-........-::///:-.omm\nmd-.............:+yhddddddhy+-..../ddddddddddddd+....../shdddddddyodm\nmo.............-hmmmhyyyydmmmh:.../mmmmhhhhhhhhh+....:ydmmdhyyyhddoom\nm-..............-ss:-....-ymmmy.../mmmm---------....:dmmms:-...-:/.-m\nd.........................ymmmy.../mmmm-/+ooo+:-....ymmmy-:+ooo+/-..d\nh.......................:smmmd:.../mmmmhmmmmmmdh+...dmmmshdmmmmmmhs-h\nh.....................:sdmmdy:....:hhdho+//+ymmmm+..dmmmdyo//+sdmmmhh\nd..................-+ydmmdy/.......--:.......smmmh..ymmms......:mmmmm\nm-..............-:shmmmds/-----....:s/--...-:hmmms..:dmmd/-...-ommmmm\nmo..............hmmmmmmhhhhhhhh...+dmmdhyyyhdmmmy-.../hmmmhyyyhmmmdhm\nmd-.............ddddddddddddddd...-+shdddddddhy/-.....-oydddddddho:dm\nmmo.............:::::::::::::::.......-:///::-...........-:///:-..omm\nmmm/............................................................./mmm\n\n:: syntactic sugar by 256\n:: http://256.io/\n:: " + config.meta.repo;
    return console.log(ascii, "color: grey; font-family: Menlo, monospace;");
  },
  detect: function() {
    if (((window.outerHeight - window.innerHeight) > 100) || ((window.outerWidth - window.innerWidth) > 100)) {
      this.llc();
      return clearInterval(this.console);
    }
  }
};

_.i();

var config;

config = {
  "color": {
    "white1": "#ffffff",
    "black1": "#000000",
    "black2": "#191919",
    "brown1": "#C29E6E",
    "brown2": "#AA8052",
    "brown3": "#876037",
    "beige1": "#C7BAA2",
    "beige2": "#E5E3DB"
  },
  "font": {
    "h1": {
      "font-family": "octavian regular",
      "font-size": "22px"
    },
    "h2": {
      "font-family": "serial regular",
      "font-size": "55px"
    },
    "copy1": {
      "font-family": "independence regular",
      "font-size": "29px"
    },
    "copy2": {
      "font-family": "Garamond",
      "font-size": "116px"
    }
  },
  "meta": {
    "url": "http://staging.lookingglass.com/",
    "title": "Looking Glass VR",
    "description": "Windows to the past are open at last",
    "keywords": "VR, VR app, looking glass",
    "tracking_id": "UA-89300822-1",
    "share": "images/share.jpg",
    "repo": "https://github.com/lookingglassvr/lookingglass",
    "social": {
      "facebook": "https://www.facebook.com/Looking-Glass-VR-178294259284296/",
      "twitter": "https://twitter.com/stereoviews"
    }
  },
  "copy": {
    "collection": {
      "title": "the collection",
      "first": "T",
      "copy": "he stereo-photos you see in Looking Glass VR are selected excerpts from the <a target=\"_blank\" href=\"https://en.wikipedia.org/wiki/Keystone_View_Company\">Keystone View Company</a>’s <a target=\"_blank\" href=\"http://www.lib.utexas.edu/taro/utcah/02182/cah-02182.html\">‘Tour of the World’</a>, a tiny glimpse of Keystone’s internationally themed stereo photography collection. From 1892 to 1933, over 300,000 such cards were produced. In 1978, the company's records and inventory of negatives were donated to the <a target=\"_blank\" href=\"http://artsblock.ucr.edu/Page/california-museum-of-photography\">UCR/California Museum of Photography at the University of California Riverside</a>, where they are now known as the <a target=\"_blank\" href=\"http://www.oac.cdlib.org/findaid/ark:/13030/ft1q2n999m/\">Keystone-Mast collection</a>."
    },
    "credits": {
      "title": "credits and thanks",
      "first": "A",
      "copy": "dditional hand lettering by <a target=\"_blank\" href=\"http://www.tobiassaul.de/\">Tobias Saul</a> and illustration by <a target=\"_blank\" href=\"http://www.weemsillustration.com/\">Matt Weems</a>. Lighting optimization by <a target=\"_blank\" href=\"http://madeofvertices.com/\">Boris Blosse</a>. Web design by <a target=\"_blank\" href=\"http://www.mahersinjary.com/\">Maher Sinjary</a>. Website by <a target=\"_blank\" href=\"http://256.io/\">Kevin Olson</a>. Prototyped with the help of <a target=\"_blank\" href=\"http://suzanimator.com/\">Suzanne Leibrick</a>. Sound effects used from <a target=\"_blank\" href=\"http://freesound.org\">freesound.org</a>. (<a target=\"_blank\" href=\"https://www.freesound.org/people/Robinhood76/sounds/125315/\">A</a> <a target=\"_blank\" href=\"http://freesound.org/people/InspectorJ/sounds/343130/\">B</a> <a target=\"_blank\" href=\"http://freesound.org/people/NightVoice/sounds/234268/\">C</a> <a target=\"_blank\" href=\"http://freesound.org/people/kwahmah_02/sounds/264096/\">D</a> <a target=\"_blank\" href=\"http://freesound.org/people/nsstudios/sounds/321114/\">E</a> <a target=\"_blank\" href=\"http://freesound.org/people/f4ngy/sounds/240776/\">F</a> <a target=\"_blank\" href=\"http://freesound.org/people/MrAuralization/sounds/184567/\">G</a> <a target=\"_blank\" href=\"http://freesound.org/people/SunnySideSound/sounds/67791/\">H</a>) With music from the <a target=\"_blank\" href=\"http://openmusicarchive.org/browse_tag.php?tag=1920s\">Open Music Archive</a>.",
      "authors": {
        "title": "Looking Glass VR was",
        "joeb": "created by <a target=\"_blank\" href=\"http://joeboyle.com\">Joe Boyle</a>",
        "kevinc": "with 3D art by <a target=\"_blank\" href=\"http://www.kevincastaneda.com/\">Kevin Castaneda</a>"
      }
    },
    "footer": {
      "copyright": "Copyright &copy; 2016 Looking Glass - All Rights Reserved"
    },
    "history": {
      "title": "history of stereoscopy",
      "copy1": "“It is a delightful characteristic of these times, that new and cheap means are continuously being devised, for conveying the results of a casual experience to those who are unable to obtain such experiences for themselves; and to bring them within the reach of the people.” —Charles Dickens",
      "first": "E",
      "copy2": "ven amongst virtual reality enthusiasts, most people don’t realize that the first 3D viewer was developed in 1838 by <a target=\"_blank\" href=\"http://www.stereoscopy.com/faq/wheatstone.html\">Charles Wheatstone</a> - almost 180 years ago! Since before the popularization of television, radio, cinema, or virtual reality, people have been exploring the world through immersive stereo 3D images. Since the invention of the stereoscope, up through the mid 20th century, hundreds of thousands of stereographic photos cards were produced and distributed all over the world. Though nearly forgotten, these photo cards can again be viewed as intended, thanks to the advent of mobile VR."
    },
    "howto": {
      "title": "how to use looking glass vr",
      "instructions": ["Make sure you have a <a target=\"_blank\" href=\"https://vr.google.com/cardboard/get-cardboard/\">Google Cardboard headset</a>. (One with a trigger!)", "Install <a target=\"_blank\" href=\"https://play.google.com/store/apps/details?id=photos.stereographic.cardboard\">Looking Glass VR</a> from the Google Play Store.", "Turn on your WiFi & launch the application.", "Click your trigger on the stereoscope to get started."],
      "extra": "If your Cardboard device does not have a trigger, you can use a <a target=\"_blank\" href=\"https://www.amazon.com/SteelSeries-Stratus-Bluetooth-Wireless-Controller/dp/B015WKY3IM/ref=sr_1_1\">bluetooth controller</a> to interact with the application."
    },
    "intro": {
      "first": "W",
      "copy": "elcome to Looking Glass VR. Looking Glass VR is a mobile application for <a target=\"_blank\" href=\"https://vr.google.com/cardboard/\">Google Cardboard</a> which brings historic stereographic 3D photos from yesteryear into focus. You can find <a target=\"_blank\" href=\"https://play.google.com/store/apps/details?id=photos.stereographic.cardboard\">Looking Glass VR in the Google Play Store</a>, but to get the 3D effect  you will need to <a target=\"_blank\" href=\"https://vr.google.com/cardboard/get-cardboard/\">get a Google Cardboard VR device</a>. (Be sure to get one with a trigger!)"
    }
  }
};

var Delay;

Delay = {
  top: 200,
  win: false,
  stuck: false,
  i: function() {
    this.win = $(window);
    return $(window).scroll(this.checkScroll);
  },
  checkScroll: function() {
    var st;
    st = Delay.win.scrollTop();
    if (st > Delay.top && Delay.stuck === false) {
      $('header > .inner > .menu').addClass('stuck').removeClass('unstuck');
      _.on('header > .inner > .menu > .outer > .inner > .left > .lg');
      _.off('header > .inner > .menu > .outer > .inner > .left > .loc');
      Delay.stuck = true;
    }
    if (st < Delay.top && Delay.stuck === true) {
      $('header > .inner > .menu').addClass('unstuck').removeClass('stuck');
      _.off('header > .inner > .menu > .outer > .inner > .left > .lg');
      _.on('header > .inner > .menu > .outer > .inner > .left > .loc');
      return Delay.stuck = false;
    }
  }
};

var Index;

Index = {
  offset: -60,
  i: function() {
    console.log('Index.i()');
    Delay.i();
    return this.handlers();
  },
  handlers: function() {
    $('header > .inner > .menu > .outer > .inner > .item').click(this.menuHandler);
    return $('header > .inner > .menu > .outer > .inner > .left > .lg').click(this.menuHandler);
  },
  menuHandler: function() {
    Index.section($(this).data('item'));
    return false;
  },
  section: function(section) {
    return setTimeout(function() {
      $('html, body').scrollTo("#" + section, {
        duration: 500,
        offset: Index.offset
      });
      return location.hash = section;
    }, 100);
  }
};

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9yZXNvdXJjZXMvY29mZmVlLzI1Ni5jb2ZmZWUiLCIvcmVzb3VyY2VzL2NvZmZlZS9jb25maWcuY29mZmVlIiwiL3Jlc291cmNlcy9jb2ZmZWUvZGVsYXkuY29mZmVlIiwiL3Jlc291cmNlcy9jb2ZmZWUvaW5kZXguY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUEsQ0FBQTtFQUFBOzs7QUFBQSxDQUFBLEdBRUU7RUFBQSxDQUFBLEVBQUcsU0FBQTtXQUNELElBQUMsQ0FBQSxPQUFELEdBQVcsV0FBQSxDQUFZLElBQUMsQ0FBQSxNQUFNLENBQUMsSUFBUixDQUFhLElBQWIsQ0FBWixFQUE2QixHQUE3QjtFQURWLENBQUg7RUFHQSxDQUFBLEVBQ0U7SUFBQSxNQUFBLEVBQVEsS0FBUjtJQUNBLE9BQUEsRUFBUyxDQURUO0dBSkY7RUFPQSxJQUFBLEVBQU0sU0FBQyxFQUFELEVBQUssTUFBTCxFQUFtQixHQUFuQjs7TUFBSyxTQUFPOzs7TUFBTyxNQUFJOztJQUUzQixJQUFHLENBQUEsQ0FBQSxFQUFBLFlBQWtCLE1BQWxCLENBQUg7TUFDRSxFQUFBLEdBQUssQ0FBQSxDQUFFLEVBQUYsRUFEUDs7SUFHQSxJQUFHLE1BQUEsS0FBWSxLQUFmO01BQ0UsRUFBRSxDQUFDLFdBQUgsQ0FBZSxNQUFmLEVBREY7O0lBR0EsSUFBRyxHQUFBLEtBQVMsS0FBWjtNQUNFLEVBQUUsQ0FBQyxRQUFILENBQVksR0FBWixFQURGOztBQUdBLFdBQU87RUFYSCxDQVBOO0VBb0JBLEdBQUEsRUFBSyxTQUFDLEVBQUQsRUFBSyxDQUFMOztNQUFLLElBQUU7O0lBRVYsSUFBRyxDQUFDLENBQUMsTUFBRixJQUFhLENBQUMsQ0FBQyxPQUFGLEdBQVksQ0FBNUI7TUFFRSxJQUFDLENBQUEsSUFBRCxDQUFNLEVBQU4sRUFBVSxLQUFWLEVBQWlCLFFBQWpCO01BQ0EsVUFBQSxDQUFXLENBQUEsU0FBQSxLQUFBO2VBQUEsU0FBQTtVQUNULEtBQUMsQ0FBQSxJQUFE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QUNYLEtBQUssQ0FBQyxPQUFOLENBQWMsQ0FBQSxDQUFFLElBQUYsQ0FBTyxDQUFDLElBQVIsQ0FBYSxNQUFiLENBQWQ7QUFDQSxXQUFPO0VBRkksQ0FYYjtFQWVBLE9BQUEsRUFBUyxTQUFDLE9BQUQ7V0FDUCxVQUFBLENBQVcsU0FBQTtNQUNULENBQUEsQ0FBRSxZQUFGLENBQWUsQ0FBQyxRQUFoQixDQUF5QixHQUFBLEdBQUksT0FBN0IsRUFDRTtRQUFBLFFBQUEsRUFBVSxHQUFWO1FBQ0EsTUFBQSxFQUFRLEtBQUssQ0FBQyxNQURkO09BREY7YUFHQSxRQUFRLENBQUMsSUFBVCxHQUFnQjtJQUpQLENBQVgsRUFLRSxHQUxGO0VBRE8sQ0FmVCIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJfID1cblxuICBpOiAtPlxuICAgIEBjb25zb2xlID0gc2V0SW50ZXJ2YWwoQGRldGVjdC5iaW5kKEApLCAyMDApXG5cbiAgcDpcbiAgICBvZmZpbmc6IGZhbHNlXG4gICAgb2ZmdGltZTogMFxuXG4gIHR1cm46IChlbCwgcmVtb3ZlPWZhbHNlLCBhZGQ9ZmFsc2UpIC0+XG5cbiAgICBpZiBlbCBub3QgaW5zdGFuY2VvZiBqUXVlcnlcbiAgICAgIGVsID0gJChlbClcblxuICAgIGlmIHJlbW92ZSBpc250IGZhbHNlXG4gICAgICBlbC5yZW1vdmVDbGFzcyhyZW1vdmUpXG5cbiAgICBpZiBhZGQgaXNudCBmYWxzZVxuICAgICAgZWwuYWRkQ2xhc3MoYWRkKVxuXG4gICAgcmV0dXJuIHRydWVcblxuICBvZmY6IChlbCwgcD17fSkgLT5cblxuICAgIGlmIHAub2ZmaW5nIGFuZCBwLm9mZnRpbWUgPiAwXG5cbiAgICAgIEB0dXJuIGVsLCBmYWxzZSwgJ29mZmluZydcbiAgICAgIHNldFRpbWVvdXQgPT5cbiAgICAgICAgQHR1cm4gZWwsICdvZmZpbmcnLCBmYWxzZVxuICAgICAgICBAdHVybiBlbCwgJ29uJywgJ29mZidcbiAgICAgICwgcC5vZmZ0aW1lKjEwMDAgKyAxMDBcblxuICAgIGVsc2VcbiAgICAgIEB0dXJuIGVsLCAnb24nLCAnb2ZmJ1xuXG4gICAgcmV0dXJuXG5cbiAgb246IChlbCwgcCkgLT5cbiAgICBAdHVybiBlbCwgJ29mZicsICdvbidcblxuICBzd2FwOiAoZWwsIHApIC0+XG5cbiAgICBpZiBlbCBub3QgaW5zdGFuY2VvZiBqUXVlcnlcbiAgICAgIGVsID0gJChlbClcblxuICAgIGlmIGVsLmhhc0NsYXNzICdvZmYnXG4gICAgICBAb24gZWwsIHBcbiAgICBlbHNlXG4gICAgICBAb2ZmIGVsLCBwXG5cbiAgICByZXR1cm5cblxuICBlbmNvZGU6IChzdHIpIC0+XG4gICAgcmV0dXJuIGVuY29kZVVSSUNvbXBvbmVudChzdHIpXG4gICAgICAucmVwbGFjZSgvIS9nLCAnJTIxJylcbiAgICAgIC5yZXBsYWNlKC8nL2csICclMjcnKVxuICAgICAgLnJlcGxhY2UoL1xcKC9nLCAnJTI4JylcbiAgICAgIC5yZXBsYWNlKC9cXCkvZywgJyUyOScpXG4gICAgICAucmVwbGFjZSgvXFwqL2csICclMkEnKVxuICAgICAgLnJlcGxhY2UoLyUyMC9nLCAnKycpXG5cbiAgdDogKGNhdGVnb3J5LCBhY3Rpb24sIGxhYmVsLCB2YWx1ZSkgLT5cbiAgICBfZ2FxLnB1c2ggWydfdHJhY2tFdmVudCcsIGNhdGVnb3J5LCBhY3Rpb24sIGxhYmVsLCB2YWx1ZV1cblxuICByYW5kOiAobWluLCBtYXgpIC0+XG4gICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIG1heCkgKyBtaW5cblxuICBmaXQ6IChzcmNXaWR0aCwgc3JjSGVpZ2h0LCBtYXhXaWR0aCwgbWF4SGVpZ2h0KSAtPlxuICAgIHJhdGlvID0gTWF0aC5taW4obWF4V2lkdGggLyBzcmNXaWR0aCwgbWF4SGVpZ2h0IC8gc3JjSGVpZ2h0KVxuICAgIHdpZHRoOiBzcmNXaWR0aCpyYXRpbywgaGVpZ2h0OiBzcmNIZWlnaHQqcmF0aW9cblxuICBoZXgycmdiOiAoaGV4KSAtPlxuICAgIHJlc3VsdCA9IC9eIz8oW2EtZlxcZF17Mn0pKFthLWZcXGRdezJ9KShbYS1mXFxkXXsyfSkkL2kuZXhlYyhoZXgpXG4gICAgcjogcGFyc2VJbnQocmVzdWx0WzFdLCAxNiksXG4gICAgZzogcGFyc2VJbnQocmVzdWx0WzJdLCAxNiksXG4gICAgYjogcGFyc2VJbnQocmVzdWx0WzNdLCAxNilcbiBcbiAgb2JqYzogKG9iaikgLT5cbiAgICAoayBmb3Igb3duIGsgb2Ygb2JqKS5sZW5ndGhcblxuICBsb2FkOiAoc2NyaXB0LCBpbml0aWF0ZSwgY29tcGxldGUpIC0+XG5cbiAgICBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQgJ3NjcmlwdCdcbiAgICBlbC50eXBlID0gJ3RleHQvamF2YXNjcmlwdCdcbiAgICBlbC5zcmMgPSBzY3JpcHRcbiAgICBlbC5hZGRFdmVudExpc3RlbmVyICdsb2FkJyAsIChlKSAtPlxuICAgICAgY29tcGxldGUoKSBpZiB0eXBlb2YgY29tcGxldGUgaXMgJ2Z1bmN0aW9uJ1xuICAgICAgd2luZG93W2luaXRpYXRlXS5pKCkgaWYgaW5pdGlhdGUgaXNudCB1bmRlZmluZWQgYW5kIGluaXRpYXRlIGlzbnQgZmFsc2VcbiAgICAsIGZhbHNlXG5cbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGVsKVxuXG4gIGppbml0OiAtPlxuICAgICQuYWpheFNldHVwXG4gICAgICBkYXRhVHlwZTogXCJqc29uXCJcblxuICBwYXRjaDogKHVybCwgZGF0YSkgLT5cblxuICAgIEBqaW5pdCgpXG5cbiAgICBqcGF0Y2ggPSAkLmFqYXhcbiAgICAgIHVybDogdXJsXG4gICAgICBkYXRhOiBkYXRhXG4gICAgICB0eXBlOiAnUEFUQ0gnXG5cbiAgICBqcGF0Y2guZmFpbCAocmVzcG9uc2UpIC0+XG4gICAgICBAZmFpbChyZXNwb25zZSlcblxuICAgIHJldHVybiBqcGF0Y2hcblxuICBnZXQ6IChhcmdzLi4uKSAtPlxuXG4gICAgQGppbml0KClcblxuICAgIGpnZXQgPSAkLmdldCBhcmdzLi4uXG5cbiAgICBqZ2V0LmZhaWwgKHJlc3BvbnNlKSA9PlxuICAgICAgQGZhaWwocmVzcG9uc2UpXG4gICAgICBqZ2V0LmZhaWwocmVzcG9uc2UpXG5cbiAgICByZXR1cm4gamdldFxuXG4gIHBvc3Q6IChhcmdzLi4uKSAtPlxuXG4gICAganBvc3QgPSAkLnBvc3QgYXJncy4uLlxuXG4gICAganBvc3QuZmFpbCAocmVzcG9uc2UpID0+XG4gICAgICBAZmFpbChyZXNwb25zZSlcbiAgICAgIGpwb3N0LmZhaWwocmVzcG9uc2UpXG5cbiAgICByZXR1cm4ganBvc3RcblxuICBmYWlsOiAocmVzcG9uc2UpIC0+XG5cbiAgICBlcnJvciA9IHJlc3BvbnNlLnJlc3BvbnNlSlNPTj8uZXJyb3JzP1swXVxuICAgIGlmIGVycm9yIGlzIHVuZGVmaW5lZFxuICAgICAgcmV0dXJuIFByb21wdC5pIHJlc3BvbnNlLnN0YXR1cywgcmVzcG9uc2Uuc3RhdHVzVGV4dFxuXG4gICAgcHVnID0gZXJyb3IubWVzc2FnZS5tYXRjaCAvUHVnIEVycm9yOiAoLio/KTooWzAtOV0rKS9cbiAgICBpZiBwdWcgaXNudCBudWxsXG4gICAgICBlcnJvci5tZXNzYWdlID0gZXJyb3IubWVzc2FnZS5yZXBsYWNlIC9QdWcgRXJyb3I6ICguKj8pOihbMC05XSspLywgJydcbiAgICAgIGVycm9yLmZpbGUgPSBwdWdbMV1cbiAgICAgIGVycm9yLmxpbmUgPSBwdWdbMl1cblxuICAgIGZpbGUgPSBAZW5jb2RlIFwiI3tlcnJvci5maWxlfVwiXG5cbiAgICBzd2l0Y2ggY29uZmlnLmFwcC5lZGl0b3JcbiAgICAgIHdoZW4gJ21hY3ZpbScgdGhlbiBlZGl0b3IgPSAnbXZpbTovL29wZW4/dXJsPWZpbGU6Ly8nXG4gICAgICB3aGVuICdzdWJsaW1lJyB0aGVuIGVkaXRvciA9ICdzdWJsOi8vb3Blbj91cmw9ZmlsZTovLydcbiAgICAgIHdoZW4gJ2VtYWNzJyB0aGVuIGVkaXRvciA9ICdlbWFjczovL29wZW4/dXJsPWZpbGU6Ly8nXG4gICAgICB3aGVuICd0ZXh0bWF0ZScgdGhlbiBlZGl0b3IgPSAndGV4dG1hdGU6Ly9vcGVuLz91cmw9ZmlsZTovLydcbiAgICAgIHdoZW4gJ3BocHN0b3JtJyB0aGVuIGVkaXRvciA9ICdwaHBzdG9ybTovL29wZW4/ZmlsZT0nXG5cbiAgICBpZiBlcnJvci5maWxlIGlzbnQgbnVsbFxuICAgICAgYm9keSA9IFwiXCJcIlxuICAgICAgICA8cHJlPiN7ZXJyb3IubWVzc2FnZX08L3ByZT5cbiAgICAgICAgPGEgaHJlZj1cIiN7ZWRpdG9yfSN7ZmlsZX0mbGluZT0je2Vycm9yLmxpbmV9XCI+PGI+I3tlcnJvci5maWxlfToje2Vycm9yLmxpbmV9PC9iPjwvYT5cbiAgICAgIFwiXCJcIlxuICAgIGVsc2VcbiAgICAgIGJvZHkgPSBlcnJvci5tZXNzYWdlXG5cbiAgICBQcm9tcHQuaSBlcnJvci50eXBlLCBib2R5LCBbJ09LJ11cblxuICBtZXRob2RzOiAob2JqKSAtPlxuICAgIHJlcyA9IFtdXG4gICAgZm9yIGksbSBvZiBvYmpcbiAgICAgIGlmIHR5cGVvZiBtIGlzICdmdW5jdGlvbidcbiAgICAgICAgcmVzLnB1c2ggbVxuICAgIHJldHVybiByZXNcblxuICBsbGM6IC0+XG4gICAgYXNjaWkgPSBcIlwiXCJcblxuICAgICAgJWNtbW0vLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi9tbW1cbiAgICAgIG1tby4uLi4uLi4uLi4uLi4uLi4tOjovLzo6LS4uLi4uLi4tOjo6Ojo6Ojo6Ojo6Oi0uLi4uLi4uLi06Oi8vLzotLm9tbVxuICAgICAgbWQtLi4uLi4uLi4uLi4uLjoreWhkZGRkZGRoeSstLi4uLi9kZGRkZGRkZGRkZGRkKy4uLi4uLi9zaGRkZGRkZGR5b2RtXG4gICAgICBtby4uLi4uLi4uLi4uLi4taG1tbWh5eXl5ZG1tbWg6Li4uL21tbW1oaGhoaGhoaGgrLi4uLjp5ZG1tZGh5eXloZGRvb21cbiAgICAgIG0tLi4uLi4uLi4uLi4uLi4tc3M6LS4uLi4teW1tbXkuLi4vbW1tbS0tLS0tLS0tLS4uLi46ZG1tbXM6LS4uLi06Ly4tbVxuICAgICAgZC4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi55bW1teS4uLi9tbW1tLS8rb29vKzotLi4uLnltbW15LTorb29vKy8tLi5kXG4gICAgICBoLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi46c21tbWQ6Li4uL21tbW1obW1tbW1tZGgrLi4uZG1tbXNoZG1tbW1tbWhzLWhcbiAgICAgIGguLi4uLi4uLi4uLi4uLi4uLi4uLi46c2RtbWR5Oi4uLi46aGhkaG8rLy8reW1tbW0rLi5kbW1tZHlvLy8rc2RtbW1oaFxuICAgICAgZC4uLi4uLi4uLi4uLi4uLi4uLi0reWRtbWR5Ly4uLi4uLi4tLTouLi4uLi4uc21tbWguLnltbW1zLi4uLi4uOm1tbW1tXG4gICAgICBtLS4uLi4uLi4uLi4uLi4uLTpzaG1tbWRzLy0tLS0tLi4uLjpzLy0tLi4uLTpobW1tcy4uOmRtbWQvLS4uLi1vbW1tbW1cbiAgICAgIG1vLi4uLi4uLi4uLi4uLi5obW1tbW1taGhoaGhoaGguLi4rZG1tZGh5eXloZG1tbXktLi4uL2htbW1oeXl5aG1tbWRobVxuICAgICAgbWQtLi4uLi4uLi4uLi4uLmRkZGRkZGRkZGRkZGRkZC4uLi0rc2hkZGRkZGRkaHkvLS4uLi4uLW95ZGRkZGRkZGhvOmRtXG4gICAgICBtbW8uLi4uLi4uLi4uLi4uOjo6Ojo6Ojo6Ojo6Ojo6Li4uLi4uLi06Ly8vOjotLi4uLi4uLi4uLi4tOi8vLzotLi5vbW1cbiAgICAgIG1tbS8uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uL21tbVxuXG4gICAgICA6OiBzeW50YWN0aWMgc3VnYXIgYnkgMjU2XG4gICAgICA6OiBodHRwOi8vMjU2LmlvL1xuICAgICAgOjogI3tjb25maWcubWV0YS5yZXBvfVxuICAgIFwiXCJcIlxuICAgIGNvbnNvbGUubG9nIGFzY2lpLCBcImNvbG9yOiBncmV5OyBmb250LWZhbWlseTogTWVubG8sIG1vbm9zcGFjZTtcIlxuXG4gIGRldGVjdDogLT5cbiAgICBpZiAoKCh3aW5kb3cub3V0ZXJIZWlnaHQgLSB3aW5kb3cuaW5uZXJIZWlnaHQpID4gMTAwKSB8fCAoKHdpbmRvdy5vdXRlcldpZHRoIC0gd2luZG93LmlubmVyV2lkdGgpID4gMTAwKSlcbiAgICAgIEBsbGMoKVxuICAgICAgY2xlYXJJbnRlcnZhbCBAY29uc29sZVxuXG5fLmkoKVxuIiwiY29uZmlnID0ge1wiY29sb3JcIjp7XCJ3aGl0ZTFcIjpcIiNmZmZmZmZcIixcImJsYWNrMVwiOlwiIzAwMDAwMFwiLFwiYmxhY2syXCI6XCIjMTkxOTE5XCIsXCJicm93bjFcIjpcIiNDMjlFNkVcIixcImJyb3duMlwiOlwiI0FBODA1MlwiLFwiYnJvd24zXCI6XCIjODc2MDM3XCIsXCJiZWlnZTFcIjpcIiNDN0JBQTJcIixcImJlaWdlMlwiOlwiI0U1RTNEQlwifSxcImZvbnRcIjp7XCJoMVwiOntcImZvbnQtZmFtaWx5XCI6XCJvY3RhdmlhbiByZWd1bGFyXCIsXCJmb250LXNpemVcIjpcIjIycHhcIn0sXCJoMlwiOntcImZvbnQtZmFtaWx5XCI6XCJzZXJpYWwgcmVndWxhclwiLFwiZm9udC1zaXplXCI6XCI1NXB4XCJ9LFwiY29weTFcIjp7XCJmb250LWZhbWlseVwiOlwiaW5kZXBlbmRlbmNlIHJlZ3VsYXJcIixcImZvbnQtc2l6ZVwiOlwiMjlweFwifSxcImNvcHkyXCI6e1wiZm9udC1mYW1pbHlcIjpcIkdhcmFtb25kXCIsXCJmb250LXNpemVcIjpcIjExNnB4XCJ9fSxcIm1ldGFcIjp7XCJ1cmxcIjpcImh0dHA6Ly9zdGFnaW5nLmxvb2tpbmdnbGFzcy5jb20vXCIsXCJ0aXRsZVwiOlwiTG9va2luZyBHbGFzcyBWUlwiLFwiZGVzY3JpcHRpb25cIjpcIldpbmRvd3MgdG8gdGhlIHBhc3QgYXJlIG9wZW4gYXQgbGFzdFwiLFwia2V5d29yZHNcIjpcIlZSLCBWUiBhcHAsIGxvb2tpbmcgZ2xhc3NcIixcInRyYWNraW5nX2lkXCI6XCJVQS04OTMwMDgyMi0xXCIsXCJzaGFyZVwiOlwiaW1hZ2VzL3NoYXJlLmpwZ1wiLFwicmVwb1wiOlwiaHR0cHM6Ly9naXRodWIuY29tL2xvb2tpbmdnbGFzc3ZyL2xvb2tpbmdnbGFzc1wiLFwic29jaWFsXCI6e1wiZmFjZWJvb2tcIjpcImh0dHBzOi8vd3d3LmZhY2Vib29rLmNvbS9Mb29raW5nLUdsYXNzLVZSLTE3ODI5NDI1OTI4NDI5Ni9cIixcInR3aXR0ZXJcIjpcImh0dHBzOi8vdHdpdHRlci5jb20vc3RlcmVvdmlld3NcIn19LFwiY29weVwiOntcImNvbGxlY3Rpb25cIjp7XCJ0aXRsZVwiOlwidGhlIGNvbGxlY3Rpb25cIixcImZpcnN0XCI6XCJUXCIsXCJjb3B5XCI6XCJoZSBzdGVyZW8tcGhvdG9zIHlvdSBzZWUgaW4gTG9va2luZyBHbGFzcyBWUiBhcmUgc2VsZWN0ZWQgZXhjZXJwdHMgZnJvbSB0aGUgPGEgdGFyZ2V0PVxcXCJfYmxhbmtcXFwiIGhyZWY9XFxcImh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0tleXN0b25lX1ZpZXdfQ29tcGFueVxcXCI+S2V5c3RvbmUgVmlldyBDb21wYW55PC9hPuKAmXMgPGEgdGFyZ2V0PVxcXCJfYmxhbmtcXFwiIGhyZWY9XFxcImh0dHA6Ly93d3cubGliLnV0ZXhhcy5lZHUvdGFyby91dGNhaC8wMjE4Mi9jYWgtMDIxODIuaHRtbFxcXCI+4oCYVG91ciBvZiB0aGUgV29ybGTigJk8L2E+LCBhIHRpbnkgZ2xpbXBzZSBvZiBLZXlzdG9uZeKAmXMgaW50ZXJuYXRpb25hbGx5IHRoZW1lZCBzdGVyZW8gcGhvdG9ncmFwaHkgY29sbGVjdGlvbi4gRnJvbSAxODkyIHRvIDE5MzMsIG92ZXIgMzAwLDAwMCBzdWNoIGNhcmRzIHdlcmUgcHJvZHVjZWQuIEluIDE5NzgsIHRoZSBjb21wYW55J3MgcmVjb3JkcyBhbmQgaW52ZW50b3J5IG9mIG5lZ2F0aXZlcyB3ZXJlIGRvbmF0ZWQgdG8gdGhlIDxhIHRhcmdldD1cXFwiX2JsYW5rXFxcIiBocmVmPVxcXCJodHRwOi8vYXJ0c2Jsb2NrLnVjci5lZHUvUGFnZS9jYWxpZm9ybmlhLW11c2V1bS1vZi1waG90b2dyYXBoeVxcXCI+VUNSL0NhbGlmb3JuaWEgTXVzZXVtIG9mIFBob3RvZ3JhcGh5IGF0IHRoZSBVbml2ZXJzaXR5IG9mIENhbGlmb3JuaWEgUml2ZXJzaWRlPC9hPiwgd2hlcmUgdGhleSBhcmUgbm93IGtub3duIGFzIHRoZSA8YSB0YXJnZXQ9XFxcIl9ibGFua1xcXCIgaHJlZj1cXFwiaHR0cDovL3d3dy5vYWMuY2RsaWIub3JnL2ZpbmRhaWQvYXJrOi8xMzAzMC9mdDFxMm45OTltL1xcXCI+S2V5c3RvbmUtTWFzdCBjb2xsZWN0aW9uPC9hPi5cIn0sXCJjcmVkaXRzXCI6e1widGl0bGVcIjpcImNyZWRpdHMgYW5kIHRoYW5rc1wiLFwiZmlyc3RcIjpcIkFcIixcImNvcHlcIjpcImRkaXRpb25hbCBoYW5kIGxldHRlcmluZyBieSA8YSB0YXJnZXQ9XFxcIl9ibGFua1xcXCIgaHJlZj1cXFwiaHR0cDovL3d3dy50b2JpYXNzYXVsLmRlL1xcXCI+VG9iaWFzIFNhdWw8L2E+IGFuZCBpbGx1c3RyYXRpb24gYnkgPGEgdGFyZ2V0PVxcXCJfYmxhbmtcXFwiIGhyZWY9XFxcImh0dHA6Ly93d3cud2VlbXNpbGx1c3RyYXRpb24uY29tL1xcXCI+TWF0dCBXZWVtczwvYT4uIExpZ2h0aW5nIG9wdGltaXphdGlvbiBieSA8YSB0YXJnZXQ9XFxcIl9ibGFua1xcXCIgaHJlZj1cXFwiaHR0cDovL21hZGVvZnZlcnRpY2VzLmNvbS9cXFwiPkJvcmlzIEJsb3NzZTwvYT4uIFdlYiBkZXNpZ24gYnkgPGEgdGFyZ2V0PVxcXCJfYmxhbmtcXFwiIGhyZWY9XFxcImh0dHA6Ly93d3cubWFoZXJzaW5qYXJ5LmNvbS9cXFwiPk1haGVyIFNpbmphcnk8L2E+LiBXZWJzaXRlIGJ5IDxhIHRhcmdldD1cXFwiX2JsYW5rXFxcIiBocmVmPVxcXCJodHRwOi8vMjU2LmlvL1xcXCI+S2V2aW4gT2xzb248L2E+LiBQcm90b3R5cGVkIHdpdGggdGhlIGhlbHAgb2YgPGEgdGFyZ2V0PVxcXCJfYmxhbmtcXFwiIGhyZWY9XFxcImh0dHA6Ly9zdXphbmltYXRvci5jb20vXFxcIj5TdXphbm5lIExlaWJyaWNrPC9hPi4gU291bmQgZWZmZWN0cyB1c2VkIGZyb20gPGEgdGFyZ2V0PVxcXCJfYmxhbmtcXFwiIGhyZWY9XFxcImh0dHA6Ly9mcmVlc291bmQub3JnXFxcIj5mcmVlc291bmQub3JnPC9hPi4gKDxhIHRhcmdldD1cXFwiX2JsYW5rXFxcIiBocmVmPVxcXCJodHRwczovL3d3dy5mcmVlc291bmQub3JnL3Blb3BsZS9Sb2Jpbmhvb2Q3Ni9zb3VuZHMvMTI1MzE1L1xcXCI+QTwvYT4gPGEgdGFyZ2V0PVxcXCJfYmxhbmtcXFwiIGhyZWY9XFxcImh0dHA6Ly9mcmVlc291bmQub3JnL3Blb3BsZS9JbnNwZWN0b3JKL3NvdW5kcy8zNDMxMzAvXFxcIj5CPC9hPiA8YSB0YXJnZXQ9XFxcIl9ibGFua1xcXCIgaHJlZj1cXFwiaHR0cDovL2ZyZWVzb3VuZC5vcmcvcGVvcGxlL05pZ2h0Vm9pY2Uvc291bmRzLzIzNDI2OC9cXFwiPkM8L2E+IDxhIHRhcmdldD1cXFwiX2JsYW5rXFxcIiBocmVmPVxcXCJodHRwOi8vZnJlZXNvdW5kLm9yZy9wZW9wbGUva3dhaG1haF8wMi9zb3VuZHMvMjY0MDk2L1xcXCI+RDwvYT4gPGEgdGFyZ2V0PVxcXCJfYmxhbmtcXFwiIGhyZWY9XFxcImh0dHA6Ly9mcmVlc291bmQub3JnL3Blb3BsZS9uc3N0dWRpb3Mvc291bmRzLzMyMTExNC9cXFwiPkU8L2E+IDxhIHRhcmdldD1cXFwiX2JsYW5rXFxcIiBocmVmPVxcXCJodHRwOi8vZnJlZXNvdW5kLm9yZy9wZW9wbGUvZjRuZ3kvc291bmRzLzI0MDc3Ni9cXFwiPkY8L2E+IDxhIHRhcmdldD1cXFwiX2JsYW5rXFxcIiBocmVmPVxcXCJodHRwOi8vZnJlZXNvdW5kLm9yZy9wZW9wbGUvTXJBdXJhbGl6YXRpb24vc291bmRzLzE4NDU2Ny9cXFwiPkc8L2E+IDxhIHRhcmdldD1cXFwiX2JsYW5rXFxcIiBocmVmPVxcXCJodHRwOi8vZnJlZXNvdW5kLm9yZy9wZW9wbGUvU3VubnlTaWRlU291bmQvc291bmRzLzY3NzkxL1xcXCI+SDwvYT4pIFdpdGggbXVzaWMgZnJvbSB0aGUgPGEgdGFyZ2V0PVxcXCJfYmxhbmtcXFwiIGhyZWY9XFxcImh0dHA6Ly9vcGVubXVzaWNhcmNoaXZlLm9yZy9icm93c2VfdGFnLnBocD90YWc9MTkyMHNcXFwiPk9wZW4gTXVzaWMgQXJjaGl2ZTwvYT4uXCIsXCJhdXRob3JzXCI6e1widGl0bGVcIjpcIkxvb2tpbmcgR2xhc3MgVlIgd2FzXCIsXCJqb2ViXCI6XCJjcmVhdGVkIGJ5IDxhIHRhcmdldD1cXFwiX2JsYW5rXFxcIiBocmVmPVxcXCJodHRwOi8vam9lYm95bGUuY29tXFxcIj5Kb2UgQm95bGU8L2E+XCIsXCJrZXZpbmNcIjpcIndpdGggM0QgYXJ0IGJ5IDxhIHRhcmdldD1cXFwiX2JsYW5rXFxcIiBocmVmPVxcXCJodHRwOi8vd3d3LmtldmluY2FzdGFuZWRhLmNvbS9cXFwiPktldmluIENhc3RhbmVkYTwvYT5cIn19LFwiZm9vdGVyXCI6e1wiY29weXJpZ2h0XCI6XCJDb3B5cmlnaHQgJmNvcHk7IDIwMTYgTG9va2luZyBHbGFzcyAtIEFsbCBSaWdodHMgUmVzZXJ2ZWRcIn0sXCJoaXN0b3J5XCI6e1widGl0bGVcIjpcImhpc3Rvcnkgb2Ygc3RlcmVvc2NvcHlcIixcImNvcHkxXCI6XCLigJxJdCBpcyBhIGRlbGlnaHRmdWwgY2hhcmFjdGVyaXN0aWMgb2YgdGhlc2UgdGltZXMsIHRoYXQgbmV3IGFuZCBjaGVhcCBtZWFucyBhcmUgY29udGludW91c2x5IGJlaW5nIGRldmlzZWQsIGZvciBjb252ZXlpbmcgdGhlIHJlc3VsdHMgb2YgYSBjYXN1YWwgZXhwZXJpZW5jZSB0byB0aG9zZSB3aG8gYXJlIHVuYWJsZSB0byBvYnRhaW4gc3VjaCBleHBlcmllbmNlcyBmb3IgdGhlbXNlbHZlczsgYW5kIHRvIGJyaW5nIHRoZW0gd2l0aGluIHRoZSByZWFjaCBvZiB0aGUgcGVvcGxlLuKAnSDigJRDaGFybGVzIERpY2tlbnNcIixcImZpcnN0XCI6XCJFXCIsXCJjb3B5MlwiOlwidmVuIGFtb25nc3QgdmlydHVhbCByZWFsaXR5IGVudGh1c2lhc3RzLCBtb3N0IHBlb3BsZSBkb27igJl0IHJlYWxpemUgdGhhdCB0aGUgZmlyc3QgM0Qgdmlld2VyIHdhcyBkZXZlbG9wZWQgaW4gMTgzOCBieSA8YSB0YXJnZXQ9XFxcIl9ibGFua1xcXCIgaHJlZj1cXFwiaHR0cDovL3d3dy5zdGVyZW9zY29weS5jb20vZmFxL3doZWF0c3RvbmUuaHRtbFxcXCI+Q2hhcmxlcyBXaGVhdHN0b25lPC9hPiAtIGFsbW9zdCAxODAgeWVhcnMgYWdvISBTaW5jZSBiZWZvcmUgdGhlIHBvcHVsYXJpemF0aW9uIG9mIHRlbGV2aXNpb24sIHJhZGlvLCBjaW5lbWEsIG9yIHZpcnR1YWwgcmVhbGl0eSwgcGVvcGxlIGhhdmUgYmVlbiBleHBsb3JpbmcgdGhlIHdvcmxkIHRocm91Z2ggaW1tZXJzaXZlIHN0ZXJlbyAzRCBpbWFnZXMuIFNpbmNlIHRoZSBpbnZlbnRpb24gb2YgdGhlIHN0ZXJlb3Njb3BlLCB1cCB0aHJvdWdoIHRoZSBtaWQgMjB0aCBjZW50dXJ5LCBodW5kcmVkcyBvZiB0aG91c2FuZHMgb2Ygc3RlcmVvZ3JhcGhpYyBwaG90b3MgY2FyZHMgd2VyZSBwcm9kdWNlZCBhbmQgZGlzdHJpYnV0ZWQgYWxsIG92ZXIgdGhlIHdvcmxkLiBUaG91Z2ggbmVhcmx5IGZvcmdvdHRlbiwgdGhlc2UgcGhvdG8gY2FyZHMgY2FuIGFnYWluIGJlIHZpZXdlZCBhcyBpbnRlbmRlZCwgdGhhbmtzIHRvIHRoZSBhZHZlbnQgb2YgbW9iaWxlIFZSLlwifSxcImhvd3RvXCI6e1widGl0bGVcIjpcImhvdyB0byB1c2UgbG9va2luZyBnbGFzcyB2clwiLFwiaW5zdHJ1Y3Rpb25zXCI6W1wiTWFrZSBzdXJlIHlvdSBoYXZlIGEgPGEgdGFyZ2V0PVxcXCJfYmxhbmtcXFwiIGhyZWY9XFxcImh0dHBzOi8vdnIuZ29vZ2xlLmNvbS9jYXJkYm9hcmQvZ2V0LWNhcmRib2FyZC9cXFwiPkdvb2dsZSBDYXJkYm9hcmQgaGVhZHNldDwvYT4uIChPbmUgd2l0aCBhIHRyaWdnZXIhKVwiLFwiSW5zdGFsbCA8YSB0YXJnZXQ9XFxcIl9ibGFua1xcXCIgaHJlZj1cXFwiaHR0cHM6Ly9wbGF5Lmdvb2dsZS5jb20vc3RvcmUvYXBwcy9kZXRhaWxzP2lkPXBob3Rvcy5zdGVyZW9ncmFwaGljLmNhcmRib2FyZFxcXCI+TG9va2luZyBHbGFzcyBWUjwvYT4gZnJvbSB0aGUgR29vZ2xlIFBsYXkgU3RvcmUuXCIsXCJUdXJuIG9uIHlvdXIgV2lGaSAmIGxhdW5jaCB0aGUgYXBwbGljYXRpb24uXCIsXCJDbGljayB5b3VyIHRyaWdnZXIgb24gdGhlIHN0ZXJlb3Njb3BlIHRvIGdldCBzdGFydGVkLlwiXSxcImV4dHJhXCI6XCJJZiB5b3VyIENhcmRib2FyZCBkZXZpY2UgZG9lcyBub3QgaGF2ZSBhIHRyaWdnZXIsIHlvdSBjYW4gdXNlIGEgPGEgdGFyZ2V0PVxcXCJfYmxhbmtcXFwiIGhyZWY9XFxcImh0dHBzOi8vd3d3LmFtYXpvbi5jb20vU3RlZWxTZXJpZXMtU3RyYXR1cy1CbHVldG9vdGgtV2lyZWxlc3MtQ29udHJvbGxlci9kcC9CMDE1V0tZM0lNL3JlZj1zcl8xXzFcXFwiPmJsdWV0b290aCBjb250cm9sbGVyPC9hPiB0byBpbnRlcmFjdCB3aXRoIHRoZSBhcHBsaWNhdGlvbi5cIn0sXCJpbnRyb1wiOntcImZpcnN0XCI6XCJXXCIsXCJjb3B5XCI6XCJlbGNvbWUgdG8gTG9va2luZyBHbGFzcyBWUi4gTG9va2luZyBHbGFzcyBWUiBpcyBhIG1vYmlsZSBhcHBsaWNhdGlvbiBmb3IgPGEgdGFyZ2V0PVxcXCJfYmxhbmtcXFwiIGhyZWY9XFxcImh0dHBzOi8vdnIuZ29vZ2xlLmNvbS9jYXJkYm9hcmQvXFxcIj5Hb29nbGUgQ2FyZGJvYXJkPC9hPiB3aGljaCBicmluZ3MgaGlzdG9yaWMgc3RlcmVvZ3JhcGhpYyAzRCBwaG90b3MgZnJvbSB5ZXN0ZXJ5ZWFyIGludG8gZm9jdXMuIFlvdSBjYW4gZmluZCA8YSB0YXJnZXQ9XFxcIl9ibGFua1xcXCIgaHJlZj1cXFwiaHR0cHM6Ly9wbGF5Lmdvb2dsZS5jb20vc3RvcmUvYXBwcy9kZXRhaWxzP2lkPXBob3Rvcy5zdGVyZW9ncmFwaGljLmNhcmRib2FyZFxcXCI+TG9va2luZyBHbGFzcyBWUiBpbiB0aGUgR29vZ2xlIFBsYXkgU3RvcmU8L2E+LCBidXQgdG8gZ2V0IHRoZSAzRCBlZmZlY3QgIHlvdSB3aWxsIG5lZWQgdG8gPGEgdGFyZ2V0PVxcXCJfYmxhbmtcXFwiIGhyZWY9XFxcImh0dHBzOi8vdnIuZ29vZ2xlLmNvbS9jYXJkYm9hcmQvZ2V0LWNhcmRib2FyZC9cXFwiPmdldCBhIEdvb2dsZSBDYXJkYm9hcmQgVlIgZGV2aWNlPC9hPi4gKEJlIHN1cmUgdG8gZ2V0IG9uZSB3aXRoIGEgdHJpZ2dlciEpXCJ9fX07IiwiXG5EZWxheSA9XG4gIHRvcDogMjAwXG4gIHdpbjogZmFsc2VcbiAgc3R1Y2s6IGZhbHNlXG5cbiAgaTogLT5cblxuICAgIEB3aW4gPSAkIHdpbmRvd1xuICAgICQod2luZG93KS5zY3JvbGwgQGNoZWNrU2Nyb2xsXG5cbiAgY2hlY2tTY3JvbGw6IC0+XG5cbiAgICBzdCA9IERlbGF5Lndpbi5zY3JvbGxUb3AoKVxuXG4gICAgaWYgc3QgPiBEZWxheS50b3AgYW5kIERlbGF5LnN0dWNrIGlzIGZhbHNlXG4gICAgICAkKCdoZWFkZXIgPiAuaW5uZXIgPiAubWVudScpLmFkZENsYXNzKCdzdHVjaycpLnJlbW92ZUNsYXNzICd1bnN0dWNrJ1xuICAgICAgXy5vbiAnaGVhZGVyID4gLmlubmVyID4gLm1lbnUgPiAub3V0ZXIgPiAuaW5uZXIgPiAubGVmdCA+IC5sZydcbiAgICAgIF8ub2ZmICdoZWFkZXIgPiAuaW5uZXIgPiAubWVudSA+IC5vdXRlciA+IC5pbm5lciA+IC5sZWZ0ID4gLmxvYydcbiAgICAgIERlbGF5LnN0dWNrID0gdHJ1ZVxuXG4gICAgaWYgc3QgPCBEZWxheS50b3AgYW5kIERlbGF5LnN0dWNrIGlzIHRydWVcbiAgICAgICQoJ2hlYWRlciA+IC5pbm5lciA+IC5tZW51JykuYWRkQ2xhc3MoJ3Vuc3R1Y2snKS5yZW1vdmVDbGFzcyAnc3R1Y2snXG4gICAgICBfLm9mZiAnaGVhZGVyID4gLmlubmVyID4gLm1lbnUgPiAub3V0ZXIgPiAuaW5uZXIgPiAubGVmdCA+IC5sZydcbiAgICAgIF8ub24gJ2hlYWRlciA+IC5pbm5lciA+IC5tZW51ID4gLm91dGVyID4gLmlubmVyID4gLmxlZnQgPiAubG9jJ1xuICAgICAgRGVsYXkuc3R1Y2sgPSBmYWxzZVxuXG4iLCJJbmRleCA9XG4gIG9mZnNldDogLTYwXG5cbiAgaTogLT5cbiAgICBjb25zb2xlLmxvZyAnSW5kZXguaSgpJ1xuICAgIERlbGF5LmkoKVxuICAgIEBoYW5kbGVycygpXG5cbiAgaGFuZGxlcnM6IC0+XG4gICAgJCgnaGVhZGVyID4gLmlubmVyID4gLm1lbnUgPiAub3V0ZXIgPiAuaW5uZXIgPiAuaXRlbScpLmNsaWNrIEBtZW51SGFuZGxlclxuICAgICQoJ2hlYWRlciA+IC5pbm5lciA+IC5tZW51ID4gLm91dGVyID4gLmlubmVyID4gLmxlZnQgPiAubGcnKS5jbGljayBAbWVudUhhbmRsZXJcblxuICBtZW51SGFuZGxlcjogLT5cbiAgICBJbmRleC5zZWN0aW9uICQodGhpcykuZGF0YSAnaXRlbSdcbiAgICByZXR1cm4gZmFsc2VcblxuICBzZWN0aW9uOiAoc2VjdGlvbikgLT5cbiAgICBzZXRUaW1lb3V0IC0+XG4gICAgICAkKCdodG1sLCBib2R5Jykuc2Nyb2xsVG8gXCIjI3tzZWN0aW9ufVwiLFxuICAgICAgICBkdXJhdGlvbjogNTAwXG4gICAgICAgIG9mZnNldDogSW5kZXgub2Zmc2V0XG4gICAgICBsb2NhdGlvbi5oYXNoID0gc2VjdGlvblxuICAgICwgMTAwXG5cblxuIl19
