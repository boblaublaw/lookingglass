var _,hasProp={}.hasOwnProperty,slice=[].slice;_={i:function(){return this.console=setInterval(this.detect.bind(this),200)},p:{offing:!1,offtime:0},turn:function(n,m,e){return null==m&&(m=!1),null==e&&(e=!1),n instanceof jQuery||(n=$(n)),m!==!1&&n.removeClass(m),e!==!1&&n.addClass(e),!0},off:function(n,m){null==m&&(m={}),m.offing&&m.offtime>0?(this.turn(n,!1,"offing"),setTimeout(function(m){return function(){return m.turn(n,"offing",!1),m.turn(n,"on","off")}}(this),1e3*m.offtime+100)):this.turn(n,"on","off")},on:function(n,m){return this.turn(n,"off","on")},swap:function(n,m){n instanceof jQuery||(n=$(n)),n.hasClass("off")?this.on(n,m):this.off(n,m)},encode:function(n){return encodeURIComponent(n).replace(/!/g,"%21").replace(/'/g,"%27").replace(/\(/g,"%28").replace(/\)/g,"%29").replace(/\*/g,"%2A").replace(/%20/g,"+")},t:function(n,m,e,t){return _gaq.push(["_trackEvent",n,m,e,t])},rand:function(n,m){return Math.floor(Math.random()*m)+n},fit:function(n,m,e,t){var r;return r=Math.min(e/n,t/m),{width:n*r,height:m*r}},hex2rgb:function(n){var m;return m=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(n),{r:parseInt(m[1],16),g:parseInt(m[2],16),b:parseInt(m[3],16)}},objc:function(n){var m;return function(){var e;e=[];for(m in n)hasProp.call(n,m)&&e.push(m);return e}().length},load:function(n,m,e){var t;return t=document.createElement("script"),t.type="text/javascript",t.src=n,t.addEventListener("load",function(n){if("function"==typeof e&&e(),void 0!==m&&m!==!1)return window[m].i()},!1),document.body.appendChild(t)},jinit:function(){return $.ajaxSetup({dataType:"json"})},patch:function(n,m){var e;return this.jinit(),e=$.ajax({url:n,data:m,type:"PATCH"}),e.fail(function(n){return this.fail(n)}),e},get:function(){var n,m;return n=1<=arguments.length?slice.call(arguments,0):[],this.jinit(),m=$.get.apply($,n),m.fail(function(n){return function(e){return n.fail(e),m.fail(e)}}(this)),m},post:function(){var n,m;return n=1<=arguments.length?slice.call(arguments,0):[],m=$.post.apply($,n),m.fail(function(n){return function(e){return n.fail(e),m.fail(e)}}(this)),m},fail:function(n){var m,e,t,r,o,i,d;if(t=null!=(i=n.responseJSON)&&null!=(d=i.errors)?d[0]:void 0,void 0===t)return Prompt.i(n.status,n.statusText);switch(o=t.message.match(/Pug Error: (.*?):([0-9]+)/),null!==o&&(t.message=t.message.replace(/Pug Error: (.*?):([0-9]+)/,""),t.file=o[1],t.line=o[2]),r=this.encode(""+t.file),config.app.editor){case"macvim":e="mvim://open?url=file://";break;case"sublime":e="subl://open?url=file://";break;case"emacs":e="emacs://open?url=file://";break;case"textmate":e="textmate://open/?url=file://";break;case"phpstorm":e="phpstorm://open?file="}return m=null!==t.file?"<pre>"+t.message+'</pre>\n<a href="'+e+r+"&line="+t.line+'"><b>'+t.file+":"+t.line+"</b></a>":t.message,Prompt.i(t.type,m,["OK"])},methods:function(n){var m,e,t;t=[];for(m in n)e=n[m],"function"==typeof e&&t.push(e);return t},llc:function(){var n;return n="\n%cmmm/............................................................./mmm\nmmo................-:://::-.......-:::::::::::::-........-::///:-.omm\nmd-.............:+yhddddddhy+-..../ddddddddddddd+....../shdddddddyodm\nmo.............-hmmmhyyyydmmmh:.../mmmmhhhhhhhhh+....:ydmmdhyyyhddoom\nm-..............-ss:-....-ymmmy.../mmmm---------....:dmmms:-...-:/.-m\nd.........................ymmmy.../mmmm-/+ooo+:-....ymmmy-:+ooo+/-..d\nh.......................:smmmd:.../mmmmhmmmmmmdh+...dmmmshdmmmmmmhs-h\nh.....................:sdmmdy:....:hhdho+//+ymmmm+..dmmmdyo//+sdmmmhh\nd..................-+ydmmdy/.......--:.......smmmh..ymmms......:mmmmm\nm-..............-:shmmmds/-----....:s/--...-:hmmms..:dmmd/-...-ommmmm\nmo..............hmmmmmmhhhhhhhh...+dmmdhyyyhdmmmy-.../hmmmhyyyhmmmdhm\nmd-.............ddddddddddddddd...-+shdddddddhy/-.....-oydddddddho:dm\nmmo.............:::::::::::::::.......-:///::-...........-:///:-..omm\nmmm/............................................................./mmm\n\n:: syntactic sugar by 256\n:: http://256.io/\n:: "+config.meta.repo,console.log(n,"color: grey; font-family: Menlo, monospace;")},detect:function(){if(window.outerHeight-window.innerHeight>100||window.outerWidth-window.innerWidth>100)return this.llc(),clearInterval(this.console)}},_.i();
var config;config={color:{white1:"#ffffff",black1:"#000000",black2:"#191919",brown1:"#C29E6E",brown2:"#AA8052",brown3:"#876037",beige1:"#C7BAA2",beige2:"#E5E3DB"},font:{h1:{"font-family":"octavian regular","font-size":"22px"},h2:{"font-family":"serial regular","font-size":"55px"},copy1:{"font-family":"independence regular","font-size":"29px"},copy2:{"font-family":"Garamond","font-size":"116px"}},meta:{url:"http://lookingglassvr.com/",title:"Looking Glass VR",description:"Windows to the past are open at last",keywords:"VR, VR app, looking glass",tracking_id:"UA-89300822-1",share:"images/share.jpg",repo:"https://github.com/lookingglassvr/lookingglass",social:{facebook:"https://www.facebook.com/Looking-Glass-VR-178294259284296/",twitter:"https://twitter.com/stereoviews",instagram:"https://instagram.com/lookingglassvr"}},copy:{collection:{title:"the collection",first:"T",copy:'he stereo-photos you see in Looking Glass VR are selected excerpts from the <a target="_blank" href="https://en.wikipedia.org/wiki/Keystone_View_Company">Keystone View Company</a>’s <a target="_blank" href="http://www.lib.utexas.edu/taro/utcah/02182/cah-02182.html">‘Tour of the World’</a>, a tiny glimpse of Keystone’s internationally themed stereo photography collection. From 1892 to 1933, over 300,000 such cards were produced. In 1978, the company\'s records and inventory of negatives were donated to the <a target="_blank" href="http://artsblock.ucr.edu/Page/california-museum-of-photography">UCR/California Museum of Photography at the University of California Riverside</a>, where they are now known as the <a target="_blank" href="http://www.oac.cdlib.org/findaid/ark:/13030/ft1q2n999m/">Keystone-Mast collection</a>.'},credits:{title:"credits and thanks",first:"A",copy:'dditional hand lettering by <a target="_blank" href="http://www.tobiassaul.de/">Tobias Saul</a> and illustration by <a target="_blank" href="http://www.weemsillustration.com/">Matt Weems</a>. Web design by <a target="_blank" href="http://www.mahersinjary.com/">Maher Sinjary</a>. Website by <a target="_blank" href="http://256.io/">Kevin Olson</a>. Prototyped with the help of <a target="_blank" href="http://suzanimator.com/">Suzanne Leibrick</a>. Sound effects used from <a target="_blank" href="http://freesound.org">freesound.org</a>. (<a target="_blank" href="https://www.freesound.org/people/Robinhood76/sounds/125315/">A</a> <a target="_blank" href="http://freesound.org/people/InspectorJ/sounds/343130/">B</a> <a target="_blank" href="http://freesound.org/people/NightVoice/sounds/234268/">C</a> <a target="_blank" href="http://freesound.org/people/kwahmah_02/sounds/264096/">D</a> <a target="_blank" href="http://freesound.org/people/nsstudios/sounds/321114/">E</a> <a target="_blank" href="http://freesound.org/people/f4ngy/sounds/240776/">F</a> <a target="_blank" href="http://freesound.org/people/MrAuralization/sounds/184567/">G</a> <a target="_blank" href="http://freesound.org/people/SunnySideSound/sounds/67791/">H</a>) With music from the <a target="_blank" href="http://openmusicarchive.org/browse_tag.php?tag=1920s">Open Music Archive</a>.',authors:{title:"Looking Glass VR was",joeb:'created by <br /><a target="_blank" href="http://joeboyle.com">Joe Boyle</a>',kevinc:'with 3D art by <br /><a target="_blank" href="http://www.kevincastaneda.com/">Kevin Castaneda</a>',kevino:'and web dev by <br /><a target="_blank" href="https://256.io">Kevin Olson</a>'}},footer:{copyright:"Copyright &copy; 2016 Looking Glass - All Rights Reserved"},history:{title:"history of stereoscopy",copy1:"“It is a delightful characteristic of these times, that new and cheap means are continuously being devised, for conveying the results of a casual experience to those who are unable to obtain such experiences for themselves; and to bring them within the reach of the people.” —Charles Dickens",first:"E",copy2:'ven amongst virtual reality enthusiasts, most people don’t realize that the first 3D viewer was developed in 1838 by <a target="_blank" href="http://www.stereoscopy.com/faq/wheatstone.html">Charles Wheatstone</a> - almost 180 years ago! Since before the popularization of television, radio, cinema, or virtual reality, people have been exploring the world through immersive stereo 3D images. Since the invention of the stereoscope, up through the mid 20th century, hundreds of thousands of stereographic photos cards were produced and distributed all over the world. Though nearly forgotten, these photo cards can again be viewed as intended, thanks to the advent of mobile VR.'},howto:{title:"how to use looking glass vr",instructions:['Make sure you have a <a target="_blank" href="https://vr.google.com/cardboard/get-cardboard/">Google Cardboard headset</a>. (One with a trigger!)','Install <a target="_blank" href="https://play.google.com/store/apps/details?id=photos.stereographic.cardboard">Looking Glass VR</a> from the Google Play Store.',"Turn on your WiFi & launch the application.","Click your trigger on the stereoscope to get started.",'Additionally, you can <a href="http://youtu.be/XTc5z2nbjsI" target="_blank">watch this helpful tutorial video</a> which covers the basics of installation and using Looking Glass VR.'],extra:'If your Cardboard device does not have a trigger, you can use a <a target="_blank" href="https://www.amazon.com/SteelSeries-Stratus-Bluetooth-Wireless-Controller/dp/B015WKY3IM/ref=sr_1_1">bluetooth controller</a> to interact with the application.'},intro:{first:"W",copy:'elcome to Looking Glass VR. Looking Glass VR is a mobile application for <a target="_blank" href="https://vr.google.com/cardboard/">Google Cardboard</a> which brings historic stereographic 3D photos from yesteryear into focus. You can find <a target="_blank" href="https://play.google.com/store/apps/details?id=photos.stereographic.cardboard">Looking Glass VR in the Google Play Store</a>, but to get the 3D effect  you will need to <a target="_blank" href="https://vr.google.com/cardboard/get-cardboard/">get a Google Cardboard VR device</a>. (Be sure to get one with a trigger!)'}}};
var Delay;Delay={top:200,win:!1,stuck:!1,i:function(){return this.win=$(window),$(window).scroll(this.checkScroll)},checkScroll:function(){var e;if(e=Delay.win.scrollTop(),e>Delay.top&&Delay.stuck===!1&&($("header > .inner > .menu").addClass("stuck").removeClass("unstuck"),_.on("header > .inner > .menu > .outer > .inner > .left > .lg"),_.off("header > .inner > .menu > .outer > .inner > .left > .loc"),Delay.stuck=!0),e<Delay.top&&Delay.stuck===!0)return $("header > .inner > .menu").addClass("unstuck").removeClass("stuck"),_.off("header > .inner > .menu > .outer > .inner > .left > .lg"),_.on("header > .inner > .menu > .outer > .inner > .left > .loc"),Delay.stuck=!1}};
var Index;Index={offset:-60,i:function(){return console.log("Index.i()"),Delay.i(),this.handlers()},handlers:function(){return $("header > .inner > .menu > .outer > .inner > .item").click(this.menuHandler),$("header > .inner > .menu > .outer > .inner > .left > .lg").click(this.menuHandler)},menuHandler:function(){return Index.section($(this).data("item")),!1},section:function(n){return setTimeout(function(){return $("html, body").scrollTo("#"+n,{duration:500,offset:Index.offset}),location.hash=n},100)}};