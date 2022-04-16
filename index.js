const CommandHelper = require("./lib/CommandHelper");
const CommandInfo = require("./lib/CommandInfo");
const { Param, param_index, param_mode, param_user, param_mods} = require("./lib/Param");
const dataType = require("./lib/Globals").dataType;

module.exports.CommandHelper = CommandHelper;
module.exports.CommandInfo = CommandInfo;
module.exports.Param = Param;
module.exports.param_index = param_index;
module.exports.param_mode = param_mode;
module.exports.param_user = param_user;
module.exports.param_mods = param_mods;
module.exports.dataType = dataType;
