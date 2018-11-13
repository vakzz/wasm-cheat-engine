(function() {
  "use strict";

  window.addEventListener("message", function(event) {
    console.log("content-script.js got message", event);
    // chrome.runtime.sendMessage(event.data);
  });

  var script = document.createElement("script");
  script.type = "text/javascript";
  script.src = chrome.runtime.getURL("cheat.js");
  document.body.appendChild(script);
  script.onload = function() {
    document.body.removeChild(script);
  };
})();