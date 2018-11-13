(function() {
  "use strict";


  window.addEventListener("message", function(event) {
    // console.log("content-script.js window mesg", event);
    if (event.data.type === "result") {
      chrome.runtime.sendMessage({data: event.data.data});
    }
  });

  chrome.runtime.onMessage.addListener(function(request) {
    // console.log("content-script.js runtime mesg", request);
    if (request.type !== "result") {
      window.postMessage(request, "*");
    }
  });

  var script = document.createElement("script");
  script.type = "text/javascript";
  script.src = chrome.runtime.getURL("cheat.js");
  document.body.appendChild(script);
  script.onload = function() {
    document.body.removeChild(script);
  };
})();