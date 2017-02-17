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
      "first": "A",
      "copy": "dditional hand lettering by <a target=\"_blank\" href=\"http://www.tobiassaul.de/\">Tobias Saul</a> and illustration by <a target=\"_blank\" href=\"http://www.weemsillustration.com/\">Matt Weems</a>. Web design by <a target=\"_blank\" href=\"http://www.mahersinjary.com/\">Maher Sinjary</a>. Website by <a target=\"_blank\" href=\"http://256.io/\">Kevin Olson</a>. Prototyped with the help of <a target=\"_blank\" href=\"http://suzanimator.com/\">Suzanne Leibrick</a>. Sound effects used from <a target=\"_blank\" href=\"http://freesound.org\">freesound.org</a>. (<a target=\"_blank\" href=\"https://www.freesound.org/people/Robinhood76/sounds/125315/\">A</a> <a target=\"_blank\" href=\"http://freesound.org/people/InspectorJ/sounds/343130/\">B</a> <a target=\"_blank\" href=\"http://freesound.org/people/NightVoice/sounds/234268/\">C</a> <a target=\"_blank\" href=\"http://freesound.org/people/kwahmah_02/sounds/264096/\">D</a> <a target=\"_blank\" href=\"http://freesound.org/people/nsstudios/sounds/321114/\">E</a> <a target=\"_blank\" href=\"http://freesound.org/people/f4ngy/sounds/240776/\">F</a> <a target=\"_blank\" href=\"http://freesound.org/people/MrAuralization/sounds/184567/\">G</a> <a target=\"_blank\" href=\"http://freesound.org/people/SunnySideSound/sounds/67791/\">H</a>) With music from the <a target=\"_blank\" href=\"http://openmusicarchive.org/browse_tag.php?tag=1920s\">Open Music Archive</a>.",
      "authors": {
        "title": "Looking Glass VR was",
        "joeb": "created by <br /><a target=\"_blank\" href=\"http://joeboyle.com\">Joe Boyle</a>",
        "kevinc": "with 3D art by <br /><a target=\"_blank\" href=\"http://www.kevincastaneda.com/\">Kevin Castaneda</a>",
        "kevino": "and web dev by <br /><a target=\"_blank\" href=\"https://256.io\">Kevin Olson</a>"
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
      "instructions": ["Make sure you have a <a target=\"_blank\" href=\"https://vr.google.com/cardboard/get-cardboard/\">Google Cardboard headset</a>. (One with a trigger!)", "Install <a target=\"_blank\" href=\"https://play.google.com/store/apps/details?id=photos.stereographic.cardboard\">Looking Glass VR</a> from the Google Play Store.", "Turn on your WiFi & launch the application.", "Click your trigger on the stereoscope to get started.", "Additionally, you can <a href=\"http://youtu.be/XTc5z2nbjsI\" target=\"_blank\">watch this helpful tutorial video</a> which covers the basics of installation and using Looking Glass VR."],
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIjI1Ni5jb2ZmZWUiLCJjb25maWcuY29mZmVlIiwiZGVsYXkuY29mZmVlIiwiaW5kZXguY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUEsQ0FBQTtFQUFBOzs7QUFBQSxDQUFBLEdBRUU7RUFBQSxDQUFBLEVBQUcsU0FBQTtXQUNELElBQUMsQ0FBQSxPQUFELEdBQVcsV0FBQSxDQUFZLElBQUMsQ0FBQSxNQUFNLENBQUMsSUFBUixDQUFhLElBQWIsQ0FBWixFQUE2QixHQUE3QjtFQURWLENBQUg7RUFHQSxDQUFBLEVBQ0U7SUFBQSxNQUFBLEVBQVEsS0FBUjtJQUNBLE9BQUEsRUFBUyxDQURUO0dBSkY7RUFPQSxJQUFBLEVBQU0sU0FBQyxFQUFELEVBQUssTUFBTCxFQUFtQixHQUFuQjs7TUFBSyxTQUFPOzs7TUFBTyxNQUFJOztJQUUzQixJQUFHLENBQUEsQ0FBQSxFQUFBLFlBQWtCLE1BQWxCLENBQUg7TUFDRSxFQUFBLEdBQUssQ0FBQSxDQUFFLEVBQUYsRUFEUDs7SUFHQSxJQUFHLE1BQUEsS0FBWSxLQUFmO01BQ0UsRUFBRSxDQUFDLFdBQUgsQ0FBZSxNQUFmLEVBREY7O0lBR0EsSUFBRyxHQUFBLEtBQVMsS0FBWjtNQUNFLEVBQUUsQ0FBQyxRQUFILENBQVksR0FBWixFQURGOztBQUdBLFdBQU87RUFYSCxDQVBOO0VBb0JBLEdBQUEsRUFBSyxTQUFDLEVBQUQsRUFBSyxDQUFMOztNQUFLLElBQUU7O0lBRVYsSUFBRyxDQUFDLENBQUMsTUFBRixJQUFhLENBQUMsQ0FBQyxPQUFGLEdBQVksQ0FBNUI7TUFFRSxJQUFDLENBQUEsSUFBRCxDQUFNLEVBQU4sRUFBVSxLQUFWLEVBQWlCLFFBQWpCO01BQ0EsVUFBQSxDQUFXLENBQUEsU0FBQSxLQUFBO2VBQUEsU0FBQTtVQUNULEtBQUMsQ0FBQSxJQUFELENBQU0sRUFBTixFQUFVLFFBQVYsRUFBb0IsS0FBcEI7aUJBQ0EsS0FBQyxDQUFBLElBQUQsQ0FBTSxFQUFOLEVBQVUsSUFB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QUMsT0FBTixDQUFjLENBQUEsQ0FBRSxJQUFGLENBQU8sQ0FBQyxJQUFSLENBQWEsTUFBYixDQUFkO0FBQ0EsV0FBTztFQUZJLENBWGI7RUFlQSxPQUFBLEVBQVMsU0FBQyxPQUFEO1dBQ1AsVUFBQSxDQUFXLFNBQUE7TUFDVCxDQUFBLENBQUUsWUFBRixDQUFlLENBQUMsUUFBaEIsQ0FBeUIsR0FBQSxHQUFJLE9BQTdCLEVBQ0U7UUFBQSxRQUFBLEVBQVUsR0FBVjtRQUNBLE1BQUEsRUFBUSxLQUFLLENBQUMsTUFEZDtPQURGO2FBR0EsUUFBUSxDQUFDLElBQVQsR0FBZ0I7SUFKUCxDQUFYLEVBS0UsR0FMRjtFQURPLENBZlQiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXyA9XG5cbiAgaTogLT5cbiAgICBAY29uc29sZSA9IHNldEludGVydmFsKEBkZXRlY3QuYmluZChAKSwgMjAwKVxuXG4gIHA6XG4gICAgb2ZmaW5nOiBmYWxzZVxuICAgIG9mZnRpbWU6IDBcblxuICB0dXJuOiAoZWwsIHJlbW92ZT1mYWxzZSwgYWRkPWZhbHNlKSAtPlxuXG4gICAgaWYgZWwgbm90IGluc3RhbmNlb2YgalF1ZXJ5XG4gICAgICBlbCA9ICQoZWwpXG5cbiAgICBpZiByZW1vdmUgaXNudCBmYWxzZVxuICAgICAgZWwucmVtb3ZlQ2xhc3MocmVtb3ZlKVxuXG4gICAgaWYgYWRkIGlzbnQgZmFsc2VcbiAgICAgIGVsLmFkZENsYXNzKGFkZClcblxuICAgIHJldHVybiB0cnVlXG5cbiAgb2ZmOiAoZWwsIHA9e30pIC0+XG5cbiAgICBpZiBwLm9mZmluZyBhbmQgcC5vZmZ0aW1lID4gMFxuXG4gICAgICBAdHVybiBlbCwgZmFsc2UsICdvZmZpbmcnXG4gICAgICBzZXRUaW1lb3V0ID0+XG4gICAgICAgIEB0dXJuIGVsLCAnb2ZmaW5nJywgZmFsc2VcbiAgICAgICAgQHR1cm4gZWwsICdvbicsICdvZmYnXG4gICAgICAsIHAub2ZmdGltZSoxMDAwICsgMTAwXG5cbiAgICBlbHNlXG4gICAgICBAdHVybiBlbCwgJ29uJywgJ29mZidcblxuICAgIHJldHVyblxuXG4gIG9uOiAoZWwsIHApIC0+XG4gICAgQHR1cm4gZWwsICdvZmYnLCAnb24nXG5cbiAgc3dhcDogKGVsLCBwKSAtPlxuXG4gICAgaWYgZWwgbm90IGluc3RhbmNlb2YgalF1ZXJ5XG4gICAgICBlbCA9ICQoZWwpXG5cbiAgICBpZiBlbC5oYXNDbGFzcyAnb2ZmJ1xuICAgICAgQG9uIGVsLCBwXG4gICAgZWxzZVxuICAgICAgQG9mZiBlbCwgcFxuXG4gICAgcmV0dXJuXG5cbiAgZW5jb2RlOiAoc3RyKSAtPlxuICAgIHJldHVybiBlbmNvZGVVUklDb21wb25lbnQoc3RyKVxuICAgICAgLnJlcGxhY2UoLyEvZywgJyUyMScpXG4gICAgICAucmVwbGFjZSgvJy9nLCAnJTI3JylcbiAgICAgIC5yZXBsYWNlKC9cXCgvZywgJyUyOCcpXG4gICAgICAucmVwbGFjZSgvXFwpL2csICclMjknKVxuICAgICAgLnJlcGxhY2UoL1xcKi9nLCAnJTJBJylcbiAgICAgIC5yZXBsYWNlKC8lMjAvZywgJysnKVxuXG4gIHQ6IChjYXRlZ29yeSwgYWN0aW9uLCBsYWJlbCwgdmFsdWUpIC0+XG4gICAgX2dhcS5wdXNoIFsnX3RyYWNrRXZlbnQnLCBjYXRlZ29yeSwgYWN0aW9uLCBsYWJlbCwgdmFsdWVdXG5cbiAgcmFuZDogKG1pbiwgbWF4KSAtPlxuICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBtYXgpICsgbWluXG5cbiAgZml0OiAoc3JjV2lkdGgsIHNyY0hlaWdodCwgbWF4V2lkdGgsIG1heEhlaWdodCkgLT5cbiAgICByYXRpbyA9IE1hdGgubWluKG1heFdpZHRoIC8gc3JjV2lkdGgsIG1heEhlaWdodCAvIHNyY0hlaWdodClcbiAgICB3aWR0aDogc3JjV2lkdGgqcmF0aW8sIGhlaWdodDogc3JjSGVpZ2h0KnJhdGlvXG5cbiAgaGV4MnJnYjogKGhleCkgLT5cbiAgICByZXN1bHQgPSAvXiM/KFthLWZcXGRdezJ9KShbYS1mXFxkXXsyfSkoW2EtZlxcZF17Mn0pJC9pLmV4ZWMoaGV4KVxuICAgIHI6IHBhcnNlSW50KHJlc3VsdFsxXSwgMTYpLFxuICAgIGc6IHBhcnNlSW50KHJlc3VsdFsyXSwgMTYpLFxuICAgIGI6IHBhcnNlSW50KHJlc3VsdFszXSwgMTYpXG4gXG4gIG9iamM6IChvYmopIC0+XG4gICAgKGsgZm9yIG93biBrIG9mIG9iaikubGVuZ3RoXG5cbiAgbG9hZDogKHNjcmlwdCwgaW5pdGlhdGUsIGNvbXBsZXRlKSAtPlxuXG4gICAgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50ICdzY3JpcHQnXG4gICAgZWwudHlwZSA9ICd0ZXh0L2phdmFzY3JpcHQnXG4gICAgZWwuc3JjID0gc2NyaXB0XG4gICAgZWwuYWRkRXZlbnRMaXN0ZW5lciAnbG9hZCcgLCAoZSkgLT5cbiAgICAgIGNvbXBsZXRlKCkgaWYgdHlwZW9mIGNvbXBsZXRlIGlzICdmdW5jdGlvbidcbiAgICAgIHdpbmRvd1tpbml0aWF0ZV0uaSgpIGlmIGluaXRpYXRlIGlzbnQgdW5kZWZpbmVkIGFuZCBpbml0aWF0ZSBpc250IGZhbHNlXG4gICAgLCBmYWxzZVxuXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChlbClcblxuICBqaW5pdDogLT5cbiAgICAkLmFqYXhTZXR1cFxuICAgICAgZGF0YVR5cGU6IFwianNvblwiXG5cbiAgcGF0Y2g6ICh1cmwsIGRhdGEpIC0+XG5cbiAgICBAamluaXQoKVxuXG4gICAganBhdGNoID0gJC5hamF4XG4gICAgICB1cmw6IHVybFxuICAgICAgZGF0YTogZGF0YVxuICAgICAgdHlwZTogJ1BBVENIJ1xuXG4gICAganBhdGNoLmZhaWwgKHJlc3BvbnNlKSAtPlxuICAgICAgQGZhaWwocmVzcG9uc2UpXG5cbiAgICByZXR1cm4ganBhdGNoXG5cbiAgZ2V0OiAoYXJncy4uLikgLT5cblxuICAgIEBqaW5pdCgpXG5cbiAgICBqZ2V0ID0gJC5nZXQgYXJncy4uLlxuXG4gICAgamdldC5mYWlsIChyZXNwb25zZSkgPT5cbiAgICAgIEBmYWlsKHJlc3BvbnNlKVxuICAgICAgamdldC5mYWlsKHJlc3BvbnNlKVxuXG4gICAgcmV0dXJuIGpnZXRcblxuICBwb3N0OiAoYXJncy4uLikgLT5cblxuICAgIGpwb3N0ID0gJC5wb3N0IGFyZ3MuLi5cblxuICAgIGpwb3N0LmZhaWwgKHJlc3BvbnNlKSA9PlxuICAgICAgQGZhaWwocmVzcG9uc2UpXG4gICAgICBqcG9zdC5mYWlsKHJlc3BvbnNlKVxuXG4gICAgcmV0dXJuIGpwb3N0XG5cbiAgZmFpbDogKHJlc3BvbnNlKSAtPlxuXG4gICAgZXJyb3IgPSByZXNwb25zZS5yZXNwb25zZUpTT04/LmVycm9ycz9bMF1cbiAgICBpZiBlcnJvciBpcyB1bmRlZmluZWRcbiAgICAgIHJldHVybiBQcm9tcHQuaSByZXNwb25zZS5zdGF0dXMsIHJlc3BvbnNlLnN0YXR1c1RleHRcblxuICAgIHB1ZyA9IGVycm9yLm1lc3NhZ2UubWF0Y2ggL1B1ZyBFcnJvcjogKC4qPyk6KFswLTldKykvXG4gICAgaWYgcHVnIGlzbnQgbnVsbFxuICAgICAgZXJyb3IubWVzc2FnZSA9IGVycm9yLm1lc3NhZ2UucmVwbGFjZSAvUHVnIEVycm9yOiAoLio/KTooWzAtOV0rKS8sICcnXG4gICAgICBlcnJvci5maWxlID0gcHVnWzFdXG4gICAgICBlcnJvci5saW5lID0gcHVnWzJdXG5cbiAgICBmaWxlID0gQGVuY29kZSBcIiN7ZXJyb3IuZmlsZX1cIlxuXG4gICAgc3dpdGNoIGNvbmZpZy5hcHAuZWRpdG9yXG4gICAgICB3aGVuICdtYWN2aW0nIHRoZW4gZWRpdG9yID0gJ212aW06Ly9vcGVuP3VybD1maWxlOi8vJ1xuICAgICAgd2hlbiAnc3VibGltZScgdGhlbiBlZGl0b3IgPSAnc3VibDovL29wZW4/dXJsPWZpbGU6Ly8nXG4gICAgICB3aGVuICdlbWFjcycgdGhlbiBlZGl0b3IgPSAnZW1hY3M6Ly9vcGVuP3VybD1maWxlOi8vJ1xuICAgICAgd2hlbiAndGV4dG1hdGUnIHRoZW4gZWRpdG9yID0gJ3RleHRtYXRlOi8vb3Blbi8/dXJsPWZpbGU6Ly8nXG4gICAgICB3aGVuICdwaHBzdG9ybScgdGhlbiBlZGl0b3IgPSAncGhwc3Rvcm06Ly9vcGVuP2ZpbGU9J1xuXG4gICAgaWYgZXJyb3IuZmlsZSBpc250IG51bGxcbiAgICAgIGJvZHkgPSBcIlwiXCJcbiAgICAgICAgPHByZT4je2Vycm9yLm1lc3NhZ2V9PC9wcmU+XG4gICAgICAgIDxhIGhyZWY9XCIje2VkaXRvcn0je2ZpbGV9JmxpbmU9I3tlcnJvci5saW5lfVwiPjxiPiN7ZXJyb3IuZmlsZX06I3tlcnJvci5saW5lfTwvYj48L2E+XG4gICAgICBcIlwiXCJcbiAgICBlbHNlXG4gICAgICBib2R5ID0gZXJyb3IubWVzc2FnZVxuXG4gICAgUHJvbXB0LmkgZXJyb3IudHlwZSwgYm9keSwgWydPSyddXG5cbiAgbWV0aG9kczogKG9iaikgLT5cbiAgICByZXMgPSBbXVxuICAgIGZvciBpLG0gb2Ygb2JqXG4gICAgICBpZiB0eXBlb2YgbSBpcyAnZnVuY3Rpb24nXG4gICAgICAgIHJlcy5wdXNoIG1cbiAgICByZXR1cm4gcmVzXG5cbiAgbGxjOiAtPlxuICAgIGFzY2lpID0gXCJcIlwiXG5cbiAgICAgICVjbW1tLy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4vbW1tXG4gICAgICBtbW8uLi4uLi4uLi4uLi4uLi4uLTo6Ly86Oi0uLi4uLi4uLTo6Ojo6Ojo6Ojo6OjotLi4uLi4uLi4tOjovLy86LS5vbW1cbiAgICAgIG1kLS4uLi4uLi4uLi4uLi46K3loZGRkZGRkaHkrLS4uLi4vZGRkZGRkZGRkZGRkZCsuLi4uLi4vc2hkZGRkZGRkeW9kbVxuICAgICAgbW8uLi4uLi4uLi4uLi4uLWhtbW1oeXl5eWRtbW1oOi4uLi9tbW1taGhoaGhoaGhoKy4uLi46eWRtbWRoeXl5aGRkb29tXG4gICAgICBtLS4uLi4uLi4uLi4uLi4uLXNzOi0uLi4uLXltbW15Li4uL21tbW0tLS0tLS0tLS0uLi4uOmRtbW1zOi0uLi4tOi8uLW1cbiAgICAgIGQuLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4ueW1tbXkuLi4vbW1tbS0vK29vbys6LS4uLi55bW1teS06K29vbysvLS4uZFxuICAgICAgaC4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uOnNtbW1kOi4uLi9tbW1taG1tbW1tbWRoKy4uLmRtbW1zaGRtbW1tbW1ocy1oXG4gICAgICBoLi4uLi4uLi4uLi4uLi4uLi4uLi4uOnNkbW1keTouLi4uOmhoZGhvKy8vK3ltbW1tKy4uZG1tbWR5by8vK3NkbW1taGhcbiAgICAgIGQuLi4uLi4uLi4uLi4uLi4uLi4tK3lkbW1keS8uLi4uLi4uLS06Li4uLi4uLnNtbW1oLi55bW1tcy4uLi4uLjptbW1tbVxuICAgICAgbS0uLi4uLi4uLi4uLi4uLi06c2htbW1kcy8tLS0tLS4uLi46cy8tLS4uLi06aG1tbXMuLjpkbW1kLy0uLi4tb21tbW1tXG4gICAgICBtby4uLi4uLi4uLi4uLi4uaG1tbW1tbWhoaGhoaGhoLi4uK2RtbWRoeXl5aGRtbW15LS4uLi9obW1taHl5eWhtbW1kaG1cbiAgICAgIG1kLS4uLi4uLi4uLi4uLi5kZGRkZGRkZGRkZGRkZGQuLi4tK3NoZGRkZGRkZGh5Ly0uLi4uLi1veWRkZGRkZGRobzpkbVxuICAgICAgbW1vLi4uLi4uLi4uLi4uLjo6Ojo6Ojo6Ojo6Ojo6Oi4uLi4uLi4tOi8vLzo6LS4uLi4uLi4uLi4uLTovLy86LS4ub21tXG4gICAgICBtbW0vLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi9tbW1cblxuICAgICAgOjogc3ludGFjdGljIHN1Z2FyIGJ5IDI1NlxuICAgICAgOjogaHR0cDovLzI1Ni5pby9cbiAgICAgIDo6ICN7Y29uZmlnLm1ldGEucmVwb31cbiAgICBcIlwiXCJcbiAgICBjb25zb2xlLmxvZyBhc2NpaSwgXCJjb2xvcjogZ3JleTsgZm9udC1mYW1pbHk6IE1lbmxvLCBtb25vc3BhY2U7XCJcblxuICBkZXRlY3Q6IC0+XG4gICAgaWYgKCgod2luZG93Lm91dGVySGVpZ2h0IC0gd2luZG93LmlubmVySGVpZ2h0KSA+IDEwMCkgfHwgKCh3aW5kb3cub3V0ZXJXaWR0aCAtIHdpbmRvdy5pbm5lcldpZHRoKSA+IDEwMCkpXG4gICAgICBAbGxjKClcbiAgICAgIGNsZWFySW50ZXJ2YWwgQGNvbnNvbGVcblxuXy5pKClcbiIsImNvbmZpZyA9IHtcImNvbG9yXCI6e1wid2hpdGUxXCI6XCIjZmZmZmZmXCIsXCJibGFjazFcIjpcIiMwMDAwMDBcIixcImJsYWNrMlwiOlwiIzE5MTkxOVwiLFwiYnJvd24xXCI6XCIjQzI5RTZFXCIsXCJicm93bjJcIjpcIiNBQTgwNTJcIixcImJyb3duM1wiOlwiIzg3NjAzN1wiLFwiYmVpZ2UxXCI6XCIjQzdCQUEyXCIsXCJiZWlnZTJcIjpcIiNFNUUzREJcIn0sXCJmb250XCI6e1wiaDFcIjp7XCJmb250LWZhbWlseVwiOlwib2N0YXZpYW4gcmVndWxhclwiLFwiZm9udC1zaXplXCI6XCIyMnB4XCJ9LFwiaDJcIjp7XCJmb250LWZhbWlseVwiOlwic2VyaWFsIHJlZ3VsYXJcIixcImZvbnQtc2l6ZVwiOlwiNTVweFwifSxcImNvcHkxXCI6e1wiZm9udC1mYW1pbHlcIjpcImluZGVwZW5kZW5jZSByZWd1bGFyXCIsXCJmb250LXNpemVcIjpcIjI5cHhcIn0sXCJjb3B5MlwiOntcImZvbnQtZmFtaWx5XCI6XCJHYXJhbW9uZFwiLFwiZm9udC1zaXplXCI6XCIxMTZweFwifX0sXCJtZXRhXCI6e1widXJsXCI6XCJodHRwOi8vbG9va2luZ2dsYXNzdnIuY29tL1wiLFwidGl0bGVcIjpcIkxvb2tpbmcgR2xhc3MgVlJcIixcImRlc2NyaXB0aW9uXCI6XCJXaW5kb3dzIHRvIHRoZSBwYXN0IGFyZSBvcGVuIGF0IGxhc3RcIixcImtleXdvcmRzXCI6XCJWUiwgVlIgYXBwLCBsb29raW5nIGdsYXNzXCIsXCJ0cmFja2luZ19pZFwiOlwiVUEtODkzMDA4MjItMVwiLFwic2hhcmVcIjpcImltYWdlcy9zaGFyZS5qcGdcIixcInJlcG9cIjpcImh0dHBzOi8vZ2l0aHViLmNvbS9sb29raW5nZ2xhc3N2ci9sb29raW5nZ2xhc3NcIixcInNvY2lhbFwiOntcImZhY2Vib29rXCI6XCJodHRwczovL3d3dy5mYWNlYm9vay5jb20vTG9va2luZy1HbGFzcy1WUi0xNzgyOTQyNTkyODQyOTYvXCIsXCJ0d2l0dGVyXCI6XCJodHRwczovL3R3aXR0ZXIuY29tL3N0ZXJlb3ZpZXdzXCIsXCJpbnN0YWdyYW1cIjpcImh0dHBzOi8vaW5zdGFncmFtLmNvbS9sb29raW5nZ2xhc3N2clwifX0sXCJjb3B5XCI6e1wiY29sbGVjdGlvblwiOntcInRpdGxlXCI6XCJ0aGUgY29sbGVjdGlvblwiLFwiZmlyc3RcIjpcIlRcIixcImNvcHlcIjpcImhlIHN0ZXJlby1waG90b3MgeW91IHNlZSBpbiBMb29raW5nIEdsYXNzIFZSIGFyZSBzZWxlY3RlZCBleGNlcnB0cyBmcm9tIHRoZSA8YSB0YXJnZXQ9XFxcIl9ibGFua1xcXCIgaHJlZj1cXFwiaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvS2V5c3RvbmVfVmlld19Db21wYW55XFxcIj5LZXlzdG9uZSBWaWV3IENvbXBhbnk8L2E+4oCZcyA8YSB0YXJnZXQ9XFxcIl9ibGFua1xcXCIgaHJlZj1cXFwiaHR0cDovL3d3dy5saWIudXRleGFzLmVkdS90YXJvL3V0Y2FoLzAyMTgyL2NhaC0wMjE4Mi5odG1sXFxcIj7igJhUb3VyIG9mIHRoZSBXb3JsZOKAmTwvYT4sIGEgdGlueSBnbGltcHNlIG9mIEtleXN0b25l4oCZcyBpbnRlcm5hdGlvbmFsbHkgdGhlbWVkIHN0ZXJlbyBwaG90b2dyYXBoeSBjb2xsZWN0aW9uLiBGcm9tIDE4OTIgdG8gMTkzMywgb3ZlciAzMDAsMDAwIHN1Y2ggY2FyZHMgd2VyZSBwcm9kdWNlZC4gSW4gMTk3OCwgdGhlIGNvbXBhbnkncyByZWNvcmRzIGFuZCBpbnZlbnRvcnkgb2YgbmVnYXRpdmVzIHdlcmUgZG9uYXRlZCB0byB0aGUgPGEgdGFyZ2V0PVxcXCJfYmxhbmtcXFwiIGhyZWY9XFxcImh0dHA6Ly9hcnRzYmxvY2sudWNyLmVkdS9QYWdlL2NhbGlmb3JuaWEtbXVzZXVtLW9mLXBob3RvZ3JhcGh5XFxcIj5VQ1IvQ2FsaWZvcm5pYSBNdXNldW0gb2YgUGhvdG9ncmFwaHkgYXQgdGhlIFVuaXZlcnNpdHkgb2YgQ2FsaWZvcm5pYSBSaXZlcnNpZGU8L2E+LCB3aGVyZSB0aGV5IGFyZSBub3cga25vd24gYXMgdGhlIDxhIHRhcmdldD1cXFwiX2JsYW5rXFxcIiBocmVmPVxcXCJodHRwOi8vd3d3Lm9hYy5jZGxpYi5vcmcvZmluZGFpZC9hcms6LzEzMDMwL2Z0MXEybjk5OW0vXFxcIj5LZXlzdG9uZS1NYXN0IGNvbGxlY3Rpb248L2E+LlwifSxcImNyZWRpdHNcIjp7XCJ0aXRsZVwiOlwiY3JlZGl0cyBhbmQgdGhhbmtzXCIsXCJmaXJzdFwiOlwiQVwiLFwiY29weVwiOlwiZGRpdGlvbmFsIGhhbmQgbGV0dGVyaW5nIGJ5IDxhIHRhcmdldD1cXFwiX2JsYW5rXFxcIiBocmVmPVxcXCJodHRwOi8vd3d3LnRvYmlhc3NhdWwuZGUvXFxcIj5Ub2JpYXMgU2F1bDwvYT4gYW5kIGlsbHVzdHJhdGlvbiBieSA8YSB0YXJnZXQ9XFxcIl9ibGFua1xcXCIgaHJlZj1cXFwiaHR0cDovL3d3dy53ZWVtc2lsbHVzdHJhdGlvbi5jb20vXFxcIj5NYXR0IFdlZW1zPC9hPi4gV2ViIGRlc2lnbiBieSA8YSB0YXJnZXQ9XFxcIl9ibGFua1xcXCIgaHJlZj1cXFwiaHR0cDovL3d3dy5tYWhlcnNpbmphcnkuY29tL1xcXCI+TWFoZXIgU2luamFyeTwvYT4uIFdlYnNpdGUgYnkgPGEgdGFyZ2V0PVxcXCJfYmxhbmtcXFwiIGhyZWY9XFxcImh0dHA6Ly8yNTYuaW8vXFxcIj5LZXZpbiBPbHNvbjwvYT4uIFByb3RvdHlwZWQgd2l0aCB0aGUgaGVscCBvZiA8YSB0YXJnZXQ9XFxcIl9ibGFua1xcXCIgaHJlZj1cXFwiaHR0cDovL3N1emFuaW1hdG9yLmNvbS9cXFwiPlN1emFubmUgTGVpYnJpY2s8L2E+LiBTb3VuZCBlZmZlY3RzIHVzZWQgZnJvbSA8YSB0YXJnZXQ9XFxcIl9ibGFua1xcXCIgaHJlZj1cXFwiaHR0cDovL2ZyZWVzb3VuZC5vcmdcXFwiPmZyZWVzb3VuZC5vcmc8L2E+LiAoPGEgdGFyZ2V0PVxcXCJfYmxhbmtcXFwiIGhyZWY9XFxcImh0dHBzOi8vd3d3LmZyZWVzb3VuZC5vcmcvcGVvcGxlL1JvYmluaG9vZDc2L3NvdW5kcy8xMjUzMTUvXFxcIj5BPC9hPiA8YSB0YXJnZXQ9XFxcIl9ibGFua1xcXCIgaHJlZj1cXFwiaHR0cDovL2ZyZWVzb3VuZC5vcmcvcGVvcGxlL0luc3BlY3Rvckovc291bmRzLzM0MzEzMC9cXFwiPkI8L2E+IDxhIHRhcmdldD1cXFwiX2JsYW5rXFxcIiBocmVmPVxcXCJodHRwOi8vZnJlZXNvdW5kLm9yZy9wZW9wbGUvTmlnaHRWb2ljZS9zb3VuZHMvMjM0MjY4L1xcXCI+QzwvYT4gPGEgdGFyZ2V0PVxcXCJfYmxhbmtcXFwiIGhyZWY9XFxcImh0dHA6Ly9mcmVlc291bmQub3JnL3Blb3BsZS9rd2FobWFoXzAyL3NvdW5kcy8yNjQwOTYvXFxcIj5EPC9hPiA8YSB0YXJnZXQ9XFxcIl9ibGFua1xcXCIgaHJlZj1cXFwiaHR0cDovL2ZyZWVzb3VuZC5vcmcvcGVvcGxlL25zc3R1ZGlvcy9zb3VuZHMvMzIxMTE0L1xcXCI+RTwvYT4gPGEgdGFyZ2V0PVxcXCJfYmxhbmtcXFwiIGhyZWY9XFxcImh0dHA6Ly9mcmVlc291bmQub3JnL3Blb3BsZS9mNG5neS9zb3VuZHMvMjQwNzc2L1xcXCI+RjwvYT4gPGEgdGFyZ2V0PVxcXCJfYmxhbmtcXFwiIGhyZWY9XFxcImh0dHA6Ly9mcmVlc291bmQub3JnL3Blb3BsZS9NckF1cmFsaXphdGlvbi9zb3VuZHMvMTg0NTY3L1xcXCI+RzwvYT4gPGEgdGFyZ2V0PVxcXCJfYmxhbmtcXFwiIGhyZWY9XFxcImh0dHA6Ly9mcmVlc291bmQub3JnL3Blb3BsZS9TdW5ueVNpZGVTb3VuZC9zb3VuZHMvNjc3OTEvXFxcIj5IPC9hPikgV2l0aCBtdXNpYyBmcm9tIHRoZSA8YSB0YXJnZXQ9XFxcIl9ibGFua1xcXCIgaHJlZj1cXFwiaHR0cDovL29wZW5tdXNpY2FyY2hpdmUub3JnL2Jyb3dzZV90YWcucGhwP3RhZz0xOTIwc1xcXCI+T3BlbiBNdXNpYyBBcmNoaXZlPC9hPi5cIixcImF1dGhvcnNcIjp7XCJ0aXRsZVwiOlwiTG9va2luZyBHbGFzcyBWUiB3YXNcIixcImpvZWJcIjpcImNyZWF0ZWQgYnkgPGJyIC8+PGEgdGFyZ2V0PVxcXCJfYmxhbmtcXFwiIGhyZWY9XFxcImh0dHA6Ly9qb2Vib3lsZS5jb21cXFwiPkpvZSBCb3lsZTwvYT5cIixcImtldmluY1wiOlwid2l0aCAzRCBhcnQgYnkgPGJyIC8+PGEgdGFyZ2V0PVxcXCJfYmxhbmtcXFwiIGhyZWY9XFxcImh0dHA6Ly93d3cua2V2aW5jYXN0YW5lZGEuY29tL1xcXCI+S2V2aW4gQ2FzdGFuZWRhPC9hPlwiLFwia2V2aW5vXCI6XCJhbmQgd2ViIGRldiBieSA8YnIgLz48YSB0YXJnZXQ9XFxcIl9ibGFua1xcXCIgaHJlZj1cXFwiaHR0cHM6Ly8yNTYuaW9cXFwiPktldmluIE9sc29uPC9hPlwifX0sXCJmb290ZXJcIjp7XCJjb3B5cmlnaHRcIjpcIkNvcHlyaWdodCAmY29weTsgMjAxNiBMb29raW5nIEdsYXNzIC0gQWxsIFJpZ2h0cyBSZXNlcnZlZFwifSxcImhpc3RvcnlcIjp7XCJ0aXRsZVwiOlwiaGlzdG9yeSBvZiBzdGVyZW9zY29weVwiLFwiY29weTFcIjpcIuKAnEl0IGlzIGEgZGVsaWdodGZ1bCBjaGFyYWN0ZXJpc3RpYyBvZiB0aGVzZSB0aW1lcywgdGhhdCBuZXcgYW5kIGNoZWFwIG1lYW5zIGFyZSBjb250aW51b3VzbHkgYmVpbmcgZGV2aXNlZCwgZm9yIGNvbnZleWluZyB0aGUgcmVzdWx0cyBvZiBhIGNhc3VhbCBleHBlcmllbmNlIHRvIHRob3NlIHdobyBhcmUgdW5hYmxlIHRvIG9idGFpbiBzdWNoIGV4cGVyaWVuY2VzIGZvciB0aGVtc2VsdmVzOyBhbmQgdG8gYnJpbmcgdGhlbSB3aXRoaW4gdGhlIHJlYWNoIG9mIHRoZSBwZW9wbGUu4oCdIOKAlENoYXJsZXMgRGlja2Vuc1wiLFwiZmlyc3RcIjpcIkVcIixcImNvcHkyXCI6XCJ2ZW4gYW1vbmdzdCB2aXJ0dWFsIHJlYWxpdHkgZW50aHVzaWFzdHMsIG1vc3QgcGVvcGxlIGRvbuKAmXQgcmVhbGl6ZSB0aGF0IHRoZSBmaXJzdCAzRCB2aWV3ZXIgd2FzIGRldmVsb3BlZCBpbiAxODM4IGJ5IDxhIHRhcmdldD1cXFwiX2JsYW5rXFxcIiBocmVmPVxcXCJodHRwOi8vd3d3LnN0ZXJlb3Njb3B5LmNvbS9mYXEvd2hlYXRzdG9uZS5odG1sXFxcIj5DaGFybGVzIFdoZWF0c3RvbmU8L2E+IC0gYWxtb3N0IDE4MCB5ZWFycyBhZ28hIFNpbmNlIGJlZm9yZSB0aGUgcG9wdWxhcml6YXRpb24gb2YgdGVsZXZpc2lvbiwgcmFkaW8sIGNpbmVtYSwgb3IgdmlydHVhbCByZWFsaXR5LCBwZW9wbGUgaGF2ZSBiZWVuIGV4cGxvcmluZyB0aGUgd29ybGQgdGhyb3VnaCBpbW1lcnNpdmUgc3RlcmVvIDNEIGltYWdlcy4gU2luY2UgdGhlIGludmVudGlvbiBvZiB0aGUgc3RlcmVvc2NvcGUsIHVwIHRocm91Z2ggdGhlIG1pZCAyMHRoIGNlbnR1cnksIGh1bmRyZWRzIG9mIHRob3VzYW5kcyBvZiBzdGVyZW9ncmFwaGljIHBob3RvcyBjYXJkcyB3ZXJlIHByb2R1Y2VkIGFuZCBkaXN0cmlidXRlZCBhbGwgb3ZlciB0aGUgd29ybGQuIFRob3VnaCBuZWFybHkgZm9yZ290dGVuLCB0aGVzZSBwaG90byBjYXJkcyBjYW4gYWdhaW4gYmUgdmlld2VkIGFzIGludGVuZGVkLCB0aGFua3MgdG8gdGhlIGFkdmVudCBvZiBtb2JpbGUgVlIuXCJ9LFwiaG93dG9cIjp7XCJ0aXRsZVwiOlwiaG93IHRvIHVzZSBsb29raW5nIGdsYXNzIHZyXCIsXCJpbnN0cnVjdGlvbnNcIjpbXCJNYWtlIHN1cmUgeW91IGhhdmUgYSA8YSB0YXJnZXQ9XFxcIl9ibGFua1xcXCIgaHJlZj1cXFwiaHR0cHM6Ly92ci5nb29nbGUuY29tL2NhcmRib2FyZC9nZXQtY2FyZGJvYXJkL1xcXCI+R29vZ2xlIENhcmRib2FyZCBoZWFkc2V0PC9hPi4gKE9uZSB3aXRoIGEgdHJpZ2dlciEpXCIsXCJJbnN0YWxsIDxhIHRhcmdldD1cXFwiX2JsYW5rXFxcIiBocmVmPVxcXCJodHRwczovL3BsYXkuZ29vZ2xlLmNvbS9zdG9yZS9hcHBzL2RldGFpbHM/aWQ9cGhvdG9zLnN0ZXJlb2dyYXBoaWMuY2FyZGJvYXJkXFxcIj5Mb29raW5nIEdsYXNzIFZSPC9hPiBmcm9tIHRoZSBHb29nbGUgUGxheSBTdG9yZS5cIixcIlR1cm4gb24geW91ciBXaUZpICYgbGF1bmNoIHRoZSBhcHBsaWNhdGlvbi5cIixcIkNsaWNrIHlvdXIgdHJpZ2dlciBvbiB0aGUgc3RlcmVvc2NvcGUgdG8gZ2V0IHN0YXJ0ZWQuXCIsXCJBZGRpdGlvbmFsbHksIHlvdSBjYW4gPGEgaHJlZj1cXFwiaHR0cDovL3lvdXR1LmJlL1hUYzV6Mm5ianNJXFxcIiB0YXJnZXQ9XFxcIl9ibGFua1xcXCI+d2F0Y2ggdGhpcyBoZWxwZnVsIHR1dG9yaWFsIHZpZGVvPC9hPiB3aGljaCBjb3ZlcnMgdGhlIGJhc2ljcyBvZiBpbnN0YWxsYXRpb24gYW5kIHVzaW5nIExvb2tpbmcgR2xhc3MgVlIuXCJdLFwiZXh0cmFcIjpcIklmIHlvdXIgQ2FyZGJvYXJkIGRldmljZSBkb2VzIG5vdCBoYXZlIGEgdHJpZ2dlciwgeW91IGNhbiB1c2UgYSA8YSB0YXJnZXQ9XFxcIl9ibGFua1xcXCIgaHJlZj1cXFwiaHR0cHM6Ly93d3cuYW1hem9uLmNvbS9TdGVlbFNlcmllcy1TdHJhdHVzLUJsdWV0b290aC1XaXJlbGVzcy1Db250cm9sbGVyL2RwL0IwMTVXS1kzSU0vcmVmPXNyXzFfMVxcXCI+Ymx1ZXRvb3RoIGNvbnRyb2xsZXI8L2E+IHRvIGludGVyYWN0IHdpdGggdGhlIGFwcGxpY2F0aW9uLlwifSxcImludHJvXCI6e1wiZmlyc3RcIjpcIldcIixcImNvcHlcIjpcImVsY29tZSB0byBMb29raW5nIEdsYXNzIFZSLiBMb29raW5nIEdsYXNzIFZSIGlzIGEgbW9iaWxlIGFwcGxpY2F0aW9uIGZvciA8YSB0YXJnZXQ9XFxcIl9ibGFua1xcXCIgaHJlZj1cXFwiaHR0cHM6Ly92ci5nb29nbGUuY29tL2NhcmRib2FyZC9cXFwiPkdvb2dsZSBDYXJkYm9hcmQ8L2E+IHdoaWNoIGJyaW5ncyBoaXN0b3JpYyBzdGVyZW9ncmFwaGljIDNEIHBob3RvcyBmcm9tIHllc3RlcnllYXIgaW50byBmb2N1cy4gWW91IGNhbiBmaW5kIDxhIHRhcmdldD1cXFwiX2JsYW5rXFxcIiBocmVmPVxcXCJodHRwczovL3BsYXkuZ29vZ2xlLmNvbS9zdG9yZS9hcHBzL2RldGFpbHM/aWQ9cGhvdG9zLnN0ZXJlb2dyYXBoaWMuY2FyZGJvYXJkXFxcIj5Mb29raW5nIEdsYXNzIFZSIGluIHRoZSBHb29nbGUgUGxheSBTdG9yZTwvYT4sIGJ1dCB0byBnZXQgdGhlIDNEIGVmZmVjdCAgeW91IHdpbGwgbmVlZCB0byA8YSB0YXJnZXQ9XFxcIl9ibGFua1xcXCIgaHJlZj1cXFwiaHR0cHM6Ly92ci5nb29nbGUuY29tL2NhcmRib2FyZC9nZXQtY2FyZGJvYXJkL1xcXCI+Z2V0IGEgR29vZ2xlIENhcmRib2FyZCBWUiBkZXZpY2U8L2E+LiAoQmUgc3VyZSB0byBnZXQgb25lIHdpdGggYSB0cmlnZ2VyISlcIn19fTsiLCJcbkRlbGF5ID1cbiAgdG9wOiAyMDBcbiAgd2luOiBmYWxzZVxuICBzdHVjazogZmFsc2VcblxuICBpOiAtPlxuXG4gICAgQHdpbiA9ICQgd2luZG93XG4gICAgJCh3aW5kb3cpLnNjcm9sbCBAY2hlY2tTY3JvbGxcblxuICBjaGVja1Njcm9sbDogLT5cblxuICAgIHN0ID0gRGVsYXkud2luLnNjcm9sbFRvcCgpXG5cbiAgICBpZiBzdCA+IERlbGF5LnRvcCBhbmQgRGVsYXkuc3R1Y2sgaXMgZmFsc2VcbiAgICAgICQoJ2hlYWRlciA+IC5pbm5lciA+IC5tZW51JykuYWRkQ2xhc3MoJ3N0dWNrJykucmVtb3ZlQ2xhc3MgJ3Vuc3R1Y2snXG4gICAgICBfLm9uICdoZWFkZXIgPiAuaW5uZXIgPiAubWVudSA+IC5vdXRlciA+IC5pbm5lciA+IC5sZWZ0ID4gLmxnJ1xuICAgICAgXy5vZmYgJ2hlYWRlciA+IC5pbm5lciA+IC5tZW51ID4gLm91dGVyID4gLmlubmVyID4gLmxlZnQgPiAubG9jJ1xuICAgICAgRGVsYXkuc3R1Y2sgPSB0cnVlXG5cbiAgICBpZiBzdCA8IERlbGF5LnRvcCBhbmQgRGVsYXkuc3R1Y2sgaXMgdHJ1ZVxuICAgICAgJCgnaGVhZGVyID4gLmlubmVyID4gLm1lbnUnKS5hZGRDbGFzcygndW5zdHVjaycpLnJlbW92ZUNsYXNzICdzdHVjaydcbiAgICAgIF8ub2ZmICdoZWFkZXIgPiAuaW5uZXIgPiAubWVudSA+IC5vdXRlciA+IC5pbm5lciA+IC5sZWZ0ID4gLmxnJ1xuICAgICAgXy5vbiAnaGVhZGVyID4gLmlubmVyID4gLm1lbnUgPiAub3V0ZXIgPiAuaW5uZXIgPiAubGVmdCA+IC5sb2MnXG4gICAgICBEZWxheS5zdHVjayA9IGZhbHNlXG5cbiIsIkluZGV4ID1cbiAgb2Zmc2V0OiAtNjBcblxuICBpOiAtPlxuICAgIGNvbnNvbGUubG9nICdJbmRleC5pKCknXG4gICAgRGVsYXkuaSgpXG4gICAgQGhhbmRsZXJzKClcblxuICBoYW5kbGVyczogLT5cbiAgICAkKCdoZWFkZXIgPiAuaW5uZXIgPiAubWVudSA+IC5vdXRlciA+IC5pbm5lciA+IC5pdGVtJykuY2xpY2sgQG1lbnVIYW5kbGVyXG4gICAgJCgnaGVhZGVyID4gLmlubmVyID4gLm1lbnUgPiAub3V0ZXIgPiAuaW5uZXIgPiAubGVmdCA+IC5sZycpLmNsaWNrIEBtZW51SGFuZGxlclxuXG4gIG1lbnVIYW5kbGVyOiAtPlxuICAgIEluZGV4LnNlY3Rpb24gJCh0aGlzKS5kYXRhICdpdGVtJ1xuICAgIHJldHVybiBmYWxzZVxuXG4gIHNlY3Rpb246IChzZWN0aW9uKSAtPlxuICAgIHNldFRpbWVvdXQgLT5cbiAgICAgICQoJ2h0bWwsIGJvZHknKS5zY3JvbGxUbyBcIiMje3NlY3Rpb259XCIsXG4gICAgICAgIGR1cmF0aW9uOiA1MDBcbiAgICAgICAgb2Zmc2V0OiBJbmRleC5vZmZzZXRcbiAgICAgIGxvY2F0aW9uLmhhc2ggPSBzZWN0aW9uXG4gICAgLCAxMDBcblxuXG4iXX0=
