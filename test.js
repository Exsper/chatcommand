let CommandHelper = require("./index").CommandHelper;
let CommandInfo = require("./index").CommandInfo;
let Param = require("./index").Param;
let param_index = require("./index").param_index;
let param_mode = require("./index").param_mode;
let param_mods = require("./index").param_mods;
let param_user = require("./index").param_user;
let dataType = require("./index").dataType;



let ch1 = new CommandHelper(["!", "！"]);
let ci1 = new CommandInfo("bindaccount", ["bind", "set", "setid"], ["绑定", "绑定你的账号", "不会向他人透露"], [param_mode, param_user]);
ch1.add(ci1);
let data = ch1.run("！biNd Exsper:3");
if (data.type !== "bindaccount" || data.command !== "bind" || data.info[0] !== "绑定" || data.param.mode !== 3 || data.param.user !== "Exsper")
    throw "Error";
data = ch1.run(" !hElp setid");
if (JSON.stringify(data) === "{}" || data.help !== "绑定\n指令：bind/set/setid\n参数：:mode/user\n绑定你的账号\n不会向他人透露")
    throw "Error";
ch1.add(new CommandInfo("score", ["score", "s"], "查询成绩", [param_user]));
data = ch1.run(" !hElp");
if (JSON.stringify(data) === "{}" || data.help !== "指令列表：\nbind\nscore\n输入 help + 指令名称 查看具体指令帮助")
    throw "Error";

let ci2 = new CommandInfo("recent", ["recent", "re"], "显示最近成绩", [param_user, param_mode, param_index]);
let ch2 = new CommandHelper(["!", "！"], [], ["help", "在官网上有详细说明文档", "懒~"], [ci2]);
data = ch2.run("! Re  exSper  :1   #2 ");
if (data.type !== "recent" || data.command !== "re" || data.info[0] !== "显示最近成绩" || data.param.mode !== 1 || data.param.user !== "exSper" || data.param.index !== 2)
    throw "Error";
data = ch2.run(" ! heLp  recent ");
if (!data.help || data.help !== "显示最近成绩\n指令：recent/re\n参数：user/:mode/#index")
    throw "Error";
data = ch2.run(" ! heLp ");
if (!data.help || data.help !== "在官网上有详细说明文档\n懒~")
    throw "Error";

data = ch2.run(" !unkNown command");
if (JSON.stringify(data) !== "{}")
    throw "Error";
data = ch2.run(" !hElp unknown command");
if (JSON.stringify(data) === "{}" || data.help !== "未找到该指令")
    throw "Error";

let ch3 = new CommandHelper(["!", "！"]);
let ci3 = new CommandInfo("score", ["score", "s"], "成绩");
let p3_1 = new Param("beatmapid", "&", dataType.integer);
ci3.addParam([param_user, param_mode]);
ci3.addParam(param_mods).addParam(p3_1);
ch3.add(ci3);
data = ch3.run("!s exsper &114514 :3 +HDDT");
if (data.param.beatmapid !== 114514 || data.param.mods !== 72)
    throw "Error";



let ch4 = new CommandHelper(["!", "?"], [{ server: 1 }, { server: 2 }]);
let ci4 = new CommandInfo("best", ["bp"], "bp");
let p4_1 = new Param("from", ["@from", "@start"], dataType.date);
let p4_2 = new Param("to", ["@to", "@end"], dataType.date);
ci4.addParam([param_user, param_mode, p4_1, p4_2]);
ch4.add(ci4);
data = ch4.run("!bp exsper @from 2012-12-12 @end 2222-2-22");
if (data.param.from.toString() !== new Date("2012-12-12").toString() || data.param.to.toString() !== new Date("2222-2-22").toString())
    throw "Error";
let data2 = ch4.run("!bP kk");
let data3 = ch4.run("?Bp kk");
if (data2.server !== 1 || data3.server !== 2)
    throw "Error";


let ch5 = new CommandHelper(["!", "！"]);
let ci5_1 = new CommandInfo("score1", ["score1", "s1"], "成绩");
let ci5_2 = new CommandInfo("score2", ["score2", "s2"], "成绩");
let p5_1 = new Param("mode", "#", dataType.string, true);
let p5_2 = new Param("mode", "#", dataType.string, false);
ci5_1.addParam([p5_1, param_user]);
ci5_2.addParam([p5_2, param_user]);
ch5.add([ci5_1, ci5_2]);
data = ch5.run("!s1#catch exsper");
if (data.param.mode !== "catch" || data.param.user !== "exsper")
    throw "Error";
data2 = ch5.run("!S2#catch exsper");
if (data2.param.mode !== "catch exsper" || data2.param.user)
    throw "Error";

ch5.del("s2");
data = ch5.run("!S1#catch exsper");
if (data.param.mode !== "catch" || data.param.user !== "exsper")
    throw "Error";
data2 = ch5.run("!s2#catch exsper");
if (JSON.stringify(data2) !== "{}")
    throw "Error";

ch5.add(ci5_2);
data2 = ch5.run("!s2#catch exsper");
if (data.param.mode !== "catch" || data.param.user !== "exsper")
    throw "Error";
ch5.disableCi("s2");
data2 = ch5.run("!score2#catch exsper");
if (JSON.stringify(data2) !== "{}")
    throw "Error";
ch5.enableCi("score2");
data2 = ch5.run("!s2#catch exsper");
if (data.param.mode !== "catch" || data.param.user !== "exsper")
    throw "Error";

console.log("test pass!")


