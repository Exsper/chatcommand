let CommandHelper = require("./index").CommandHelper;
let CommandInfo = require("./index").CommandInfo;
let Param = require("./index").Param;
let param_index = require("./index").param_index;
let param_mode = require("./index").param_mode;
let param_mods = require("./index").param_mods;
let param_user = require("./index").param_user;
let dataType = require("./index").dataType;



let ch = new CommandHelper(["!", "！"]);
let ci1 = new CommandInfo("bindaccount", ["bind", "set", "setid"], "绑定", [param_mode, param_user]);
ch.add(ci1);
let data = ch.run("！bind Exsper:3");
if (data.type !== "bindaccount" || data.command !== "bind" || data.info !== "绑定" || data.param.mode !== 3 || data.param.user !== "Exsper")
    throw "Error";

let ci2 = new CommandInfo("recent", ["recent", "re"], "显示最近成绩", [param_user, param_mode, param_index]);
ch.add(ci2);
data = ch.run("! re  exsper  :1   #2 ");
if (data.type !== "recent" || data.command !== "re" || data.info !== "显示最近成绩" || data.param.mode !== 1 || data.param.user !== "exsper" || data.param.index !== 2)
    throw "Error";
data = ch.run(" ! help  recent ");
if (!data.help || data.help !== "显示最近成绩\n指令：recent/re\n参数：user :mode #index")
    throw "Error";

data = ch.run(" !unknown command");
if (JSON.stringify(data) !== "{}")
    throw "Error";
data = ch.run(" !help unknown command");
if (JSON.stringify(data) === "{}" || data.help !== "未找到该指令")
    throw "Error";

let ci3 = new CommandInfo("score", ["score", "s"], "成绩");
let p3_1 = new Param("beatmapid", "&", dataType.integer);
ci3.addParam([param_user, param_mode]);
ci3.addParam(param_mods).addParam(p3_1);
ch.add(ci3);
data = ch.run("!s exsper &114514 :3 +HDDT");
console.log(data.param);
if (data.param.beatmapid !== 114514 || data.param.mods !== 72)
    throw "Error";


console.log("test pass!")
