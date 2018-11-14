(function() {
  "use strict";


  window.addEventListener("message", function(event) {
    if (event.data.type === "result") {
      chrome.runtime.sendMessage({data: event.data.data});
    }
  });

  chrome.runtime.onMessage.addListener(function(request) {
    if (request.type !== "result") {
      window.postMessage(request, "*");
    }
  });

  const addScript = function(src) {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = chrome.runtime.getURL(src);
    document.body.appendChild(script);
    script.onload = function() {
      document.body.removeChild(script);
    };
  };

  addScript("bitset.min.js");
  addScript("cheat.js");
})();