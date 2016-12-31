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
      "copy": "he stereo-photos you see in Looking Glass VR are selected excerpts from the <a target=\"_blank\" href=\"https://en.wikipedia.org/wiki/Keystone_View_Company\">Keystone View Company</a>’s <a target=\"_blank\" href=\"http://www.lib.utexas.edu/taro/utcah/02182/cah-02182.html\">‘Tour of the World’</a>, a tiny glimpse of Keystone’s internationally themed stereo photography collection. From 1892 to 1933, over 300,000 such cards were produced. However, in 1978, the company's records and inventory of negatives were eventually donated to the <a target=\"_blank\" href=\"http://artsblock.ucr.edu/Page/california-museum-of-photography\">UCR/California Museum of Photography at the University of California Riverside</a>, where they are now known as the <a target=\"_blank\" href=\"http://www.oac.cdlib.org/findaid/ark:/13030/ft1q2n999m/\">Keystone-Mast collection</a>."
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
      "copy2": "ven amongst virtual reality enthusiasts, most people don’t realize that the first 3D viewer was developed in 1838 by <a target=\"_blank\" href=\"http://www.stereoscopy.com/faq/wheatstone.html\">Charles Wheatstone</a> - almost 180 years ago! Since before the popularization of television, radio, cinema, or virtual reality, people have been exploring the world through immersive stereo 3D images! Since the invention of the stereoscope, up through the mid 20th century, hundreds and hundreds of thousands of stereographic photos cards were produced and distributed all over the world. Now almost forgotten, the advent of mobile VR makes it possible to view them again, as they were intended!"
    },
    "howto": {
      "title": "how to use looking glass vr",
      "instructions": ["Make sure you have a <a target=\"_blank\" href=\"https://vr.google.com/cardboard/get-cardboard/\">Google Cardboard headset</a>. (One with a trigger!)", "Install <a target=\"_blank\" href=\"https://play.google.com/store/apps/details?id=photos.stereographic.cardboard\">Looking Glass VR</a> from the Google Play Store.", "Turn on your WiFi & launch the application!", "Click your trigger on the stereoscope to get started!"],
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIjI1Ni5jb2ZmZWUiLCJjb25maWcuY29mZmVlIiwiZGVsYXkuY29mZmVlIiwiaW5kZXguY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUEsQ0FBQTtFQUFBOzs7QUFBQSxDQUFBLEdBRUU7RUFBQSxDQUFBLEVBQUcsU0FBQTtXQUNELElBQUMsQ0FBQSxPQUFELEdBQVcsV0FBQSxDQUFZLElBQUMsQ0FBQSxNQUFNLENBQUMsSUFBUixDQUFhLElBQWIsQ0FBWixFQUE2QixHQUE3QjtFQURWLENBQUg7RUFHQSxDQUFBLEVBQ0U7SUFBQSxNQUFBLEVBQVEsS0FBUjtJQUNBLE9BQUEsRUFBUyxDQURUO0dBSkY7RUFPQSxJQUFBLEVBQU0sU0FBQyxFQUFELEVBQUssTUFBTCxFQUFtQixHQUFuQjs7TUFBSyxTQUFPOzs7TUFBTyxNQUFJOztJQUUzQixJQUFHLENBQUEsQ0FBQSxFQUFBLFlBQWtCLE1BQWxCLENBQUg7TUFDRSxFQUFBLEdBQUssQ0FBQSxDQUFFLEVBQUYsRUFEUDs7SUFHQSxJQUFHLE1BQUEsS0FBWSxLQUFmO01BQ0UsRUFBRSxDQUFDLFdBQUgsQ0FBZSxNQUFmLEVBREY7O0lBR0EsSUFBRyxHQUFBLEtBQVMsS0FBWjtNQUNFLEVBQUUsQ0FBQyxRQUFILENBQVksR0FBWixFQURGOztBQUdBLFdBQU87RUFYSCxDQVBOO0VBb0JBLEdBQUEsRUFBSyxTQUFDLEVBQUQsRUFBSyxDQUFMOztNQUFLLElBQUU7O0lBRVYsSUFBRyxDQUFDLENBQUMsTUFBRixJQUFhLENBQUMsQ0FBQyxPQUFGLEdBQVksQ0FBNUI7TUFFRSxJQUFDLENBQUEsSUFBRCxDQUFNLEVBQU4sRUFBVSxLQUFWLEVBQWlCLFFBQWpCO01BQ0EsVUFBQSxDQUFXLENBQUEsU0FBQSxLQUFBO2VBQUEsU0FBQTtVQUNULEtBQUMsQ0FBQSxJQUFELENBQU0sRUFBTixFQUFVLFFBQVYsRUFBb0IsS0FBcEI7aUJBQ0EsS0FBQyxDQUFBLElBQUQsQ0FBTSxFQUFOLEVBQVUsSUFB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QSxXQUFPO0VBRkksQ0FYYjtFQWVBLE9BQUEsRUFBUyxTQUFDLE9BQUQ7V0FDUCxVQUFBLENBQVcsU0FBQTtNQUNULENBQUEsQ0FBRSxZQUFGLENBQWUsQ0FBQyxRQUFoQixDQUF5QixHQUFBLEdBQUksT0FBN0IsRUFDRTtRQUFBLFFBQUEsRUFBVSxHQUFWO1FBQ0EsTUFBQSxFQUFRLEtBQUssQ0FBQyxNQURkO09BREY7YUFHQSxRQUFRLENBQUMsSUFBVCxHQUFnQjtJQUpQLENBQVgsRUFLRSxHQUxGO0VBRE8sQ0FmVCIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJfID1cblxuICBpOiAtPlxuICAgIEBjb25zb2xlID0gc2V0SW50ZXJ2YWwoQGRldGVjdC5iaW5kKEApLCAyMDApXG5cbiAgcDpcbiAgICBvZmZpbmc6IGZhbHNlXG4gICAgb2ZmdGltZTogMFxuXG4gIHR1cm46IChlbCwgcmVtb3ZlPWZhbHNlLCBhZGQ9ZmFsc2UpIC0+XG5cbiAgICBpZiBlbCBub3QgaW5zdGFuY2VvZiBqUXVlcnlcbiAgICAgIGVsID0gJChlbClcblxuICAgIGlmIHJlbW92ZSBpc250IGZhbHNlXG4gICAgICBlbC5yZW1vdmVDbGFzcyhyZW1vdmUpXG5cbiAgICBpZiBhZGQgaXNudCBmYWxzZVxuICAgICAgZWwuYWRkQ2xhc3MoYWRkKVxuXG4gICAgcmV0dXJuIHRydWVcblxuICBvZmY6IChlbCwgcD17fSkgLT5cblxuICAgIGlmIHAub2ZmaW5nIGFuZCBwLm9mZnRpbWUgPiAwXG5cbiAgICAgIEB0dXJuIGVsLCBmYWxzZSwgJ29mZmluZydcbiAgICAgIHNldFRpbWVvdXQgPT5cbiAgICAgICAgQHR1cm4gZWwsICdvZmZpbmcnLCBmYWxzZVxuICAgICAgICBAdHVybiBlbCwgJ29uJywgJ29mZidcbiAgICAgICwgcC5vZmZ0aW1lKjEwMDAgKyAxMDBcblxuICAgIGVsc2VcbiAgICAgIEB0dXJuIGVsLCAnb24nLCAnb2ZmJ1xuXG4gICAgcmV0dXJuXG5cbiAgb246IChlbCwgcCkgLT5cbiAgICBAdHVybiBlbCwgJ29mZicsICdvbidcblxuICBzd2FwOiAoZWwsIHApIC0+XG5cbiAgICBpZiBlbCBub3QgaW5zdGFuY2VvZiBqUXVlcnlcbiAgICAgIGVsID0gJChlbClcblxuICAgIGlmIGVsLmhhc0NsYXNzICdvZmYnXG4gICAgICBAb24gZWwsIHBcbiAgICBlbHNlXG4gICAgICBAb2ZmIGVsLCBwXG5cbiAgICByZXR1cm5cblxuICBlbmNvZGU6IChzdHIpIC0+XG4gICAgcmV0dXJuIGVuY29kZVVSSUNvbXBvbmVudChzdHIpXG4gICAgICAucmVwbGFjZSgvIS9nLCAnJTIxJylcbiAgICAgIC5yZXBsYWNlKC8nL2csICclMjcnKVxuICAgICAgLnJlcGxhY2UoL1xcKC9nLCAnJTI4JylcbiAgICAgIC5yZXBsYWNlKC9cXCkvZywgJyUyOScpXG4gICAgICAucmVwbGFjZSgvXFwqL2csICclMkEnKVxuICAgICAgLnJlcGxhY2UoLyUyMC9nLCAnKycpXG5cbiAgdDogKGNhdGVnb3J5LCBhY3Rpb24sIGxhYmVsLCB2YWx1ZSkgLT5cbiAgICBfZ2FxLnB1c2ggWydfdHJhY2tFdmVudCcsIGNhdGVnb3J5LCBhY3Rpb24sIGxhYmVsLCB2YWx1ZV1cblxuICByYW5kOiAobWluLCBtYXgpIC0+XG4gICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIG1heCkgKyBtaW5cblxuICBmaXQ6IChzcmNXaWR0aCwgc3JjSGVpZ2h0LCBtYXhXaWR0aCwgbWF4SGVpZ2h0KSAtPlxuICAgIHJhdGlvID0gTWF0aC5taW4obWF4V2lkdGggLyBzcmNXaWR0aCwgbWF4SGVpZ2h0IC8gc3JjSGVpZ2h0KVxuICAgIHdpZHRoOiBzcmNXaWR0aCpyYXRpbywgaGVpZ2h0OiBzcmNIZWlnaHQqcmF0aW9cblxuICBoZXgycmdiOiAoaGV4KSAtPlxuICAgIHJlc3VsdCA9IC9eIz8oW2EtZlxcZF17Mn0pKFthLWZcXGRdezJ9KShbYS1mXFxkXXsyfSkkL2kuZXhlYyhoZXgpXG4gICAgcjogcGFyc2VJbnQocmVzdWx0WzFdLCAxNiksXG4gICAgZzogcGFyc2VJbnQocmVzdWx0WzJdLCAxNiksXG4gICAgYjogcGFyc2VJbnQocmVzdWx0WzNdLCAxNilcbiBcbiAgb2JqYzogKG9iaikgLT5cbiAgICAoayBmb3Igb3duIGsgb2Ygb2JqKS5sZW5ndGhcblxuICBsb2FkOiAoc2NyaXB0LCBpbml0aWF0ZSwgY29tcGxldGUpIC0+XG5cbiAgICBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQgJ3NjcmlwdCdcbiAgICBlbC50eXBlID0gJ3RleHQvamF2YXNjcmlwdCdcbiAgICBlbC5zcmMgPSBzY3JpcHRcbiAgICBlbC5hZGRFdmVudExpc3RlbmVyICdsb2FkJyAsIChlKSAtPlxuICAgICAgY29tcGxldGUoKSBpZiB0eXBlb2YgY29tcGxldGUgaXMgJ2Z1bmN0aW9uJ1xuICAgICAgd2luZG93W2luaXRpYXRlXS5pKCkgaWYgaW5pdGlhdGUgaXNudCB1bmRlZmluZWQgYW5kIGluaXRpYXRlIGlzbnQgZmFsc2VcbiAgICAsIGZhbHNlXG5cbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGVsKVxuXG4gIGppbml0OiAtPlxuICAgICQuYWpheFNldHVwXG4gICAgICBkYXRhVHlwZTogXCJqc29uXCJcblxuICBwYXRjaDogKHVybCwgZGF0YSkgLT5cblxuICAgIEBqaW5pdCgpXG5cbiAgICBqcGF0Y2ggPSAkLmFqYXhcbiAgICAgIHVybDogdXJsXG4gICAgICBkYXRhOiBkYXRhXG4gICAgICB0eXBlOiAnUEFUQ0gnXG5cbiAgICBqcGF0Y2guZmFpbCAocmVzcG9uc2UpIC0+XG4gICAgICBAZmFpbChyZXNwb25zZSlcblxuICAgIHJldHVybiBqcGF0Y2hcblxuICBnZXQ6IChhcmdzLi4uKSAtPlxuXG4gICAgQGppbml0KClcblxuICAgIGpnZXQgPSAkLmdldCBhcmdzLi4uXG5cbiAgICBqZ2V0LmZhaWwgKHJlc3BvbnNlKSA9PlxuICAgICAgQGZhaWwocmVzcG9uc2UpXG4gICAgICBqZ2V0LmZhaWwocmVzcG9uc2UpXG5cbiAgICByZXR1cm4gamdldFxuXG4gIHBvc3Q6IChhcmdzLi4uKSAtPlxuXG4gICAganBvc3QgPSAkLnBvc3QgYXJncy4uLlxuXG4gICAganBvc3QuZmFpbCAocmVzcG9uc2UpID0+XG4gICAgICBAZmFpbChyZXNwb25zZSlcbiAgICAgIGpwb3N0LmZhaWwocmVzcG9uc2UpXG5cbiAgICByZXR1cm4ganBvc3RcblxuICBmYWlsOiAocmVzcG9uc2UpIC0+XG5cbiAgICBlcnJvciA9IHJlc3BvbnNlLnJlc3BvbnNlSlNPTj8uZXJyb3JzP1swXVxuICAgIGlmIGVycm9yIGlzIHVuZGVmaW5lZFxuICAgICAgcmV0dXJuIFByb21wdC5pIHJlc3BvbnNlLnN0YXR1cywgcmVzcG9uc2Uuc3RhdHVzVGV4dFxuXG4gICAgcHVnID0gZXJyb3IubWVzc2FnZS5tYXRjaCAvUHVnIEVycm9yOiAoLio/KTooWzAtOV0rKS9cbiAgICBpZiBwdWcgaXNudCBudWxsXG4gICAgICBlcnJvci5tZXNzYWdlID0gZXJyb3IubWVzc2FnZS5yZXBsYWNlIC9QdWcgRXJyb3I6ICguKj8pOihbMC05XSspLywgJydcbiAgICAgIGVycm9yLmZpbGUgPSBwdWdbMV1cbiAgICAgIGVycm9yLmxpbmUgPSBwdWdbMl1cblxuICAgIGZpbGUgPSBAZW5jb2RlIFwiI3tlcnJvci5maWxlfVwiXG5cbiAgICBzd2l0Y2ggY29uZmlnLmFwcC5lZGl0b3JcbiAgICAgIHdoZW4gJ21hY3ZpbScgdGhlbiBlZGl0b3IgPSAnbXZpbTovL29wZW4/dXJsPWZpbGU6Ly8nXG4gICAgICB3aGVuICdzdWJsaW1lJyB0aGVuIGVkaXRvciA9ICdzdWJsOi8vb3Blbj91cmw9ZmlsZTovLydcbiAgICAgIHdoZW4gJ2VtYWNzJyB0aGVuIGVkaXRvciA9ICdlbWFjczovL29wZW4/dXJsPWZpbGU6Ly8nXG4gICAgICB3aGVuICd0ZXh0bWF0ZScgdGhlbiBlZGl0b3IgPSAndGV4dG1hdGU6Ly9vcGVuLz91cmw9ZmlsZTovLydcbiAgICAgIHdoZW4gJ3BocHN0b3JtJyB0aGVuIGVkaXRvciA9ICdwaHBzdG9ybTovL29wZW4/ZmlsZT0nXG5cbiAgICBpZiBlcnJvci5maWxlIGlzbnQgbnVsbFxuICAgICAgYm9keSA9IFwiXCJcIlxuICAgICAgICA8cHJlPiN7ZXJyb3IubWVzc2FnZX08L3ByZT5cbiAgICAgICAgPGEgaHJlZj1cIiN7ZWRpdG9yfSN7ZmlsZX0mbGluZT0je2Vycm9yLmxpbmV9XCI+PGI+I3tlcnJvci5maWxlfToje2Vycm9yLmxpbmV9PC9iPjwvYT5cbiAgICAgIFwiXCJcIlxuICAgIGVsc2VcbiAgICAgIGJvZHkgPSBlcnJvci5tZXNzYWdlXG5cbiAgICBQcm9tcHQuaSBlcnJvci50eXBlLCBib2R5LCBbJ09LJ11cblxuICBtZXRob2RzOiAob2JqKSAtPlxuICAgIHJlcyA9IFtdXG4gICAgZm9yIGksbSBvZiBvYmpcbiAgICAgIGlmIHR5cGVvZiBtIGlzICdmdW5jdGlvbidcbiAgICAgICAgcmVzLnB1c2ggbVxuICAgIHJldHVybiByZXNcblxuICBsbGM6IC0+XG4gICAgYXNjaWkgPSBcIlwiXCJcblxuICAgICAgJWNtbW0vLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi9tbW1cbiAgICAgIG1tby4uLi4uLi4uLi4uLi4uLi4tOjovLzo6LS4uLi4uLi4tOjo6Ojo6Ojo6Ojo6Oi0uLi4uLi4uLi06Oi8vLzotLm9tbVxuICAgICAgbWQtLi4uLi4uLi4uLi4uLjoreWhkZGRkZGRoeSstLi4uLi9kZGRkZGRkZGRkZGRkKy4uLi4uLi9zaGRkZGRkZGR5b2RtXG4gICAgICBtby4uLi4uLi4uLi4uLi4taG1tbWh5eXl5ZG1tbWg6Li4uL21tbW1oaGhoaGhoaGgrLi4uLjp5ZG1tZGh5eXloZGRvb21cbiAgICAgIG0tLi4uLi4uLi4uLi4uLi4tc3M6LS4uLi4teW1tbXkuLi4vbW1tbS0tLS0tLS0tLS4uLi46ZG1tbXM6LS4uLi06Ly4tbVxuICAgICAgZC4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi55bW1teS4uLi9tbW1tLS8rb29vKzotLi4uLnltbW15LTorb29vKy8tLi5kXG4gICAgICBoLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi46c21tbWQ6Li4uL21tbW1obW1tbW1tZGgrLi4uZG1tbXNoZG1tbW1tbWhzLWhcbiAgICAgIGguLi4uLi4uLi4uLi4uLi4uLi4uLi46c2RtbWR5Oi4uLi46aGhkaG8rLy8reW1tbW0rLi5kbW1tZHlvLy8rc2RtbW1oaFxuICAgICAgZC4uLi4uLi4uLi4uLi4uLi4uLi0reWRtbWR5Ly4uLi4uLi4tLTouLi4uLi4uc21tbWguLnltbW1zLi4uLi4uOm1tbW1tXG4gICAgICBtLS4uLi4uLi4uLi4uLi4uLTpzaG1tbWRzLy0tLS0tLi4uLjpzLy0tLi4uLTpobW1tcy4uOmRtbWQvLS4uLi1vbW1tbW1cbiAgICAgIG1vLi4uLi4uLi4uLi4uLi5obW1tbW1taGhoaGhoaGguLi4rZG1tZGh5eXloZG1tbXktLi4uL2htbW1oeXl5aG1tbWRobVxuICAgICAgbWQtLi4uLi4uLi4uLi4uLmRkZGRkZGRkZGRkZGRkZC4uLi0rc2hkZGRkZGRkaHkvLS4uLi4uLW95ZGRkZGRkZGhvOmRtXG4gICAgICBtbW8uLi4uLi4uLi4uLi4uOjo6Ojo6Ojo6Ojo6Ojo6Li4uLi4uLi06Ly8vOjotLi4uLi4uLi4uLi4tOi8vLzotLi5vbW1cbiAgICAgIG1tbS8uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uL21tbVxuXG4gICAgICA6OiBzeW50YWN0aWMgc3VnYXIgYnkgMjU2XG4gICAgICA6OiBodHRwOi8vMjU2LmlvL1xuICAgICAgOjogI3tjb25maWcubWV0YS5yZXBvfVxuICAgIFwiXCJcIlxuICAgIGNvbnNvbGUubG9nIGFzY2lpLCBcImNvbG9yOiBncmV5OyBmb250LWZhbWlseTogTWVubG8sIG1vbm9zcGFjZTtcIlxuXG4gIGRldGVjdDogLT5cbiAgICBpZiAoKCh3aW5kb3cub3V0ZXJIZWlnaHQgLSB3aW5kb3cuaW5uZXJIZWlnaHQpID4gMTAwKSB8fCAoKHdpbmRvdy5vdXRlcldpZHRoIC0gd2luZG93LmlubmVyV2lkdGgpID4gMTAwKSlcbiAgICAgIEBsbGMoKVxuICAgICAgY2xlYXJJbnRlcnZhbCBAY29uc29sZVxuXG5fLmkoKVxuIiwiY29uZmlnID0ge1wiY29sb3JcIjp7XCJ3aGl0ZTFcIjpcIiNmZmZmZmZcIixcImJsYWNrMVwiOlwiIzAwMDAwMFwiLFwiYmxhY2syXCI6XCIjMTkxOTE5XCIsXCJicm93bjFcIjpcIiNDMjlFNkVcIixcImJyb3duMlwiOlwiI0FBODA1MlwiLFwiYnJvd24zXCI6XCIjODc2MDM3XCIsXCJiZWlnZTFcIjpcIiNDN0JBQTJcIixcImJlaWdlMlwiOlwiI0U1RTNEQlwifSxcImZvbnRcIjp7XCJoMVwiOntcImZvbnQtZmFtaWx5XCI6XCJvY3RhdmlhbiByZWd1bGFyXCIsXCJmb250LXNpemVcIjpcIjIycHhcIn0sXCJoMlwiOntcImZvbnQtZmFtaWx5XCI6XCJzZXJpYWwgcmVndWxhclwiLFwiZm9udC1zaXplXCI6XCI1NXB4XCJ9LFwiY29weTFcIjp7XCJmb250LWZhbWlseVwiOlwiaW5kZXBlbmRlbmNlIHJlZ3VsYXJcIixcImZvbnQtc2l6ZVwiOlwiMjlweFwifSxcImNvcHkyXCI6e1wiZm9udC1mYW1pbHlcIjpcIkdhcmFtb25kXCIsXCJmb250LXNpemVcIjpcIjExNnB4XCJ9fSxcIm1ldGFcIjp7XCJ1cmxcIjpcImh0dHA6Ly9zdGFnaW5nLmxvb2tpbmdnbGFzcy5jb20vXCIsXCJ0aXRsZVwiOlwiTG9va2luZyBHbGFzcyBWUlwiLFwiZGVzY3JpcHRpb25cIjpcIldpbmRvd3MgdG8gdGhlIHBhc3QgYXJlIG9wZW4gYXQgbGFzdFwiLFwia2V5d29yZHNcIjpcIlZSLCBWUiBhcHAsIGxvb2tpbmcgZ2xhc3NcIixcInRyYWNraW5nX2lkXCI6XCJVQS04OTMwMDgyMi0xXCIsXCJzaGFyZVwiOlwiaW1hZ2VzL3NoYXJlLmpwZ1wiLFwicmVwb1wiOlwiaHR0cHM6Ly9naXRodWIuY29tL2xvb2tpbmdnbGFzc3ZyL2xvb2tpbmdnbGFzc1wiLFwic29jaWFsXCI6e1wiZmFjZWJvb2tcIjpcImh0dHBzOi8vd3d3LmZhY2Vib29rLmNvbS9Mb29raW5nLUdsYXNzLVZSLTE3ODI5NDI1OTI4NDI5Ni9cIixcInR3aXR0ZXJcIjpcImh0dHBzOi8vdHdpdHRlci5jb20vc3RlcmVvdmlld3NcIn19LFwiY29weVwiOntcImNvbGxlY3Rpb25cIjp7XCJ0aXRsZVwiOlwidGhlIGNvbGxlY3Rpb25cIixcImZpcnN0XCI6XCJUXCIsXCJjb3B5XCI6XCJoZSBzdGVyZW8tcGhvdG9zIHlvdSBzZWUgaW4gTG9va2luZyBHbGFzcyBWUiBhcmUgc2VsZWN0ZWQgZXhjZXJwdHMgZnJvbSB0aGUgPGEgdGFyZ2V0PVxcXCJfYmxhbmtcXFwiIGhyZWY9XFxcImh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0tleXN0b25lX1ZpZXdfQ29tcGFueVxcXCI+S2V5c3RvbmUgVmlldyBDb21wYW55PC9hPuKAmXMgPGEgdGFyZ2V0PVxcXCJfYmxhbmtcXFwiIGhyZWY9XFxcImh0dHA6Ly93d3cubGliLnV0ZXhhcy5lZHUvdGFyby91dGNhaC8wMjE4Mi9jYWgtMDIxODIuaHRtbFxcXCI+4oCYVG91ciBvZiB0aGUgV29ybGTigJk8L2E+LCBhIHRpbnkgZ2xpbXBzZSBvZiBLZXlzdG9uZeKAmXMgaW50ZXJuYXRpb25hbGx5IHRoZW1lZCBzdGVyZW8gcGhvdG9ncmFwaHkgY29sbGVjdGlvbi4gRnJvbSAxODkyIHRvIDE5MzMsIG92ZXIgMzAwLDAwMCBzdWNoIGNhcmRzIHdlcmUgcHJvZHVjZWQuIEhvd2V2ZXIsIGluIDE5NzgsIHRoZSBjb21wYW55J3MgcmVjb3JkcyBhbmQgaW52ZW50b3J5IG9mIG5lZ2F0aXZlcyB3ZXJlIGV2ZW50dWFsbHkgZG9uYXRlZCB0byB0aGUgPGEgdGFyZ2V0PVxcXCJfYmxhbmtcXFwiIGhyZWY9XFxcImh0dHA6Ly9hcnRzYmxvY2sudWNyLmVkdS9QYWdlL2NhbGlmb3JuaWEtbXVzZXVtLW9mLXBob3RvZ3JhcGh5XFxcIj5VQ1IvQ2FsaWZvcm5pYSBNdXNldW0gb2YgUGhvdG9ncmFwaHkgYXQgdGhlIFVuaXZlcnNpdHkgb2YgQ2FsaWZvcm5pYSBSaXZlcnNpZGU8L2E+LCB3aGVyZSB0aGV5IGFyZSBub3cga25vd24gYXMgdGhlIDxhIHRhcmdldD1cXFwiX2JsYW5rXFxcIiBocmVmPVxcXCJodHRwOi8vd3d3Lm9hYy5jZGxpYi5vcmcvZmluZGFpZC9hcms6LzEzMDMwL2Z0MXEybjk5OW0vXFxcIj5LZXlzdG9uZS1NYXN0IGNvbGxlY3Rpb248L2E+LlwifSxcImNyZWRpdHNcIjp7XCJ0aXRsZVwiOlwiY3JlZGl0cyBhbmQgdGhhbmtzXCIsXCJmaXJzdFwiOlwiQVwiLFwiY29weVwiOlwiZGRpdGlvbmFsIGhhbmQgbGV0dGVyaW5nIGJ5IDxhIHRhcmdldD1cXFwiX2JsYW5rXFxcIiBocmVmPVxcXCJodHRwOi8vd3d3LnRvYmlhc3NhdWwuZGUvXFxcIj5Ub2JpYXMgU2F1bDwvYT4gYW5kIGlsbHVzdHJhdGlvbiBieSA8YSB0YXJnZXQ9XFxcIl9ibGFua1xcXCIgaHJlZj1cXFwiaHR0cDovL3d3dy53ZWVtc2lsbHVzdHJhdGlvbi5jb20vXFxcIj5NYXR0IFdlZW1zPC9hPi4gTGlnaHRpbmcgb3B0aW1pemF0aW9uIGJ5IDxhIHRhcmdldD1cXFwiX2JsYW5rXFxcIiBocmVmPVxcXCJodHRwOi8vbWFkZW9mdmVydGljZXMuY29tL1xcXCI+Qm9yaXMgQmxvc3NlPC9hPi4gV2ViIGRlc2lnbiBieSA8YSB0YXJnZXQ9XFxcIl9ibGFua1xcXCIgaHJlZj1cXFwiaHR0cDovL3d3dy5tYWhlcnNpbmphcnkuY29tL1xcXCI+TWFoZXIgU2luamFyeTwvYT4uIFdlYnNpdGUgYnkgPGEgdGFyZ2V0PVxcXCJfYmxhbmtcXFwiIGhyZWY9XFxcImh0dHA6Ly8yNTYuaW8vXFxcIj5LZXZpbiBPbHNvbjwvYT4uIFByb3RvdHlwZWQgd2l0aCB0aGUgaGVscCBvZiA8YSB0YXJnZXQ9XFxcIl9ibGFua1xcXCIgaHJlZj1cXFwiaHR0cDovL3N1emFuaW1hdG9yLmNvbS9cXFwiPlN1emFubmUgTGVpYnJpY2s8L2E+LiBTb3VuZCBlZmZlY3RzIHVzZWQgZnJvbSA8YSB0YXJnZXQ9XFxcIl9ibGFua1xcXCIgaHJlZj1cXFwiaHR0cDovL2ZyZWVzb3VuZC5vcmdcXFwiPmZyZWVzb3VuZC5vcmc8L2E+LiAoPGEgdGFyZ2V0PVxcXCJfYmxhbmtcXFwiIGhyZWY9XFxcImh0dHBzOi8vd3d3LmZyZWVzb3VuZC5vcmcvcGVvcGxlL1JvYmluaG9vZDc2L3NvdW5kcy8xMjUzMTUvXFxcIj5BPC9hPiA8YSB0YXJnZXQ9XFxcIl9ibGFua1xcXCIgaHJlZj1cXFwiaHR0cDovL2ZyZWVzb3VuZC5vcmcvcGVvcGxlL0luc3BlY3Rvckovc291bmRzLzM0MzEzMC9cXFwiPkI8L2E+IDxhIHRhcmdldD1cXFwiX2JsYW5rXFxcIiBocmVmPVxcXCJodHRwOi8vZnJlZXNvdW5kLm9yZy9wZW9wbGUvTmlnaHRWb2ljZS9zb3VuZHMvMjM0MjY4L1xcXCI+QzwvYT4gPGEgdGFyZ2V0PVxcXCJfYmxhbmtcXFwiIGhyZWY9XFxcImh0dHA6Ly9mcmVlc291bmQub3JnL3Blb3BsZS9rd2FobWFoXzAyL3NvdW5kcy8yNjQwOTYvXFxcIj5EPC9hPiA8YSB0YXJnZXQ9XFxcIl9ibGFua1xcXCIgaHJlZj1cXFwiaHR0cDovL2ZyZWVzb3VuZC5vcmcvcGVvcGxlL25zc3R1ZGlvcy9zb3VuZHMvMzIxMTE0L1xcXCI+RTwvYT4gPGEgdGFyZ2V0PVxcXCJfYmxhbmtcXFwiIGhyZWY9XFxcImh0dHA6Ly9mcmVlc291bmQub3JnL3Blb3BsZS9mNG5neS9zb3VuZHMvMjQwNzc2L1xcXCI+RjwvYT4gPGEgdGFyZ2V0PVxcXCJfYmxhbmtcXFwiIGhyZWY9XFxcImh0dHA6Ly9mcmVlc291bmQub3JnL3Blb3BsZS9NckF1cmFsaXphdGlvbi9zb3VuZHMvMTg0NTY3L1xcXCI+RzwvYT4gPGEgdGFyZ2V0PVxcXCJfYmxhbmtcXFwiIGhyZWY9XFxcImh0dHA6Ly9mcmVlc291bmQub3JnL3Blb3BsZS9TdW5ueVNpZGVTb3VuZC9zb3VuZHMvNjc3OTEvXFxcIj5IPC9hPikgV2l0aCBtdXNpYyBmcm9tIHRoZSA8YSB0YXJnZXQ9XFxcIl9ibGFua1xcXCIgaHJlZj1cXFwiaHR0cDovL29wZW5tdXNpY2FyY2hpdmUub3JnL2Jyb3dzZV90YWcucGhwP3RhZz0xOTIwc1xcXCI+T3BlbiBNdXNpYyBBcmNoaXZlPC9hPi5cIixcImF1dGhvcnNcIjp7XCJ0aXRsZVwiOlwiTG9va2luZyBHbGFzcyBWUiB3YXNcIixcImpvZWJcIjpcImNyZWF0ZWQgYnkgPGEgdGFyZ2V0PVxcXCJfYmxhbmtcXFwiIGhyZWY9XFxcImh0dHA6Ly9qb2Vib3lsZS5jb21cXFwiPkpvZSBCb3lsZTwvYT5cIixcImtldmluY1wiOlwid2l0aCAzRCBhcnQgYnkgPGEgdGFyZ2V0PVxcXCJfYmxhbmtcXFwiIGhyZWY9XFxcImh0dHA6Ly93d3cua2V2aW5jYXN0YW5lZGEuY29tL1xcXCI+S2V2aW4gQ2FzdGFuZWRhPC9hPlwifX0sXCJmb290ZXJcIjp7XCJjb3B5cmlnaHRcIjpcIkNvcHlyaWdodCAmY29weTsgMjAxNiBMb29raW5nIEdsYXNzIC0gQWxsIFJpZ2h0cyBSZXNlcnZlZFwifSxcImhpc3RvcnlcIjp7XCJ0aXRsZVwiOlwiaGlzdG9yeSBvZiBzdGVyZW9zY29weVwiLFwiY29weTFcIjpcIuKAnEl0IGlzIGEgZGVsaWdodGZ1bCBjaGFyYWN0ZXJpc3RpYyBvZiB0aGVzZSB0aW1lcywgdGhhdCBuZXcgYW5kIGNoZWFwIG1lYW5zIGFyZSBjb250aW51b3VzbHkgYmVpbmcgZGV2aXNlZCwgZm9yIGNvbnZleWluZyB0aGUgcmVzdWx0cyBvZiBhIGNhc3VhbCBleHBlcmllbmNlIHRvIHRob3NlIHdobyBhcmUgdW5hYmxlIHRvIG9idGFpbiBzdWNoIGV4cGVyaWVuY2VzIGZvciB0aGVtc2VsdmVzOyBhbmQgdG8gYnJpbmcgdGhlbSB3aXRoaW4gdGhlIHJlYWNoIG9mIHRoZSBwZW9wbGUu4oCdIOKAlENoYXJsZXMgRGlja2Vuc1wiLFwiZmlyc3RcIjpcIkVcIixcImNvcHkyXCI6XCJ2ZW4gYW1vbmdzdCB2aXJ0dWFsIHJlYWxpdHkgZW50aHVzaWFzdHMsIG1vc3QgcGVvcGxlIGRvbuKAmXQgcmVhbGl6ZSB0aGF0IHRoZSBmaXJzdCAzRCB2aWV3ZXIgd2FzIGRldmVsb3BlZCBpbiAxODM4IGJ5IDxhIHRhcmdldD1cXFwiX2JsYW5rXFxcIiBocmVmPVxcXCJodHRwOi8vd3d3LnN0ZXJlb3Njb3B5LmNvbS9mYXEvd2hlYXRzdG9uZS5odG1sXFxcIj5DaGFybGVzIFdoZWF0c3RvbmU8L2E+IC0gYWxtb3N0IDE4MCB5ZWFycyBhZ28hIFNpbmNlIGJlZm9yZSB0aGUgcG9wdWxhcml6YXRpb24gb2YgdGVsZXZpc2lvbiwgcmFkaW8sIGNpbmVtYSwgb3IgdmlydHVhbCByZWFsaXR5LCBwZW9wbGUgaGF2ZSBiZWVuIGV4cGxvcmluZyB0aGUgd29ybGQgdGhyb3VnaCBpbW1lcnNpdmUgc3RlcmVvIDNEIGltYWdlcyEgU2luY2UgdGhlIGludmVudGlvbiBvZiB0aGUgc3RlcmVvc2NvcGUsIHVwIHRocm91Z2ggdGhlIG1pZCAyMHRoIGNlbnR1cnksIGh1bmRyZWRzIGFuZCBodW5kcmVkcyBvZiB0aG91c2FuZHMgb2Ygc3RlcmVvZ3JhcGhpYyBwaG90b3MgY2FyZHMgd2VyZSBwcm9kdWNlZCBhbmQgZGlzdHJpYnV0ZWQgYWxsIG92ZXIgdGhlIHdvcmxkLiBOb3cgYWxtb3N0IGZvcmdvdHRlbiwgdGhlIGFkdmVudCBvZiBtb2JpbGUgVlIgbWFrZXMgaXQgcG9zc2libGUgdG8gdmlldyB0aGVtIGFnYWluLCBhcyB0aGV5IHdlcmUgaW50ZW5kZWQhXCJ9LFwiaG93dG9cIjp7XCJ0aXRsZVwiOlwiaG93IHRvIHVzZSBsb29raW5nIGdsYXNzIHZyXCIsXCJpbnN0cnVjdGlvbnNcIjpbXCJNYWtlIHN1cmUgeW91IGhhdmUgYSA8YSB0YXJnZXQ9XFxcIl9ibGFua1xcXCIgaHJlZj1cXFwiaHR0cHM6Ly92ci5nb29nbGUuY29tL2NhcmRib2FyZC9nZXQtY2FyZGJvYXJkL1xcXCI+R29vZ2xlIENhcmRib2FyZCBoZWFkc2V0PC9hPi4gKE9uZSB3aXRoIGEgdHJpZ2dlciEpXCIsXCJJbnN0YWxsIDxhIHRhcmdldD1cXFwiX2JsYW5rXFxcIiBocmVmPVxcXCJodHRwczovL3BsYXkuZ29vZ2xlLmNvbS9zdG9yZS9hcHBzL2RldGFpbHM/aWQ9cGhvdG9zLnN0ZXJlb2dyYXBoaWMuY2FyZGJvYXJkXFxcIj5Mb29raW5nIEdsYXNzIFZSPC9hPiBmcm9tIHRoZSBHb29nbGUgUGxheSBTdG9yZS5cIixcIlR1cm4gb24geW91ciBXaUZpICYgbGF1bmNoIHRoZSBhcHBsaWNhdGlvbiFcIixcIkNsaWNrIHlvdXIgdHJpZ2dlciBvbiB0aGUgc3RlcmVvc2NvcGUgdG8gZ2V0IHN0YXJ0ZWQhXCJdLFwiZXh0cmFcIjpcIklmIHlvdXIgQ2FyZGJvYXJkIGRldmljZSBkb2VzIG5vdCBoYXZlIGEgdHJpZ2dlciwgeW91IGNhbiB1c2UgYSA8YSB0YXJnZXQ9XFxcIl9ibGFua1xcXCIgaHJlZj1cXFwiaHR0cHM6Ly93d3cuYW1hem9uLmNvbS9TdGVlbFNlcmllcy1TdHJhdHVzLUJsdWV0b290aC1XaXJlbGVzcy1Db250cm9sbGVyL2RwL0IwMTVXS1kzSU0vcmVmPXNyXzFfMVxcXCI+Ymx1ZXRvb3RoIGNvbnRyb2xsZXI8L2E+IHRvIGludGVyYWN0IHdpdGggdGhlIGFwcGxpY2F0aW9uLlwifSxcImludHJvXCI6e1wiZmlyc3RcIjpcIldcIixcImNvcHlcIjpcImVsY29tZSB0byBMb29raW5nIEdsYXNzIFZSLiBMb29raW5nIEdsYXNzIFZSIGlzIGEgbW9iaWxlIGFwcGxpY2F0aW9uIGZvciA8YSB0YXJnZXQ9XFxcIl9ibGFua1xcXCIgaHJlZj1cXFwiaHR0cHM6Ly92ci5nb29nbGUuY29tL2NhcmRib2FyZC9cXFwiPkdvb2dsZSBDYXJkYm9hcmQ8L2E+IHdoaWNoIGJyaW5ncyBoaXN0b3JpYyBzdGVyZW9ncmFwaGljIDNEIHBob3RvcyBmcm9tIHllc3RlcnllYXIgaW50byBmb2N1cy4gWW91IGNhbiBmaW5kIDxhIHRhcmdldD1cXFwiX2JsYW5rXFxcIiBocmVmPVxcXCJodHRwczovL3BsYXkuZ29vZ2xlLmNvbS9zdG9yZS9hcHBzL2RldGFpbHM/aWQ9cGhvdG9zLnN0ZXJlb2dyYXBoaWMuY2FyZGJvYXJkXFxcIj5Mb29raW5nIEdsYXNzIFZSIGluIHRoZSBHb29nbGUgUGxheSBTdG9yZTwvYT4sIGJ1dCB0byBnZXQgdGhlIDNEIGVmZmVjdCAgeW91IHdpbGwgbmVlZCB0byA8YSB0YXJnZXQ9XFxcIl9ibGFua1xcXCIgaHJlZj1cXFwiaHR0cHM6Ly92ci5nb29nbGUuY29tL2NhcmRib2FyZC9nZXQtY2FyZGJvYXJkL1xcXCI+Z2V0IGEgR29vZ2xlIENhcmRib2FyZCBWUiBkZXZpY2U8L2E+LiAoQmUgc3VyZSB0byBnZXQgb25lIHdpdGggYSB0cmlnZ2VyISlcIn19fTsiLCJcbkRlbGF5ID1cbiAgdG9wOiAyMDBcbiAgd2luOiBmYWxzZVxuICBzdHVjazogZmFsc2VcblxuICBpOiAtPlxuXG4gICAgQHdpbiA9ICQgd2luZG93XG4gICAgJCh3aW5kb3cpLnNjcm9sbCBAY2hlY2tTY3JvbGxcblxuICBjaGVja1Njcm9sbDogLT5cblxuICAgIHN0ID0gRGVsYXkud2luLnNjcm9sbFRvcCgpXG5cbiAgICBpZiBzdCA+IERlbGF5LnRvcCBhbmQgRGVsYXkuc3R1Y2sgaXMgZmFsc2VcbiAgICAgICQoJ2hlYWRlciA+IC5pbm5lciA+IC5tZW51JykuYWRkQ2xhc3MoJ3N0dWNrJykucmVtb3ZlQ2xhc3MgJ3Vuc3R1Y2snXG4gICAgICBfLm9uICdoZWFkZXIgPiAuaW5uZXIgPiAubWVudSA+IC5vdXRlciA+IC5pbm5lciA+IC5sZWZ0ID4gLmxnJ1xuICAgICAgXy5vZmYgJ2hlYWRlciA+IC5pbm5lciA+IC5tZW51ID4gLm91dGVyID4gLmlubmVyID4gLmxlZnQgPiAubG9jJ1xuICAgICAgRGVsYXkuc3R1Y2sgPSB0cnVlXG5cbiAgICBpZiBzdCA8IERlbGF5LnRvcCBhbmQgRGVsYXkuc3R1Y2sgaXMgdHJ1ZVxuICAgICAgJCgnaGVhZGVyID4gLmlubmVyID4gLm1lbnUnKS5hZGRDbGFzcygndW5zdHVjaycpLnJlbW92ZUNsYXNzICdzdHVjaydcbiAgICAgIF8ub2ZmICdoZWFkZXIgPiAuaW5uZXIgPiAubWVudSA+IC5vdXRlciA+IC5pbm5lciA+IC5sZWZ0ID4gLmxnJ1xuICAgICAgXy5vbiAnaGVhZGVyID4gLmlubmVyID4gLm1lbnUgPiAub3V0ZXIgPiAuaW5uZXIgPiAubGVmdCA+IC5sb2MnXG4gICAgICBEZWxheS5zdHVjayA9IGZhbHNlXG5cbiIsIkluZGV4ID1cbiAgb2Zmc2V0OiAtNjBcblxuICBpOiAtPlxuICAgIGNvbnNvbGUubG9nICdJbmRleC5pKCknXG4gICAgRGVsYXkuaSgpXG4gICAgQGhhbmRsZXJzKClcblxuICBoYW5kbGVyczogLT5cbiAgICAkKCdoZWFkZXIgPiAuaW5uZXIgPiAubWVudSA+IC5vdXRlciA+IC5pbm5lciA+IC5pdGVtJykuY2xpY2sgQG1lbnVIYW5kbGVyXG4gICAgJCgnaGVhZGVyID4gLmlubmVyID4gLm1lbnUgPiAub3V0ZXIgPiAuaW5uZXIgPiAubGVmdCA+IC5sZycpLmNsaWNrIEBtZW51SGFuZGxlclxuXG4gIG1lbnVIYW5kbGVyOiAtPlxuICAgIEluZGV4LnNlY3Rpb24gJCh0aGlzKS5kYXRhICdpdGVtJ1xuICAgIHJldHVybiBmYWxzZVxuXG4gIHNlY3Rpb246IChzZWN0aW9uKSAtPlxuICAgIHNldFRpbWVvdXQgLT5cbiAgICAgICQoJ2h0bWwsIGJvZHknKS5zY3JvbGxUbyBcIiMje3NlY3Rpb259XCIsXG4gICAgICAgIGR1cmF0aW9uOiA1MDBcbiAgICAgICAgb2Zmc2V0OiBJbmRleC5vZmZzZXRcbiAgICAgIGxvY2F0aW9uLmhhc2ggPSBzZWN0aW9uXG4gICAgLCAxMDBcblxuXG4iXX0=
