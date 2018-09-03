const RED = "red",
 GREEN = "green",
 GOLD = "gold",
 NONE = "null";

const TIMER_INTERVAL = 1e3,
  BETTING_SECOND_START = 5,
  BETTING_SECOND_END = 30,
  CANDLE_CHART_ID1 = "chart-div-1",
  CANDLE_CHART_ID2 = "chart-div-2",
  PIE_CHART_ID1 = "pie-chart-1",
  PIE_CHART_ID2 = "pie-chart-2",
  TABLE_RESULT_ID1 = "table-result-1",
  TABLE_RESULT_ID2 = "table-result-2",
  BUTTON_BUY_ID1 = "btn-buy1",
  BUTTON_BUY_ID2 = "btn-buy2",
  BUTTON_SELL_ID1 = "btn-sell1",
  BUTTON_SELL_ID2 = "btn-sell2",
  BALANCE_BUY_ID1 = "buy1",
  BALANCE_BUY_ID2 = "buy2",
  BALANCE_SELL_ID1 = "sell1",
  BALANCE_SELL_ID2 = "sell2",
  SELECT_BROKER_ID1 = "broker1",
  SELECT_SYMBOL_ID1 = "symbol1",
  SELECT_BROKER_ID2 = "broker2",
  SELECT_SYMBOL_ID2 = "symbol2",
  DATA_BROKER_KEY1 = "DATA_BROKER_KEY1",
  DATA_BROKER_KEY2 = "DATA_BROKER_KEY2",
  DATA_SYMBOL_KEY1 = "DATA_SYMBOL_KEY1",
  DATA_SYMBOL_KEY2 = "DATA_SYMBOL_KEY2",
  BUTTON_NUMBER_CSS = "btn-select-amount",
  TEXT_BET_AMOUNT = "bet-amount",
  BUTTON_PLAY_SOUND = "is-play-sound",
  ENABLE_SOUND_KEY = "ENABLE_SOUND_KEY";

var siteUrl = 'https://order.ustrade.global';
var SIGNALR_HOST = 'https://order.ustrade.global/signalr';
var environment = 'w';
var legendPieSize = 10;

//Loop value
var beginBalance,
lastBalance,
lastResult,
winChain,
loseChain,
nextBetPrice;


function getWaterDropChart() {
	var chart = new Array(10);
	for(i = 0; i < 10; i++) {
		chart[i] = new Array(6);
	}

	var column = 0;
	var row = 0;

	$("#table-result-1").find(".result-icon").each(function(index){
		var colorSrc = $(this).find("img").attr("src");
		var color = "null";
		if(colorSrc.includes(RED)) {
			color = RED;
		} else if (colorSrc.includes(GREEN)) {
			color = GREEN;
		} else if (colorSrc.includes(GOLD)) {
			color = GOLD;
		}
		chart[column][row] = color;
		if(++column >= 10) {
			row++;
			column = 0;
		}
	});

	return chart;
}

function getCurrentColumn(chart) {
	for(i = 0; i < 10; i++) {
		for(j = 0; j < 6; j++) {
			if(chart[i][j] == NONE) {
				return i;
			}
		}
	}
}

//Lien Hoan cuoc
function chooseBaseOnWaterDropLHC() {
	var chart = getWaterDropChart();
	var currentColumn = getCurrentColumn(chart);
	var choice;
	for(j = 0; j <= 6; j++) {
		var lastColor = chart[currentColumn][j];
		if (lastColor == GOLD) {
			choice = "NONE"
			break;
		} else if (lastColor == NONE) {
			break;
		}

		if(j == 0) {
			if(lastColor == RED) {
				choice = "sell"
			} else if (lastColor == GREEN) {
				choice = "buy"
			}
		} else if (j == 5) {
			if(chart[currentColumn][4] == chart[currentColumn][5]) {
				if(lastColor == RED) {
					choice = "buy"
				} else if (lastColor == GREEN) {
					choice = "sell"
				}
			} else {
				choice = "NONE"
			}
		} else {
			if(lastColor == RED) {
				choice = "buy"
			} else if (lastColor == GREEN) {
				choice = "sell"
			}
		}
	}
	//alert($("#" + SELECT_BROKER_ID1).val() + " - " +  $("#" + SELECT_SYMBOL_ID1).val() + " - " + BALANCE_BUY_ID1 + " - " + BALANCE_SELL_ID1);
  lastBalance = $("#balance-value").text();
	if(choice == "buy") {
		//$("#btn-buy1").click();
		placeBet(1, $("#" + SELECT_BROKER_ID1).val(), $("#" + SELECT_SYMBOL_ID1).val(), BALANCE_BUY_ID1, BALANCE_SELL_ID1);
	} else if (choice == "sell") {
		//$("#btn-sell1").click();
		placeBet(2, $("#" + SELECT_BROKER_ID1).val(), $("#" + SELECT_SYMBOL_ID1).val(), BALANCE_BUY_ID1, BALANCE_SELL_ID1)
	}
}

function placeBet (t, i, r) {
	var u, f, e;
	var n = !0;
	u = parseFloat($("#bet-amount").val());
	if (n) {
		f = siteUrl + "/PlaceBet/Bet";
		e = {
			brokerId: i,
			symbolId: r,
			BetChoice: t,
			BetFrom: environment,
			Stake: u
		};
		$.post(f, e).done(function(t) {
			t.ErrorCode == 0 ? ($("#balance-value").html(numeral(t.Data.Balance).format("0,0.00")), showRunningBets(t.Data.Turnover)) : alert("Phat hien hack !!");
			IsValidBetting = !0;
			n = !0
		});
	}
}

function showRunningBets(n) {
	$.each(n, function(n, t) {
		t.BrokerID == $("#" + SELECT_BROKER_ID1).val() && t.SymbolID == $("#" + SELECT_SYMBOL_ID1).val() && ($("#" + BALANCE_BUY_ID1).html(numeral(t.TotalBuy).format("0,0.00")), $("#" + BALANCE_SELL_ID1).html(numeral(t.TotalSell).format("0,0.00")));
		t.BrokerID == $("#" + SELECT_BROKER_ID2).val() && t.SymbolID == $("#" + SELECT_SYMBOL_ID2).val() && ($("#" + BALANCE_BUY_ID2).html(numeral(t.TotalBuy).format("0,0.00")), $("#" + BALANCE_SELL_ID2).html(numeral(t.TotalSell).format("0,0.00")));
	})
}

function getResult() {
  var currentBalance = $("#balance-value").text();
  var winLoss = parseFloat(currentBalance) - parseFloat(lastBalance);
  if(winLoss > 0) {
    alert("Win");
  } else if (winLoss < 0) {
    alert("Lose")
  } else {
    alert("Refund");
  }
}
