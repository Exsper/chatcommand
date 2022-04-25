let CommandHelper = require("./index").CommandHelper;
let CommandInfo = require("./index").CommandInfo;
let Param = require("./index").Param;
let param_index = require("./index").param_index;
let param_mode = require("./index").param_mode;
let param_mods = require("./index").param_mods;
let param_user = require("./index").param_user;
let dataType = require("./index").dataType;

let ch1 = new CommandHelper(["!!", "?", "*"], [{ server: "bancho" }, { server: "bancho" }, { server: "ppysb" }]);
ch1.add(new CommandInfo("stat", "stat", "个人数据", [new Param("mode", "#", dataType.string, true), param_user]));
ch1.add(new CommandInfo("recent", ["recent", "re"], "最近成绩", [param_user]));
let from = new Param("from", ["@from", "@start"], dataType.date);
let to = new Param("to", ["@to", "@end"], dataType.date);
let last = new Param("last", "@last", dataType.integer);
ch1.add(new CommandInfo("best", ["best", "bp"], "最好成绩", [new Param("index", "", dataType.integer, true), from, to, last, param_index, param_user]));
ch1.add(new CommandInfo("score", ["score", "s"], "查询成绩", [param_user]));
ch1.add(new CommandInfo("bind", ["setuser"], "绑定账号", [param_user]));
ch1.add(new CommandInfo("bindmode", ["setmode"], ["绑定", "osu=0,taiko=1,catch=2,mania=3"], [new Param("mode", "", dataType.string)]));

function prpr(text) {
    console.log(text);
    console.log(ch1.run(text));
}

prpr("!!stat arily");
prpr("?recent arily");
prpr("*stat#osu 1130");
prpr("?best1 arily");
prpr("?bp @last 24 arily");
prpr("?bp @from 2022-12-30 @to 2024-12-12 1123053");
prpr("!!score 12345");
prpr("!!setUser arilychan");
prpr("!!setmOde osurx");
prpr("!!help setmode");
prpr("!!help");

let ch3 = new CommandHelper(["!", "！"], [], "帮助");
let ci = new CommandInfo("bindaccount", ["bind", "set", "setid"], "绑定", [param_user, param_mode]);
ch3.add(ci);
let data = ch3.run("！帮助 bind");
console.log(data.help);

let data2 = ch3.run("！帮助");
console.log(data2.help);

let ch3_1 = new CommandHelper(["!", "！"], [], ["帮助", "去官网查吧", "我懒"]);
let data2_1 = ch3_1.run("！帮助");
console.log(data2_1.help);