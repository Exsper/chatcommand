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
ch1.add(new CommandInfo("bind", ["setUser"], "绑定账号", [param_user]));
ch1.add(new CommandInfo("bindMode", ["setMode"], "绑定", [new Param("mode", "", dataType.string)]));

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
prpr("!!setMode osurx");