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
    "url": "http://lookingglassvr.com/",
    "title": "Looking Glass VR",
    "description": "Windows to the past are open at last",
    "keywords": "VR, VR app, looking glass",
    "tracking_id": "UA-89300822-1",
    "share": "images/share.jpg",
    "repo": "https://github.com/lookingglassvr/lookingglass",
    "social": {
      "facebook": "https://www.facebook.com/Looking-Glass-VR-178294259284296/",
      "twitter": "https://twitter.com/stereoviews",
      "instagram": "https://instagram.com/lookingglassvr"
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
      "first": "H",
      "copy": "and lettering by <a target=\"_blank\" href=\"http://www.tobiassaul.de/\">Tobias Saul</a> and illustration by <a target=\"_blank\" href=\"http://www.weemsillustration.com/\">Matt Weems</a>. Web design by <a target=\"_blank\" href=\"http://www.mahersinjary.com/\">Maher Sinjary</a>. Prototyped with the help of <a target=\"_blank\" href=\"http://suzanimator.com/\">Suzanne Leibrick</a>. Sound effects used from <a target=\"_blank\" href=\"http://freesound.org\">freesound.org</a>. (<a target=\"_blank\" href=\"https://www.freesound.org/people/Robinhood76/sounds/125315/\">A</a> <a target=\"_blank\" href=\"http://freesound.org/people/InspectorJ/sounds/343130/\">B</a> <a target=\"_blank\" href=\"http://freesound.org/people/NightVoice/sounds/234268/\">C</a> <a target=\"_blank\" href=\"http://freesound.org/people/kwahmah_02/sounds/264096/\">D</a> <a target=\"_blank\" href=\"http://freesound.org/people/nsstudios/sounds/321114/\">E</a> <a target=\"_blank\" href=\"http://freesound.org/people/f4ngy/sounds/240776/\">F</a> <a target=\"_blank\" href=\"http://freesound.org/people/MrAuralization/sounds/184567/\">G</a> <a target=\"_blank\" href=\"http://freesound.org/people/SunnySideSound/sounds/67791/\">H</a>) With music from the <a target=\"_blank\" href=\"http://openmusicarchive.org/browse_tag.php?tag=1920s\">Open Music Archive</a>.",
      "authors": {
        "title": "Looking Glass VR was",
        "joeb": "created by <br /><a target=\"_blank\" href=\"http://joeboyle.com\">Joe Boyle</a>",
        "lucam": "lead programming by <br /><a target=\"_blank\" href=\"http://mefistofiles.com/\">Luca Mefisto</a>",
        "kevinc": "3D art by <br /><a target=\"_blank\" href=\"http://www.kevincastaneda.com/\">Kevin Castaneda</a>",
        "kevino": "web dev by <br /><a target=\"_blank\" href=\"https://256.io\">Kevin Olson</a>"
      }
    },
    "footer": {
      "copyright": "Copyright &copy; 2018, 2017, 2016 Looking Glass VR, LLC- All Rights Reserved"
    },
    "history": {
      "title": "history of stereoscopy",
      "copy1": "“It is a delightful characteristic of these times, that new and cheap means are continuously being devised, for conveying the results of a casual experience to those who are unable to obtain such experiences for themselves; and to bring them within the reach of the people.” —Charles Dickens",
      "first": "E",
      "copy2": "ven amongst virtual reality enthusiasts, most people don’t realize that the first 3D viewer was developed in 1838 by <a target=\"_blank\" href=\"http://www.stereoscopy.com/faq/wheatstone.html\">Charles Wheatstone</a> - almost 180 years ago! Since before the popularization of television, radio, cinema, or virtual reality, people have been exploring the world through immersive stereo 3D images. Since the invention of the stereoscope, up through the mid 20th century, hundreds of thousands of stereographic photos cards were produced and distributed all over the world. Though nearly forgotten, these photo cards can again be viewed as intended, thanks to the advent of mobile VR."
    },
    "howto": {
      "title": "how to use looking glass vr",
      "instructions": ["Make sure you have a supporting headset, either <a target=\"_blank\" href=\"http://www.samsung.com/global/galaxy/gear-vr/\">Samsung Gear VR</a> or <a target=\"_blank\" href=\"https://vr.google.com/cardboard/get-cardboard/\">Google Cardboard headset</a>. (One with a trigger!)", "Install Looking Glass VR from either <a target=\"_blank\" href=\"https://www.oculus.com/experiences/gear-vr/1107766839328808\">Oculus Home (Gear VR)</a> or <a target=\"_blank\" href=\"https://play.google.com/store/apps/details?id=photos.stereographic.cardboard\">Google Play (Cardboard)</a>.", "Turn on your WiFi & launch the application.", "Let the application download more content, or just hit start to use what you have.", "Click your trigger on the stereoscope to get started."],
      "extra": "If your Cardboard device does not have a trigger, you can use a <a target=\"_blank\" href=\"https://www.amazon.com/SteelSeries-Stratus-Bluetooth-Wireless-Controller/dp/B015WKY3IM/ref=sr_1_1\">bluetooth controller</a> to interact with the application."
    },
    "intro": {
      "first": "W",
      "copy": "elcome to Looking Glass VR!  Looking Glass VR is a mobile VR based 3D photo viewer which brings hundreds of historic 3D photos from around the world into focus. Looking Glass VR is available on <a target=\"_blank\" href=\"https://www.oculus.com/experiences/go/1107766839328808/\">Oculus Go</a> and <a target=\"_blank\" href=\"https://www.oculus.com/experiences/gear-vr/1107766839328808\">Samsung Gear VR</a>."
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIjI1Ni5jb2ZmZWUiLCJjb25maWcuY29mZmVlIiwiZGVsYXkuY29mZmVlIiwiaW5kZXguY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUEsQ0FBQTtFQUFBOzs7QUFBQSxDQUFBLEdBRUU7RUFBQSxDQUFBLEVBQUcsU0FBQTtXQUNELElBQUMsQ0FBQSxPQUFELEdBQVcsV0FBQSxDQUFZLElBQUMsQ0FBQSxNQUFNLENBQUMsSUFBUixDQUFhLElBQWIsQ0FBWixFQUE2QixHQUE3QjtFQURWLENBQUg7RUFHQSxDQUFBLEVBQ0U7SUFBQSxNQUFBLEVBQVEsS0FBUjtJQUNBLE9BQUEsRUFBUyxDQURUO0dBSkY7RUFPQSxJQUFBLEVBQU0sU0FBQyxFQUFELEVBQUssTUFBTCxFQUFtQixHQUFuQjs7TUFBSyxTQUFPOzs7TUFBTyxNQUFJOztJQUUzQixJQUFHLENBQUEsQ0FBQSxFQUFBLFlBQWtCLE1BQWxCLENBQUg7TUFDRSxFQUFBLEdBQUssQ0FBQSxDQUFFLEVBQUYsRUFEUDs7SUFHQSxJQUFHLE1BQUEsS0FBWSxLQUFmO01BQ0UsRUFBRSxDQUFDLFdBQUgsQ0FBZSxNQUFmLEVBREY7O0lBR0EsSUFBRyxHQUFBLEtBQVMsS0FBWjtNQUNFLEVBQUUsQ0FBQyxRQUFILENBQVksR0FBWixFQURGOztBQUdBLFdBQU87RUFYSCxDQVBOO0VBb0JBLEdBQUEsRUFBSyxTQUFDLEVBQUQsRUFBSyxDQUFMOztNQUFLLElBQUU7O0lBRVYsSUFBRyxDQUFDLENBQUMsTUFBRixJQUFhLENBQUMsQ0FBQyxPQUFGLEdBQVksQ0FBNUI7TUFFRSxJQUFDLENBQUEsSUFBRCxDQUFNLEVBQU4sRUFBVSxLQUFWLEVBQWlCLFFBQWpCO01BQ0EsVUFBQSxDQUFXLENBQUEsU0FBQSxLQUFBO2VBQUEsU0FBQTtVQUNULEtBQUMsQ0FBQSxJQUFELENBQU0sRUFBTixFQUFVLFFBQVYsRUFBb0IsS0FBcEI7aUJBQ0EsS0FBQyxDQUFBLElBQUQsQ0FBTSxFQUFOLEVBQVUsSUFB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LFdBQUEsRUFBYSxTQUFBO0lBQ1gsS0FBSyxDQUFDLE9BQU4sQ0FBYyxDQUFBLENBQUUsSUFBRixDQUFPLENBQUMsSUFBUixDQUFhLE1BQWIsQ0FBZDtBQUNBLFdBQU87RUFGSSxDQVhiO0VBZUEsT0FBQSxFQUFTLFNBQUMsT0FBRDtXQUNQLFVBQUEsQ0FBVyxTQUFBO01BQ1QsQ0FBQSxDQUFFLFlBQUYsQ0FBZSxDQUFDLFFBQWhCLENBQXlCLEdBQUEsR0FBSSxPQUE3QixFQUNFO1FBQUEsUUFBQSxFQUFVLEdBQVY7UUFDQSxNQUFBLEVBQVEsS0FBSyxDQUFDLE1BRGQ7T0FERjthQUdBLFFBQVEsQ0FBQyxJQUFULEdBQWdCO0lBSlAsQ0FBWCxFQUtFLEdBTEY7RUFETyxDQWZUIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIl8gPVxuXG4gIGk6IC0+XG4gICAgQGNvbnNvbGUgPSBzZXRJbnRlcnZhbChAZGV0ZWN0LmJpbmQoQCksIDIwMClcblxuICBwOlxuICAgIG9mZmluZzogZmFsc2VcbiAgICBvZmZ0aW1lOiAwXG5cbiAgdHVybjogKGVsLCByZW1vdmU9ZmFsc2UsIGFkZD1mYWxzZSkgLT5cblxuICAgIGlmIGVsIG5vdCBpbnN0YW5jZW9mIGpRdWVyeVxuICAgICAgZWwgPSAkKGVsKVxuXG4gICAgaWYgcmVtb3ZlIGlzbnQgZmFsc2VcbiAgICAgIGVsLnJlbW92ZUNsYXNzKHJlbW92ZSlcblxuICAgIGlmIGFkZCBpc250IGZhbHNlXG4gICAgICBlbC5hZGRDbGFzcyhhZGQpXG5cbiAgICByZXR1cm4gdHJ1ZVxuXG4gIG9mZjogKGVsLCBwPXt9KSAtPlxuXG4gICAgaWYgcC5vZmZpbmcgYW5kIHAub2ZmdGltZSA+IDBcblxuICAgICAgQHR1cm4gZWwsIGZhbHNlLCAnb2ZmaW5nJ1xuICAgICAgc2V0VGltZW91dCA9PlxuICAgICAgICBAdHVybiBlbCwgJ29mZmluZycsIGZhbHNlXG4gICAgICAgIEB0dXJuIGVsLCAnb24nLCAnb2ZmJ1xuICAgICAgLCBwLm9mZnRpbWUqMTAwMCArIDEwMFxuXG4gICAgZWxzZVxuICAgICAgQHR1cm4gZWwsICdvbicsICdvZmYnXG5cbiAgICByZXR1cm5cblxuICBvbjogKGVsLCBwKSAtPlxuICAgIEB0dXJuIGVsLCAnb2ZmJywgJ29uJ1xuXG4gIHN3YXA6IChlbCwgcCkgLT5cblxuICAgIGlmIGVsIG5vdCBpbnN0YW5jZW9mIGpRdWVyeVxuICAgICAgZWwgPSAkKGVsKVxuXG4gICAgaWYgZWwuaGFzQ2xhc3MgJ29mZidcbiAgICAgIEBvbiBlbCwgcFxuICAgIGVsc2VcbiAgICAgIEBvZmYgZWwsIHBcblxuICAgIHJldHVyblxuXG4gIGVuY29kZTogKHN0cikgLT5cbiAgICByZXR1cm4gZW5jb2RlVVJJQ29tcG9uZW50KHN0cilcbiAgICAgIC5yZXBsYWNlKC8hL2csICclMjEnKVxuICAgICAgLnJlcGxhY2UoLycvZywgJyUyNycpXG4gICAgICAucmVwbGFjZSgvXFwoL2csICclMjgnKVxuICAgICAgLnJlcGxhY2UoL1xcKS9nLCAnJTI5JylcbiAgICAgIC5yZXBsYWNlKC9cXCovZywgJyUyQScpXG4gICAgICAucmVwbGFjZSgvJTIwL2csICcrJylcblxuICB0OiAoY2F0ZWdvcnksIGFjdGlvbiwgbGFiZWwsIHZhbHVlKSAtPlxuICAgIF9nYXEucHVzaCBbJ190cmFja0V2ZW50JywgY2F0ZWdvcnksIGFjdGlvbiwgbGFiZWwsIHZhbHVlXVxuXG4gIHJhbmQ6IChtaW4sIG1heCkgLT5cbiAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogbWF4KSArIG1pblxuXG4gIGZpdDogKHNyY1dpZHRoLCBzcmNIZWlnaHQsIG1heFdpZHRoLCBtYXhIZWlnaHQpIC0+XG4gICAgcmF0aW8gPSBNYXRoLm1pbihtYXhXaWR0aCAvIHNyY1dpZHRoLCBtYXhIZWlnaHQgLyBzcmNIZWlnaHQpXG4gICAgd2lkdGg6IHNyY1dpZHRoKnJhdGlvLCBoZWlnaHQ6IHNyY0hlaWdodCpyYXRpb1xuXG4gIGhleDJyZ2I6IChoZXgpIC0+XG4gICAgcmVzdWx0ID0gL14jPyhbYS1mXFxkXXsyfSkoW2EtZlxcZF17Mn0pKFthLWZcXGRdezJ9KSQvaS5leGVjKGhleClcbiAgICByOiBwYXJzZUludChyZXN1bHRbMV0sIDE2KSxcbiAgICBnOiBwYXJzZUludChyZXN1bHRbMl0sIDE2KSxcbiAgICBiOiBwYXJzZUludChyZXN1bHRbM10sIDE2KVxuIFxuICBvYmpjOiAob2JqKSAtPlxuICAgIChrIGZvciBvd24gayBvZiBvYmopLmxlbmd0aFxuXG4gIGxvYWQ6IChzY3JpcHQsIGluaXRpYXRlLCBjb21wbGV0ZSkgLT5cblxuICAgIGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCAnc2NyaXB0J1xuICAgIGVsLnR5cGUgPSAndGV4dC9qYXZhc2NyaXB0J1xuICAgIGVsLnNyYyA9IHNjcmlwdFxuICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIgJ2xvYWQnICwgKGUpIC0+XG4gICAgICBjb21wbGV0ZSgpIGlmIHR5cGVvZiBjb21wbGV0ZSBpcyAnZnVuY3Rpb24nXG4gICAgICB3aW5kb3dbaW5pdGlhdGVdLmkoKSBpZiBpbml0aWF0ZSBpc250IHVuZGVmaW5lZCBhbmQgaW5pdGlhdGUgaXNudCBmYWxzZVxuICAgICwgZmFsc2VcblxuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZWwpXG5cbiAgamluaXQ6IC0+XG4gICAgJC5hamF4U2V0dXBcbiAgICAgIGRhdGFUeXBlOiBcImpzb25cIlxuXG4gIHBhdGNoOiAodXJsLCBkYXRhKSAtPlxuXG4gICAgQGppbml0KClcblxuICAgIGpwYXRjaCA9ICQuYWpheFxuICAgICAgdXJsOiB1cmxcbiAgICAgIGRhdGE6IGRhdGFcbiAgICAgIHR5cGU6ICdQQVRDSCdcblxuICAgIGpwYXRjaC5mYWlsIChyZXNwb25zZSkgLT5cbiAgICAgIEBmYWlsKHJlc3BvbnNlKVxuXG4gICAgcmV0dXJuIGpwYXRjaFxuXG4gIGdldDogKGFyZ3MuLi4pIC0+XG5cbiAgICBAamluaXQoKVxuXG4gICAgamdldCA9ICQuZ2V0IGFyZ3MuLi5cblxuICAgIGpnZXQuZmFpbCAocmVzcG9uc2UpID0+XG4gICAgICBAZmFpbChyZXNwb25zZSlcbiAgICAgIGpnZXQuZmFpbChyZXNwb25zZSlcblxuICAgIHJldHVybiBqZ2V0XG5cbiAgcG9zdDogKGFyZ3MuLi4pIC0+XG5cbiAgICBqcG9zdCA9ICQucG9zdCBhcmdzLi4uXG5cbiAgICBqcG9zdC5mYWlsIChyZXNwb25zZSkgPT5cbiAgICAgIEBmYWlsKHJlc3BvbnNlKVxuICAgICAganBvc3QuZmFpbChyZXNwb25zZSlcblxuICAgIHJldHVybiBqcG9zdFxuXG4gIGZhaWw6IChyZXNwb25zZSkgLT5cblxuICAgIGVycm9yID0gcmVzcG9uc2UucmVzcG9uc2VKU09OPy5lcnJvcnM/WzBdXG4gICAgaWYgZXJyb3IgaXMgdW5kZWZpbmVkXG4gICAgICByZXR1cm4gUHJvbXB0LmkgcmVzcG9uc2Uuc3RhdHVzLCByZXNwb25zZS5zdGF0dXNUZXh0XG5cbiAgICBwdWcgPSBlcnJvci5tZXNzYWdlLm1hdGNoIC9QdWcgRXJyb3I6ICguKj8pOihbMC05XSspL1xuICAgIGlmIHB1ZyBpc250IG51bGxcbiAgICAgIGVycm9yLm1lc3NhZ2UgPSBlcnJvci5tZXNzYWdlLnJlcGxhY2UgL1B1ZyBFcnJvcjogKC4qPyk6KFswLTldKykvLCAnJ1xuICAgICAgZXJyb3IuZmlsZSA9IHB1Z1sxXVxuICAgICAgZXJyb3IubGluZSA9IHB1Z1syXVxuXG4gICAgZmlsZSA9IEBlbmNvZGUgXCIje2Vycm9yLmZpbGV9XCJcblxuICAgIHN3aXRjaCBjb25maWcuYXBwLmVkaXRvclxuICAgICAgd2hlbiAnbWFjdmltJyB0aGVuIGVkaXRvciA9ICdtdmltOi8vb3Blbj91cmw9ZmlsZTovLydcbiAgICAgIHdoZW4gJ3N1YmxpbWUnIHRoZW4gZWRpdG9yID0gJ3N1Ymw6Ly9vcGVuP3VybD1maWxlOi8vJ1xuICAgICAgd2hlbiAnZW1hY3MnIHRoZW4gZWRpdG9yID0gJ2VtYWNzOi8vb3Blbj91cmw9ZmlsZTovLydcbiAgICAgIHdoZW4gJ3RleHRtYXRlJyB0aGVuIGVkaXRvciA9ICd0ZXh0bWF0ZTovL29wZW4vP3VybD1maWxlOi8vJ1xuICAgICAgd2hlbiAncGhwc3Rvcm0nIHRoZW4gZWRpdG9yID0gJ3BocHN0b3JtOi8vb3Blbj9maWxlPSdcblxuICAgIGlmIGVycm9yLmZpbGUgaXNudCBudWxsXG4gICAgICBib2R5ID0gXCJcIlwiXG4gICAgICAgIDxwcmU+I3tlcnJvci5tZXNzYWdlfTwvcHJlPlxuICAgICAgICA8YSBocmVmPVwiI3tlZGl0b3J9I3tmaWxlfSZsaW5lPSN7ZXJyb3IubGluZX1cIj48Yj4je2Vycm9yLmZpbGV9OiN7ZXJyb3IubGluZX08L2I+PC9hPlxuICAgICAgXCJcIlwiXG4gICAgZWxzZVxuICAgICAgYm9keSA9IGVycm9yLm1lc3NhZ2VcblxuICAgIFByb21wdC5pIGVycm9yLnR5cGUsIGJvZHksIFsnT0snXVxuXG4gIG1ldGhvZHM6IChvYmopIC0+XG4gICAgcmVzID0gW11cbiAgICBmb3IgaSxtIG9mIG9ialxuICAgICAgaWYgdHlwZW9mIG0gaXMgJ2Z1bmN0aW9uJ1xuICAgICAgICByZXMucHVzaCBtXG4gICAgcmV0dXJuIHJlc1xuXG4gIGxsYzogLT5cbiAgICBhc2NpaSA9IFwiXCJcIlxuXG4gICAgICAlY21tbS8uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uL21tbVxuICAgICAgbW1vLi4uLi4uLi4uLi4uLi4uLi06Oi8vOjotLi4uLi4uLi06Ojo6Ojo6Ojo6Ojo6LS4uLi4uLi4uLTo6Ly8vOi0ub21tXG4gICAgICBtZC0uLi4uLi4uLi4uLi4uOit5aGRkZGRkZGh5Ky0uLi4uL2RkZGRkZGRkZGRkZGQrLi4uLi4uL3NoZGRkZGRkZHlvZG1cbiAgICAgIG1vLi4uLi4uLi4uLi4uLi1obW1taHl5eXlkbW1taDouLi4vbW1tbWhoaGhoaGhoaCsuLi4uOnlkbW1kaHl5eWhkZG9vbVxuICAgICAgbS0uLi4uLi4uLi4uLi4uLi1zczotLi4uLi15bW1teS4uLi9tbW1tLS0tLS0tLS0tLi4uLjpkbW1tczotLi4uLTovLi1tXG4gICAgICBkLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLnltbW15Li4uL21tbW0tLytvb28rOi0uLi4ueW1tbXktOitvb28rLy0uLmRcbiAgICAgIGguLi4uLi4uLi4uLi4uLi4uLi4uLi4uLjpzbW1tZDouLi4vbW1tbWhtbW1tbW1kaCsuLi5kbW1tc2hkbW1tbW1taHMtaFxuICAgICAgaC4uLi4uLi4uLi4uLi4uLi4uLi4uLjpzZG1tZHk6Li4uLjpoaGRobysvLyt5bW1tbSsuLmRtbW1keW8vLytzZG1tbWhoXG4gICAgICBkLi4uLi4uLi4uLi4uLi4uLi4uLSt5ZG1tZHkvLi4uLi4uLi0tOi4uLi4uLi5zbW1taC4ueW1tbXMuLi4uLi46bW1tbW1cbiAgICAgIG0tLi4uLi4uLi4uLi4uLi4tOnNobW1tZHMvLS0tLS0uLi4uOnMvLS0uLi4tOmhtbW1zLi46ZG1tZC8tLi4uLW9tbW1tbVxuICAgICAgbW8uLi4uLi4uLi4uLi4uLmhtbW1tbW1oaGhoaGhoaC4uLitkbW1kaHl5eWhkbW1teS0uLi4vaG1tbWh5eXlobW1tZGhtXG4gICAgICBtZC0uLi4uLi4uLi4uLi4uZGRkZGRkZGRkZGRkZGRkLi4uLStzaGRkZGRkZGRoeS8tLi4uLi4tb3lkZGRkZGRkaG86ZG1cbiAgICAgIG1tby4uLi4uLi4uLi4uLi46Ojo6Ojo6Ojo6Ojo6OjouLi4uLi4uLTovLy86Oi0uLi4uLi4uLi4uLi06Ly8vOi0uLm9tbVxuICAgICAgbW1tLy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4vbW1tXG5cbiAgICAgIDo6IHN5bnRhY3RpYyBzdWdhciBieSAyNTZcbiAgICAgIDo6IGh0dHA6Ly8yNTYuaW8vXG4gICAgICA6OiAje2NvbmZpZy5tZXRhLnJlcG99XG4gICAgXCJcIlwiXG4gICAgY29uc29sZS5sb2cgYXNjaWksIFwiY29sb3I6IGdyZXk7IGZvbnQtZmFtaWx5OiBNZW5sbywgbW9ub3NwYWNlO1wiXG5cbiAgZGV0ZWN0OiAtPlxuICAgIGlmICgoKHdpbmRvdy5vdXRlckhlaWdodCAtIHdpbmRvdy5pbm5lckhlaWdodCkgPiAxMDApIHx8ICgod2luZG93Lm91dGVyV2lkdGggLSB3aW5kb3cuaW5uZXJXaWR0aCkgPiAxMDApKVxuICAgICAgQGxsYygpXG4gICAgICBjbGVhckludGVydmFsIEBjb25zb2xlXG5cbl8uaSgpXG4iLCJjb25maWcgPSB7XCJjb2xvclwiOntcIndoaXRlMVwiOlwiI2ZmZmZmZlwiLFwiYmxhY2sxXCI6XCIjMDAwMDAwXCIsXCJibGFjazJcIjpcIiMxOTE5MTlcIixcImJyb3duMVwiOlwiI0MyOUU2RVwiLFwiYnJvd24yXCI6XCIjQUE4MDUyXCIsXCJicm93bjNcIjpcIiM4NzYwMzdcIixcImJlaWdlMVwiOlwiI0M3QkFBMlwiLFwiYmVpZ2UyXCI6XCIjRTVFM0RCXCJ9LFwiZm9udFwiOntcImgxXCI6e1wiZm9udC1mYW1pbHlcIjpcIm9jdGF2aWFuIHJlZ3VsYXJcIixcImZvbnQtc2l6ZVwiOlwiMjJweFwifSxcImgyXCI6e1wiZm9udC1mYW1pbHlcIjpcInNlcmlhbCByZWd1bGFyXCIsXCJmb250LXNpemVcIjpcIjU1cHhcIn0sXCJjb3B5MVwiOntcImZvbnQtZmFtaWx5XCI6XCJpbmRlcGVuZGVuY2UgcmVndWxhclwiLFwiZm9udC1zaXplXCI6XCIyOXB4XCJ9LFwiY29weTJcIjp7XCJmb250LWZhbWlseVwiOlwiR2FyYW1vbmRcIixcImZvbnQtc2l6ZVwiOlwiMTE2cHhcIn19LFwibWV0YVwiOntcInVybFwiOlwiaHR0cDovL2xvb2tpbmdnbGFzc3ZyLmNvbS9cIixcInRpdGxlXCI6XCJMb29raW5nIEdsYXNzIFZSXCIsXCJkZXNjcmlwdGlvblwiOlwiV2luZG93cyB0byB0aGUgcGFzdCBhcmUgb3BlbiBhdCBsYXN0XCIsXCJrZXl3b3Jkc1wiOlwiVlIsIFZSIGFwcCwgbG9va2luZyBnbGFzc1wiLFwidHJhY2tpbmdfaWRcIjpcIlVBLTg5MzAwODIyLTFcIixcInNoYXJlXCI6XCJpbWFnZXMvc2hhcmUuanBnXCIsXCJyZXBvXCI6XCJodHRwczovL2dpdGh1Yi5jb20vbG9va2luZ2dsYXNzdnIvbG9va2luZ2dsYXNzXCIsXCJzb2NpYWxcIjp7XCJmYWNlYm9va1wiOlwiaHR0cHM6Ly93d3cuZmFjZWJvb2suY29tL0xvb2tpbmctR2xhc3MtVlItMTc4Mjk0MjU5Mjg0Mjk2L1wiLFwidHdpdHRlclwiOlwiaHR0cHM6Ly90d2l0dGVyLmNvbS9zdGVyZW92aWV3c1wiLFwiaW5zdGFncmFtXCI6XCJodHRwczovL2luc3RhZ3JhbS5jb20vbG9va2luZ2dsYXNzdnJcIn19LFwiY29weVwiOntcImNvbGxlY3Rpb25cIjp7XCJ0aXRsZVwiOlwidGhlIGNvbGxlY3Rpb25cIixcImZpcnN0XCI6XCJUXCIsXCJjb3B5XCI6XCJoZSBzdGVyZW8tcGhvdG9zIHlvdSBzZWUgaW4gTG9va2luZyBHbGFzcyBWUiBhcmUgc2VsZWN0ZWQgZXhjZXJwdHMgZnJvbSB0aGUgPGEgdGFyZ2V0PVxcXCJfYmxhbmtcXFwiIGhyZWY9XFxcImh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0tleXN0b25lX1ZpZXdfQ29tcGFueVxcXCI+S2V5c3RvbmUgVmlldyBDb21wYW55PC9hPuKAmXMgPGEgdGFyZ2V0PVxcXCJfYmxhbmtcXFwiIGhyZWY9XFxcImh0dHA6Ly93d3cubGliLnV0ZXhhcy5lZHUvdGFyby91dGNhaC8wMjE4Mi9jYWgtMDIxODIuaHRtbFxcXCI+4oCYVG91ciBvZiB0aGUgV29ybGTigJk8L2E+LCBhIHRpbnkgZ2xpbXBzZSBvZiBLZXlzdG9uZeKAmXMgaW50ZXJuYXRpb25hbGx5IHRoZW1lZCBzdGVyZW8gcGhvdG9ncmFwaHkgY29sbGVjdGlvbi4gRnJvbSAxODkyIHRvIDE5MzMsIG92ZXIgMzAwLDAwMCBzdWNoIGNhcmRzIHdlcmUgcHJvZHVjZWQuIEluIDE5NzgsIHRoZSBjb21wYW55J3MgcmVjb3JkcyBhbmQgaW52ZW50b3J5IG9mIG5lZ2F0aXZlcyB3ZXJlIGRvbmF0ZWQgdG8gdGhlIDxhIHRhcmdldD1cXFwiX2JsYW5rXFxcIiBocmVmPVxcXCJodHRwOi8vYXJ0c2Jsb2NrLnVjci5lZHUvUGFnZS9jYWxpZm9ybmlhLW11c2V1bS1vZi1waG90b2dyYXBoeVxcXCI+VUNSL0NhbGlmb3JuaWEgTXVzZXVtIG9mIFBob3RvZ3JhcGh5IGF0IHRoZSBVbml2ZXJzaXR5IG9mIENhbGlmb3JuaWEgUml2ZXJzaWRlPC9hPiwgd2hlcmUgdGhleSBhcmUgbm93IGtub3duIGFzIHRoZSA8YSB0YXJnZXQ9XFxcIl9ibGFua1xcXCIgaHJlZj1cXFwiaHR0cDovL3d3dy5vYWMuY2RsaWIub3JnL2ZpbmRhaWQvYXJrOi8xMzAzMC9mdDFxMm45OTltL1xcXCI+S2V5c3RvbmUtTWFzdCBjb2xsZWN0aW9uPC9hPi5cIn0sXCJjcmVkaXRzXCI6e1widGl0bGVcIjpcImNyZWRpdHMgYW5kIHRoYW5rc1wiLFwiZmlyc3RcIjpcIkhcIixcImNvcHlcIjpcImFuZCBsZXR0ZXJpbmcgYnkgPGEgdGFyZ2V0PVxcXCJfYmxhbmtcXFwiIGhyZWY9XFxcImh0dHA6Ly93d3cudG9iaWFzc2F1bC5kZS9cXFwiPlRvYmlhcyBTYXVsPC9hPiBhbmQgaWxsdXN0cmF0aW9uIGJ5IDxhIHRhcmdldD1cXFwiX2JsYW5rXFxcIiBocmVmPVxcXCJodHRwOi8vd3d3LndlZW1zaWxsdXN0cmF0aW9uLmNvbS9cXFwiPk1hdHQgV2VlbXM8L2E+LiBXZWIgZGVzaWduIGJ5IDxhIHRhcmdldD1cXFwiX2JsYW5rXFxcIiBocmVmPVxcXCJodHRwOi8vd3d3Lm1haGVyc2luamFyeS5jb20vXFxcIj5NYWhlciBTaW5qYXJ5PC9hPi4gUHJvdG90eXBlZCB3aXRoIHRoZSBoZWxwIG9mIDxhIHRhcmdldD1cXFwiX2JsYW5rXFxcIiBocmVmPVxcXCJodHRwOi8vc3V6YW5pbWF0b3IuY29tL1xcXCI+U3V6YW5uZSBMZWlicmljazwvYT4uIFNvdW5kIGVmZmVjdHMgdXNlZCBmcm9tIDxhIHRhcmdldD1cXFwiX2JsYW5rXFxcIiBocmVmPVxcXCJodHRwOi8vZnJlZXNvdW5kLm9yZ1xcXCI+ZnJlZXNvdW5kLm9yZzwvYT4uICg8YSB0YXJnZXQ9XFxcIl9ibGFua1xcXCIgaHJlZj1cXFwiaHR0cHM6Ly93d3cuZnJlZXNvdW5kLm9yZy9wZW9wbGUvUm9iaW5ob29kNzYvc291bmRzLzEyNTMxNS9cXFwiPkE8L2E+IDxhIHRhcmdldD1cXFwiX2JsYW5rXFxcIiBocmVmPVxcXCJodHRwOi8vZnJlZXNvdW5kLm9yZy9wZW9wbGUvSW5zcGVjdG9ySi9zb3VuZHMvMzQzMTMwL1xcXCI+QjwvYT4gPGEgdGFyZ2V0PVxcXCJfYmxhbmtcXFwiIGhyZWY9XFxcImh0dHA6Ly9mcmVlc291bmQub3JnL3Blb3BsZS9OaWdodFZvaWNlL3NvdW5kcy8yMzQyNjgvXFxcIj5DPC9hPiA8YSB0YXJnZXQ9XFxcIl9ibGFua1xcXCIgaHJlZj1cXFwiaHR0cDovL2ZyZWVzb3VuZC5vcmcvcGVvcGxlL2t3YWhtYWhfMDIvc291bmRzLzI2NDA5Ni9cXFwiPkQ8L2E+IDxhIHRhcmdldD1cXFwiX2JsYW5rXFxcIiBocmVmPVxcXCJodHRwOi8vZnJlZXNvdW5kLm9yZy9wZW9wbGUvbnNzdHVkaW9zL3NvdW5kcy8zMjExMTQvXFxcIj5FPC9hPiA8YSB0YXJnZXQ9XFxcIl9ibGFua1xcXCIgaHJlZj1cXFwiaHR0cDovL2ZyZWVzb3VuZC5vcmcvcGVvcGxlL2Y0bmd5L3NvdW5kcy8yNDA3NzYvXFxcIj5GPC9hPiA8YSB0YXJnZXQ9XFxcIl9ibGFua1xcXCIgaHJlZj1cXFwiaHR0cDovL2ZyZWVzb3VuZC5vcmcvcGVvcGxlL01yQXVyYWxpemF0aW9uL3NvdW5kcy8xODQ1NjcvXFxcIj5HPC9hPiA8YSB0YXJnZXQ9XFxcIl9ibGFua1xcXCIgaHJlZj1cXFwiaHR0cDovL2ZyZWVzb3VuZC5vcmcvcGVvcGxlL1N1bm55U2lkZVNvdW5kL3NvdW5kcy82Nzc5MS9cXFwiPkg8L2E+KSBXaXRoIG11c2ljIGZyb20gdGhlIDxhIHRhcmdldD1cXFwiX2JsYW5rXFxcIiBocmVmPVxcXCJodHRwOi8vb3Blbm11c2ljYXJjaGl2ZS5vcmcvYnJvd3NlX3RhZy5waHA/dGFnPTE5MjBzXFxcIj5PcGVuIE11c2ljIEFyY2hpdmU8L2E+LlwiLFwiYXV0aG9yc1wiOntcInRpdGxlXCI6XCJMb29raW5nIEdsYXNzIFZSIHdhc1wiLFwiam9lYlwiOlwiY3JlYXRlZCBieSA8YnIgLz48YSB0YXJnZXQ9XFxcIl9ibGFua1xcXCIgaHJlZj1cXFwiaHR0cDovL2pvZWJveWxlLmNvbVxcXCI+Sm9lIEJveWxlPC9hPlwiLFwibHVjYW1cIjpcImxlYWQgcHJvZ3JhbW1pbmcgYnkgPGJyIC8+PGEgdGFyZ2V0PVxcXCJfYmxhbmtcXFwiIGhyZWY9XFxcImh0dHA6Ly9tZWZpc3RvZmlsZXMuY29tL1xcXCI+THVjYSBNZWZpc3RvPC9hPlwiLFwia2V2aW5jXCI6XCIzRCBhcnQgYnkgPGJyIC8+PGEgdGFyZ2V0PVxcXCJfYmxhbmtcXFwiIGhyZWY9XFxcImh0dHA6Ly93d3cua2V2aW5jYXN0YW5lZGEuY29tL1xcXCI+S2V2aW4gQ2FzdGFuZWRhPC9hPlwiLFwia2V2aW5vXCI6XCJ3ZWIgZGV2IGJ5IDxiciAvPjxhIHRhcmdldD1cXFwiX2JsYW5rXFxcIiBocmVmPVxcXCJodHRwczovLzI1Ni5pb1xcXCI+S2V2aW4gT2xzb248L2E+XCJ9fSxcImZvb3RlclwiOntcImNvcHlyaWdodFwiOlwiQ29weXJpZ2h0ICZjb3B5OyAyMDE4LCAyMDE3LCAyMDE2IExvb2tpbmcgR2xhc3MgVlIsIExMQy0gQWxsIFJpZ2h0cyBSZXNlcnZlZFwifSxcImhpc3RvcnlcIjp7XCJ0aXRsZVwiOlwiaGlzdG9yeSBvZiBzdGVyZW9zY29weVwiLFwiY29weTFcIjpcIuKAnEl0IGlzIGEgZGVsaWdodGZ1bCBjaGFyYWN0ZXJpc3RpYyBvZiB0aGVzZSB0aW1lcywgdGhhdCBuZXcgYW5kIGNoZWFwIG1lYW5zIGFyZSBjb250aW51b3VzbHkgYmVpbmcgZGV2aXNlZCwgZm9yIGNvbnZleWluZyB0aGUgcmVzdWx0cyBvZiBhIGNhc3VhbCBleHBlcmllbmNlIHRvIHRob3NlIHdobyBhcmUgdW5hYmxlIHRvIG9idGFpbiBzdWNoIGV4cGVyaWVuY2VzIGZvciB0aGVtc2VsdmVzOyBhbmQgdG8gYnJpbmcgdGhlbSB3aXRoaW4gdGhlIHJlYWNoIG9mIHRoZSBwZW9wbGUu4oCdIOKAlENoYXJsZXMgRGlja2Vuc1wiLFwiZmlyc3RcIjpcIkVcIixcImNvcHkyXCI6XCJ2ZW4gYW1vbmdzdCB2aXJ0dWFsIHJlYWxpdHkgZW50aHVzaWFzdHMsIG1vc3QgcGVvcGxlIGRvbuKAmXQgcmVhbGl6ZSB0aGF0IHRoZSBmaXJzdCAzRCB2aWV3ZXIgd2FzIGRldmVsb3BlZCBpbiAxODM4IGJ5IDxhIHRhcmdldD1cXFwiX2JsYW5rXFxcIiBocmVmPVxcXCJodHRwOi8vd3d3LnN0ZXJlb3Njb3B5LmNvbS9mYXEvd2hlYXRzdG9uZS5odG1sXFxcIj5DaGFybGVzIFdoZWF0c3RvbmU8L2E+IC0gYWxtb3N0IDE4MCB5ZWFycyBhZ28hIFNpbmNlIGJlZm9yZSB0aGUgcG9wdWxhcml6YXRpb24gb2YgdGVsZXZpc2lvbiwgcmFkaW8sIGNpbmVtYSwgb3IgdmlydHVhbCByZWFsaXR5LCBwZW9wbGUgaGF2ZSBiZWVuIGV4cGxvcmluZyB0aGUgd29ybGQgdGhyb3VnaCBpbW1lcnNpdmUgc3RlcmVvIDNEIGltYWdlcy4gU2luY2UgdGhlIGludmVudGlvbiBvZiB0aGUgc3RlcmVvc2NvcGUsIHVwIHRocm91Z2ggdGhlIG1pZCAyMHRoIGNlbnR1cnksIGh1bmRyZWRzIG9mIHRob3VzYW5kcyBvZiBzdGVyZW9ncmFwaGljIHBob3RvcyBjYXJkcyB3ZXJlIHByb2R1Y2VkIGFuZCBkaXN0cmlidXRlZCBhbGwgb3ZlciB0aGUgd29ybGQuIFRob3VnaCBuZWFybHkgZm9yZ290dGVuLCB0aGVzZSBwaG90byBjYXJkcyBjYW4gYWdhaW4gYmUgdmlld2VkIGFzIGludGVuZGVkLCB0aGFua3MgdG8gdGhlIGFkdmVudCBvZiBtb2JpbGUgVlIuXCJ9LFwiaG93dG9cIjp7XCJ0aXRsZVwiOlwiaG93IHRvIHVzZSBsb29raW5nIGdsYXNzIHZyXCIsXCJpbnN0cnVjdGlvbnNcIjpbXCJNYWtlIHN1cmUgeW91IGhhdmUgYSBzdXBwb3J0aW5nIGhlYWRzZXQsIGVpdGhlciA8YSB0YXJnZXQ9XFxcIl9ibGFua1xcXCIgaHJlZj1cXFwiaHR0cDovL3d3dy5zYW1zdW5nLmNvbS9nbG9iYWwvZ2FsYXh5L2dlYXItdnIvXFxcIj5TYW1zdW5nIEdlYXIgVlI8L2E+IG9yIDxhIHRhcmdldD1cXFwiX2JsYW5rXFxcIiBocmVmPVxcXCJodHRwczovL3ZyLmdvb2dsZS5jb20vY2FyZGJvYXJkL2dldC1jYXJkYm9hcmQvXFxcIj5Hb29nbGUgQ2FyZGJvYXJkIGhlYWRzZXQ8L2E+LiAoT25lIHdpdGggYSB0cmlnZ2VyISlcIixcIkluc3RhbGwgTG9va2luZyBHbGFzcyBWUiBmcm9tIGVpdGhlciA8YSB0YXJnZXQ9XFxcIl9ibGFua1xcXCIgaHJlZj1cXFwiaHR0cHM6Ly93d3cub2N1bHVzLmNvbS9leHBlcmllbmNlcy9nZWFyLXZyLzExMDc3NjY4MzkzMjg4MDhcXFwiPk9jdWx1cyBIb21lIChHZWFyIFZSKTwvYT4gb3IgPGEgdGFyZ2V0PVxcXCJfYmxhbmtcXFwiIGhyZWY9XFxcImh0dHBzOi8vcGxheS5nb29nbGUuY29tL3N0b3JlL2FwcHMvZGV0YWlscz9pZD1waG90b3Muc3RlcmVvZ3JhcGhpYy5jYXJkYm9hcmRcXFwiPkdvb2dsZSBQbGF5IChDYXJkYm9hcmQpPC9hPi5cIixcIlR1cm4gb24geW91ciBXaUZpICYgbGF1bmNoIHRoZSBhcHBsaWNhdGlvbi5cIixcIkxldCB0aGUgYXBwbGljYXRpb24gZG93bmxvYWQgbW9yZSBjb250ZW50LCBvciBqdXN0IGhpdCBzdGFydCB0byB1c2Ugd2hhdCB5b3UgaGF2ZS5cIixcIkNsaWNrIHlvdXIgdHJpZ2dlciBvbiB0aGUgc3RlcmVvc2NvcGUgdG8gZ2V0IHN0YXJ0ZWQuXCJdLFwiZXh0cmFcIjpcIklmIHlvdXIgQ2FyZGJvYXJkIGRldmljZSBkb2VzIG5vdCBoYXZlIGEgdHJpZ2dlciwgeW91IGNhbiB1c2UgYSA8YSB0YXJnZXQ9XFxcIl9ibGFua1xcXCIgaHJlZj1cXFwiaHR0cHM6Ly93d3cuYW1hem9uLmNvbS9TdGVlbFNlcmllcy1TdHJhdHVzLUJsdWV0b290aC1XaXJlbGVzcy1Db250cm9sbGVyL2RwL0IwMTVXS1kzSU0vcmVmPXNyXzFfMVxcXCI+Ymx1ZXRvb3RoIGNvbnRyb2xsZXI8L2E+IHRvIGludGVyYWN0IHdpdGggdGhlIGFwcGxpY2F0aW9uLlwifSxcImludHJvXCI6e1wiZmlyc3RcIjpcIldcIixcImNvcHlcIjpcImVsY29tZSB0byBMb29raW5nIEdsYXNzIFZSISAgTG9va2luZyBHbGFzcyBWUiBpcyBhIG1vYmlsZSBWUiBiYXNlZCAzRCBwaG90byB2aWV3ZXIgd2hpY2ggYnJpbmdzIGh1bmRyZWRzIG9mIGhpc3RvcmljIDNEIHBob3RvcyBmcm9tIGFyb3VuZCB0aGUgd29ybGQgaW50byBmb2N1cy4gTG9va2luZyBHbGFzcyBWUiBpcyBhdmFpbGFibGUgb24gPGEgdGFyZ2V0PVxcXCJfYmxhbmtcXFwiIGhyZWY9XFxcImh0dHBzOi8vd3d3Lm9jdWx1cy5jb20vZXhwZXJpZW5jZXMvZ28vMTEwNzc2NjgzOTMyODgwOC9cXFwiPk9jdWx1cyBHbzwvYT4gYW5kIDxhIHRhcmdldD1cXFwiX2JsYW5rXFxcIiBocmVmPVxcXCJodHRwczovL3d3dy5vY3VsdXMuY29tL2V4cGVyaWVuY2VzL2dlYXItdnIvMTEwNzc2NjgzOTMyODgwOFxcXCI+U2Ftc3VuZyBHZWFyIFZSPC9hPi5cIn19fTsiLCJcbkRlbGF5ID1cbiAgdG9wOiAyMDBcbiAgd2luOiBmYWxzZVxuICBzdHVjazogZmFsc2VcblxuICBpOiAtPlxuXG4gICAgQHdpbiA9ICQgd2luZG93XG4gICAgJCh3aW5kb3cpLnNjcm9sbCBAY2hlY2tTY3JvbGxcblxuICBjaGVja1Njcm9sbDogLT5cblxuICAgIHN0ID0gRGVsYXkud2luLnNjcm9sbFRvcCgpXG5cbiAgICBpZiBzdCA+IERlbGF5LnRvcCBhbmQgRGVsYXkuc3R1Y2sgaXMgZmFsc2VcbiAgICAgICQoJ2hlYWRlciA+IC5pbm5lciA+IC5tZW51JykuYWRkQ2xhc3MoJ3N0dWNrJykucmVtb3ZlQ2xhc3MgJ3Vuc3R1Y2snXG4gICAgICBfLm9uICdoZWFkZXIgPiAuaW5uZXIgPiAubWVudSA+IC5vdXRlciA+IC5pbm5lciA+IC5sZWZ0ID4gLmxnJ1xuICAgICAgXy5vZmYgJ2hlYWRlciA+IC5pbm5lciA+IC5tZW51ID4gLm91dGVyID4gLmlubmVyID4gLmxlZnQgPiAubG9jJ1xuICAgICAgRGVsYXkuc3R1Y2sgPSB0cnVlXG5cbiAgICBpZiBzdCA8IERlbGF5LnRvcCBhbmQgRGVsYXkuc3R1Y2sgaXMgdHJ1ZVxuICAgICAgJCgnaGVhZGVyID4gLmlubmVyID4gLm1lbnUnKS5hZGRDbGFzcygndW5zdHVjaycpLnJlbW92ZUNsYXNzICdzdHVjaydcbiAgICAgIF8ub2ZmICdoZWFkZXIgPiAuaW5uZXIgPiAubWVudSA+IC5vdXRlciA+IC5pbm5lciA+IC5sZWZ0ID4gLmxnJ1xuICAgICAgXy5vbiAnaGVhZGVyID4gLmlubmVyID4gLm1lbnUgPiAub3V0ZXIgPiAuaW5uZXIgPiAubGVmdCA+IC5sb2MnXG4gICAgICBEZWxheS5zdHVjayA9IGZhbHNlXG5cbiIsIkluZGV4ID1cbiAgb2Zmc2V0OiAtNjBcblxuICBpOiAtPlxuICAgIGNvbnNvbGUubG9nICdJbmRleC5pKCknXG4gICAgRGVsYXkuaSgpXG4gICAgQGhhbmRsZXJzKClcblxuICBoYW5kbGVyczogLT5cbiAgICAkKCdoZWFkZXIgPiAuaW5uZXIgPiAubWVudSA+IC5vdXRlciA+IC5pbm5lciA+IC5pdGVtJykuY2xpY2sgQG1lbnVIYW5kbGVyXG4gICAgJCgnaGVhZGVyID4gLmlubmVyID4gLm1lbnUgPiAub3V0ZXIgPiAuaW5uZXIgPiAubGVmdCA+IC5sZycpLmNsaWNrIEBtZW51SGFuZGxlclxuXG4gIG1lbnVIYW5kbGVyOiAtPlxuICAgIEluZGV4LnNlY3Rpb24gJCh0aGlzKS5kYXRhICdpdGVtJ1xuICAgIHJldHVybiBmYWxzZVxuXG4gIHNlY3Rpb246IChzZWN0aW9uKSAtPlxuICAgIHNldFRpbWVvdXQgLT5cbiAgICAgICQoJ2h0bWwsIGJvZHknKS5zY3JvbGxUbyBcIiMje3NlY3Rpb259XCIsXG4gICAgICAgIGR1cmF0aW9uOiA1MDBcbiAgICAgICAgb2Zmc2V0OiBJbmRleC5vZmZzZXRcbiAgICAgIGxvY2F0aW9uLmhhc2ggPSBzZWN0aW9uXG4gICAgLCAxMDBcblxuXG4iXX0=
