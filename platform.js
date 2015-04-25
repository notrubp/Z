(function(global) {
  /*
  */
  var platform = { }

  /*
  */
  var browser = [
    {
      string: navigator.userAgent,
      substring: "Chrome",
      version_search: "Chrome",
      identity: "chrome"
    },
    {
      string: navigator.userAgent,
      substring: "OmniWeb",
      identity: "omniweb",
      version_search: "OmniWeb/"
    },
    {
      string: navigator.userAgent,
      substring: "Android",
      identity: "safari",
      version_search: "Version"
    },
    {
      string: navigator.vendor,
      substring: "Apple",
      identity: "safari",
      version_search: "Version"
    },
    {
      prop: window.opera,
      identity: "opera",
      version_search: "Version"
    },
    {
      string: navigator.vendor,
      substring: "iCab",
      identity: "icab",
      version_search: "iCab"
    },
    {
      string: navigator.vendor,
      substring: "KDE",
      identity: "konqueror",
      version_search: "Konqueror"
    },
    {
      string: navigator.userAgent,
      substring: "Firefox",
      identity: "firefox",
      version_search: "Firefox"
    },
    {
      string: navigator.vendor,
      substring: "Camino",
      identity: "camino",
      version_search: "Camino"
    },
    {
      string: navigator.userAgent,
      substring: "Netscape",
      identity: "netscape",
      version_search: "netscape"
    },
    {
      string: navigator.userAgent,
      substring: "MSIE",
      identity: "explorer",
      version_search: "MSIE"
    },
    {
      string: navigator.userAgent,
      substring: "Trident/7.0",
      identity: "explorer11",
      version_search: "rv"
    },
    {
      string: navigator.userAgent,
      substring: "Gecko",
      identity: "mozilla",
      version_search: "rv"
    }, 
    {
      string: navigator.userAgent,
      substring: "Mozilla",
      identity: "netscape",
      version_search: "Mozilla"
    }
  ];

  /*
  */
  var os = [
    {
      string: navigator.userAgent,
      substring: "Windows Phone",
      identity: "windowsphone"

    }, 
    {
      string: navigator.platform,
      substring: "Win",
      identity: "windows"
    },
    {
      string: navigator.platform,
      substring: "Mac",
      identity: "mac",
      version_search: "X"
    },
    {
      string: navigator.userAgent,
      substring: "iPhone",
      identity: "iphone"
    },
    {
      string: navigator.userAgent,
      substring: "iPod",
      identity: "ipod"
    },
    {
      string: navigator.userAgent,
      substring: "iPad",
      identity: "ipad"
    },
    {
      string: navigator.userAgent,
      substring: "Android",
      identity: "android"
    },
    {
      string: navigator.platform,
      substring: "Linux",
      identity: "linux"
    }
  ];

  /*
  */
  var version_search;

  /*
  */
  function search_string(data) {
    for (var i = 0; i < data.length; i++) {
      var string = data[i].string;
      var prop = data[i].prop;
      version_search = data[i].version_search || data[i].identity;

      if (string) {
        if (string.indexOf(data[i].substring) != -1) {
          return data[i].identity;
        }
      } else if (prop) {
        return data[i].identity;
      }
    }
  }

  /*
  */
  function search_version(string) {
    var index = string.indexOf(version_search);

    if (index == -1) {
      return;
    }

    return parseFloat(string.substring(index + version_search.length + 1));
  }

  /*
   * Evaluate.
  */

  platform.browser = search_string(browser) || "unknown";
  platform.version = search_version(navigator.userAgent) || search_version(navigator.appVersion) || 0;
  platform.os = search_string(os) || "unknown";
  platform.os_version = "" + (search_version(navigator.userAgent) || search_version(navigator.appVersion) || 0);

  platform.is_chrome = platform.browser === 'chrome';
  platform.is_omniweb = platform.browser === 'omniweb';
  platform.is_safari = platform.browser === 'safari'
  platform.is_opera = platform.browser === 'opera';
  platform.is_icab = platform.browser === 'icab';
  platform.is_konqueror = platform.browser === 'konqueror';
  platform.is_firefox = platform.browser === 'firefox';
  platform.is_camino = platform.browser === 'camino';
  platform.is_netscape = platform.browser === 'netscape';
  platform.is_explorer = platform.browser === 'explorer';
  platform.is_explorer9 = platform.is_explorer && platform.version === 9;
  platform.is_explorer10 = platform.is_explorer && platform.version === 10;
  platform.is_explorer11 = platform.browser === 'explorer11';
  platform.is_mozilla = platform.browser === 'mozilla';
  platform.is_gecko = platform.is_firefox || platform.is_mozilla || platform.is_konqueror;
  platform.is_trident = platform.is_explorer;
  platform.is_webkit = platform.is_safari || platform.is_chrome || platform.is_omniweb || platform.is_opera || platform.is_camino;

  platform.is_windows = platform.os === 'windows';
  platform.is_mac = platform.os === 'mac';
  platform.is_ipod = platform.os == 'ipod';
  platform.is_iphone = platform.os === 'iphone';
  platform.is_ipad = platform.os === 'ipad';
  platform.is_linux = platform.os === 'linux';
  platform.is_android = platform.os === 'android';
  platform.is_windowsphone = platform.os === 'windowsphone';

  platform.is_ios = platform.is_ipod || platform.is_iphone || platform.is_ipad;
  
  var ios_version = (function() {
    return 0;
  })();

  platform.is_ios5 = ios_version >= 5 && ios_version < 6;
  platform.is_ios6 = ios_version >= 6 && ios_version < 7;
  platform.is_ios7 = ios_version >= 7 && ios_version < 8;
  platform.is_ios8 = ios_version >= 8 && ios_version < 9;

  var android_version = (function() {
    var s = 'Android';
    var ua = navigator.userAgent;
    var i = ua.indexOf(s);

    if (i != -1) {
      return parseFloat(ua.substring(i + s.length));
    }

    return 0;
  })();

  platform.is_android15 = android_version >= 4.4 && android_version < 4.4;
  platform.is_android16 = android_version >= 4.4 && android_version < 4.4;
  platform.is_android17 = android_version >= 4.4 && android_version < 4.4;
  platform.is_android18 = android_version >= 4.4 && android_version < 4.4;
  platform.is_android19 = android_version >= 4.4 && android_version < 4.4;
  platform.is_android20 = android_version >= 5.0 && android_version < 4.4;

  platform.is_touch = 'ontouchstart' in window || 'onmsgesturechange' in window;

  platform.is_desktop = platform.is_windows || platform.is_mac || platform.is_linux;
  platform.is_mobile = platform.is_ios || platform.is_android || platform.is_windowsphone;

  /*
  */
  global.platform = platform;
})(window);
