document.addEventListener("DOMContentLoaded", function() {
  if (localStorage.getItem("result")) {
    document.getElementById("result").innerText = localStorage.getItem("result");
  }

  if (localStorage.getItem("text")) {
    document.getElementById("text").value = localStorage.getItem("text");
  }

  chrome.runtime.onMessage.addListener(function(request) {
    // console.log("popup.js runtime mesg", request);
    localStorage.setItem("result", request.data);
    document.getElementById("result").innerText = request.data;
  });

  document.getElementById("save").onclick = () => {
    sendData("save");
  };

  document.getElementById("eq").onclick = () => {
    sendData("eq", getNum());
  };

  document.getElementById("ne").onclick = () => {
    sendData("ne", getNum());
  };

  document.getElementById("show").onclick = () => {
    sendData("show");
  };

  document.getElementById("count").onclick = () => {
    sendData("count");
  };

  document.getElementById("fixAll").onclick = () => {
    sendData("fixAll", getNum());
  };
});

const getNum = () => {
  const num = Number(document.getElementById("text").value);
  if (isNaN(num)) {
    return;
  } else {
    return num;
  }
};

const sendData = (type, data) => {
  document.getElementById("result").innerText = "";
  localStorage.setItem("text", document.getElementById("text").value);
  chrome.tabs.query({ currentWindow: true, active: true }, function(tabs) {
    var activeTab = tabs[0];
    chrome.tabs.sendMessage(
      activeTab.id,
      {
        type: type,
        data: data
      }
    );
  });
};