import xhook from 'xhook';

const xhrCache = {
  scriptTag: null,
  scriptTagId: 'spirit-fish-xhr-cache',
  data: {},
  setup: () => {
    const existing = document.getElementById(xhrCache.scriptTagId);
    if (existing) {
      xhrCache.scriptTag = existing;
    } else {
      const script = document.createElement('script');
      script.id = xhrCache.scriptTagId;
      script.type = 'text/javascript';
      script.innerHTML = 'window.SPIRIT_FISH_XHR_CACHE = {}';
      document.getElementsByTagName('head')[0].appendChild(script);
      xhrCache.scriptTag = script;
    }

    xhrCache.data = window.SPIRIT_FISH_XHR_CACHE;

    xhook.before(function(request, callback) {
      if (request.method !== 'GET') return callback();
      try {
        const existing = xhrCache.get(request.url);
        if (!existing) {
          console.info(
            `Spirit Fish XHR Cache MISS - ${request.method} ${request.url}`
          );
          return callback();
        }
        request.SPIRIT_FISH_CACHE_HIT = true;
        console.info(
          `Spirit Fish XHR Cache HIT - ${request.method} ${request.url}`
        );
        return callback(existing);
      } catch (e) {
        console.warn(`Spirit Fish XHR Cache ERROR - ${e && e.message}`);
        return callback();
      }
    });

    xhook.after(function(request, response) {
      if (request.method !== 'GET') return;
      if (request.SPIRIT_FISH_CACHE_HIT) return;
      if (!window.SPIRIT_FISH) return;
      try {
        xhrCache.set(request.url, response);
        console.log(
          `Spirit Fish XHR Cache STORE - ${request.method} ${request.url}`
        );
      } catch (e) {
        console.log(`Spirit Fish XHR Cache STORE_ERROR - ${e && e.message}`);
      }
    });
  },
  publish: () => {
    xhrCache.scriptTag.innerHTML = `window.SPIRIT_FISH_XHR_CACHE = ${JSON.stringify(
      xhrCache.data
    )}`;
  },
  get: url => {
    return xhrCache.data[url];
  },
  set: (url, data) => {
    xhrCache.data[url] = data;
    xhrCache.publish();
    return data;
  }
};

export default xhrCache;
