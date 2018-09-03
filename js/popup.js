// $(document).ready(function() {
// 	//countLike();
// 	$("#btn-run").on("click", function() {
// 		runAuto();
// 	});
// });
//
// function runAuto() {
// 	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
// 		chrome.tabs.sendMessage(tabs[0].id, {runAuto: "runAuto"}, function(response) {
// 			alert(response.serverTime)
// 		});
// 	});
// }
// // function countLike() {
// // 	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
// // 		chrome.tabs.sendMessage(tabs[0].id, {fblike: "getLike"}, function(response) {
// // 			$("#countLike").html(response.number);
// // 		});
// // 	});
// // }
//
// // function clickLike() {
// // 	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
// // 		chrome.tabs.sendMessage(tabs[0].id, {fblike: "clickLike"}, function(response) {
// // 			$("#p-title").html("Like hết cmnr :))");
// // 			$("#btn-like").remove();
// // 		});
// // 	});
// // }
//
