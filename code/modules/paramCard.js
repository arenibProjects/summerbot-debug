exports.init=function(displayer,xCom){
  exports.xCom=xCom;
	exports.card = new displayer.TextCard();
	var cardCol = new displayer.Col(4,6,12);
	displayer.mainFrame.addChild(cardCol);
	cardCol.addChild(exports.card);
	var cardTitle = new displayer.Title();
	cardTitle.text="parameters";
	exports.card.addChild(cardTitle);
  exports.sideText = new displayer.Text();
  exports.card.addChild(exports.sideText);
  exports.sideNames = ["Side: Green","Side: Orange"];
  exports.stratText = new displayer.Text();
  exports.card.addChild(exports.stratText);
  var row = new displayer.Row();
  exports.card.addChild(row);
	exports.buttons=[
    ["make Green",["SSIDE","0"]],
    ["make Orange",["SSIDE","1"]],
    ["Start",["START"]],
    ["change strat.",["CSTRAT"]],
  ].map(d=>{
    var col = new displayer.Col(12,12,12);
    var button = new displayer.Button();
    button.text = d[0];
    button.action = ()=>{xCom.send(d[1],"summerbot");};
    col.addChild(button);
    return [col,button];
  });
  for(let [c,b] of exports.buttons) row.addChild(c);
}
exports.registerCommands = function(){
  exports.xCom.addCommand("SIDE",(com,con)=>{
		exports.sideText.text = exports.sideNames[parseInt(com[1])];
	});
  exports.xCom.addCommand("STRAT",(com,con)=>{
		exports.stratText.text = "Strat ID: "+com[1];
	});
  xCom.send(["GSIDE"],"summerbot");
  xCom.send(["GSTRAT"],"summerbot");
}