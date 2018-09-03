$(document).ready(function() {
  $("body").append("<div id='tool-ui'></div>");
  setToolUiCss();
  $.get(chrome.extension.getURL('/tool.html'), function(data) {
    $("#tool-ui").html(data);
    $("#btnStart").on("click", function(event) {
      if($(this).hasClass("btn-primary")) {
        $("#bet-amount").val($("#betPrice").val());
        $("#beginBalance").val("balance-value");

        $(this).removeClass("btn-primary");
        $(this).addClass("btn-danger");
        $("#btnStart").text("Stop");
        $("#time-to-bet-number-1").on("DOMSubtreeModified", function(){
          if($(this).text() == "20" && $(this).hasClass("green-timer")) {
            chooseBaseOnWaterDropLHC();
          }
        });
      } else {
        $(this).removeClass("btn-danger");
        $(this).addClass("btn-primary");
        $("#btnStart").text("Start");
        $("#time-to-bet-number-1").off();
      }


    });
  });

});

function setToolUiCss() {
  $("#tool-ui").css("position", "fixed");
  $("#tool-ui").css("bottom", "0");
  $("#tool-ui").css("right", "0");
  $("#tool-ui").css("width", "40%");

}

function getPageData() {
  var btnBuy = $("#btn-buy1");
  var btnSell = $("#btn-sell1");
  var serverTime = $("#server-time").text();
}

function getServerTime() {
  return $("#server-time").text();
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.runAuto == "runAuto") {
    var serverTime = getServerTime();
    sendResponse({
      serverTime: serverTime
    });
  }
});
