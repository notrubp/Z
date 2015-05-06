(function(global) {
  /*
  */
  var Platform = { }

  /*
  */
  var browser = [
    {
      string: navigator.userAgent,
      substring: "Chrome",
      versionSearch: "Chrome",
      identity: "chrome"
    },
    {
      string: navigator.userAgent,
      substring: "OmniWeb",
      identity: "omniweb",
      versionSearch: "OmniWeb/"
    },
    {
      string: navigator.userAgent,
      substring: "Android",
      identity: "safari",
      versionSearch: "Version"
    },
    {
      string: navigator.vendor,
      substring: "Apple",
      identity: "safari",
      versionSearch: "Version"
    },
    {
      prop: window.opera,
      identity: "opera",
      versionSearch: "Version"
    },
    {
      string: navigator.vendor,
      substring: "iCab",
      identity: "icab",
      versionSearch: "iCab"
    },
    {
      string: navigator.vendor,
      substring: "KDE",
      identity: "konqueror",
      versionSearch: "Konqueror"
    },
    {
      string: navigator.userAgent,
      substring: "Firefox",
      identity: "firefox",
      versionSearch: "Firefox"
    },
    {
      string: navigator.vendor,
      substring: "Camino",
      identity: "camino",
      versionSearch: "Camino"
    },
    {
      string: navigator.userAgent,
      substring: "Netscape",
      identity: "netscape",
      versionSearch: "netscape"
    },
    {
      string: navigator.userAgent,
      substring: "MSIE",
      identity: "explorer",
      versionSearch: "MSIE"
    },
    {
      string: navigator.userAgent,
      substring: "Trident/7.0",
      identity: "explorer11",
      versionSearch: "rv"
    },
    {
      string: navigator.userAgent,
      substring: "Gecko",
      identity: "mozilla",
      versionSearch: "rv"
    }, 
    {
      string: navigator.userAgent,
      substring: "Mozilla",
      identity: "netscape",
      versionSearch: "Mozilla"
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
      versionSearch: "X"
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
  var versionSearch;

  /*
  */
  function searchString(data) {
    for (var i = 0; i < data.length; i++) {
      var string = data[i].string;
      var prop = data[i].prop;
      versionSearch = data[i].versionSearch || data[i].identity;

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
  function searchVersion(string) {
    var index = string.indexOf(versionSearch);

    if (index == -1) {
      return;
    }

    return parseFloat(string.substring(index + versionSearch.length + 1));
  }

  /*
   * Evaluate.
  */

  Platform.browser = searchString(browser) || "unknown";
  Platform.version = searchVersion(navigator.userAgent) || searchVersion(navigator.appVersion) || 0;
  Platform.os = searchString(os) || "unknown";
  Platform.osVersion = "" + (searchVersion(navigator.userAgent) || searchVersion(navigator.appVersion) || 0);

  Platform.isChrome = Platform.browser === 'chrome';
  Platform.isOmniweb = Platform.browser === 'omniweb';
  Platform.isSafari = Platform.browser === 'safari'
  Platform.isOpera = Platform.browser === 'opera';
  Platform.isIcab = Platform.browser === 'icab';
  Platform.isKonqueror = Platform.browser === 'konqueror';
  Platform.isFirefox = Platform.browser === 'firefox';
  Platform.isCamino = Platform.browser === 'camino';
  Platform.isNetscape = Platform.browser === 'netscape';
  Platform.isExplorer = Platform.browser === 'explorer';
  Platform.isExplorer9 = Platform.isExplorer && Platform.version === 9;
  Platform.isExplorer10 = Platform.isExplorer && Platform.version === 10;
  Platform.isExplorer11 = Platform.browser === 'explorer11';
  Platform.isMozilla = Platform.browser === 'mozilla';
  Platform.isGecko = Platform.isFirefox || Platform.isMozilla || Platform.isKonqueror;
  Platform.isTrident = Platform.isExplorer;
  Platform.isWebkit = Platform.isSafari || Platform.isChrome || Platform.isOmniweb || Platform.isOpera || Platform.isCamino;

  Platform.isWindows = Platform.os === 'windows';
  Platform.isMac = Platform.os === 'mac';
  Platform.isIpod = Platform.os == 'ipod';
  Platform.isIphone = Platform.os === 'iphone';
  Platform.isIpad = Platform.os === 'ipad';
  Platform.isLinux = Platform.os === 'linux';
  Platform.isAndroid = Platform.os === 'android';
  Platform.isWindowsphone = Platform.os === 'windowsphone';

  Platform.isiOS = Platform.isIpod || Platform.isIphone || Platform.isIpad;
  
  var iOSVersion = (function() {
    return 0;
  })();

  Platform.isiOS5 = iOSVersion >= 5 && iOSVersion < 6;
  Platform.isiOS6 = iOSVersion >= 6 && iOSVersion < 7;
  Platform.isiOS7 = iOSVersion >= 7 && iOSVersion < 8;
  Platform.isiOS8 = iOSVersion >= 8 && iOSVersion < 9;

  var androidVersion = (function() {
    var s = 'Android';
    var ua = navigator.userAgent;
    var i = ua.indexOf(s);

    if (i != -1) {
      return parseFloat(ua.substring(i + s.length));
    }

    return 0;
  })();

  Platform.isAndroid15 = androidVersion >= 4.4 && androidVersion < 4.4;
  Platform.isAndroid16 = androidVersion >= 4.4 && androidVersion < 4.4;
  Platform.isAndroid17 = androidVersion >= 4.4 && androidVersion < 4.4;
  Platform.isAndroid18 = androidVersion >= 4.4 && androidVersion < 4.4;
  Platform.isAndroid19 = androidVersion >= 4.4 && androidVersion < 4.4;
  Platform.isAndroid20 = androidVersion >= 5.0 && androidVersion < 4.4;

  Platform.isTouch = 'ontouchstart' in window || 'onmsgesturechange' in window;

  Platform.isDesktop = Platform.isWindows || Platform.isMac || Platform.isLinux;
  Platform.isMobile = Platform.isiOS || Platform.isAndroid || Platform.isWindowsphone;

  /*
  */
  global.Platform = Platform;
})(window);
