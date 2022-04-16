let CommandHelper = require("./index").CommandHelper;
let CommandInfo = require("./index").CommandInfo;
let Param = require("./index").Param;
let param_index = require("./index").param_index;
let param_mode = require("./index").param_mode;
let param_mods = require("./index").param_mods;
let param_user = require("./index").param_user;
let dataType = require("./index").dataType;



let ch1 = new CommandHelper(["!", "！"]);
let ci1 = new CommandInfo("bindaccount", ["bind", "set", "setid"], "绑定", [param_mode, param_user]);
ch1.add(ci1);
let data = ch1.run("！bind Exsper:3");
if (data.type !== "bindaccount" || data.command !== "bind" || data.info !== "绑定" || data.param.mode !== 3 || data.param.user !== "Exsper")
    throw "Error";

let ch2 = new CommandHelper(["!", "！"]);
let ci2 = new CommandInfo("recent", ["recent", "re"], "显示最近成绩", [param_user, param_mode, param_index]);
ch2.add(ci2);
data = ch2.run("! re  exsper  :1   #2 ");
if (data.type !== "recent" || data.command !== "re" || data.info !== "显示最近成绩" || data.param.mode !== 1 || data.param.user !== "exsper" || data.param.index !== 2)
    throw "Error";
data = ch2.run(" ! help  recent ");
if (!data.help || data.help !== "显示最近成绩\n指令：recent/re\n参数：user :mode #index")
    throw "Error";

data = ch2.run(" !unknown command");
if (JSON.stringify(data) !== "{}")
    throw "Error";
data = ch2.run(" !help unknown command");
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



let ch4 = new CommandHelper(["!", "！"]);
let ci4 = new CommandInfo("best", ["bp"], "bp");
let p4_1 = new Param("from", ["@from", "@start"], dataType.date);
let p4_2 = new Param("to", ["@to", "@end"], dataType.date);
ci4.addParam([param_user, param_mode, p4_1, p4_2]);
ch4.add(ci4);
data = ch4.run("!bp exsper @from 2012-12-12 @end 2222-2-22");
if (data.param.from.toString() !== new Date("2012-12-12").toString() || data.param.to.toString() !== new Date("2222-2-22").toString())
    throw "Error";

console.log("test pass!")
