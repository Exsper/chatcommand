const dataType = require("./Globals").dataType;
const buildPrefixParamExp = require("./RegExpHelper").buildPrefixParamExp;
const buildNoPrefixParamExp = require("./RegExpHelper").buildNoPrefixParamExp;

class Param {
    /**
     * 参数格式
     * 
     * 无前缀的参数格式，应在所有有前缀的参数都去除以后再提取，一条指令最多只能有一个无前缀参数
     * @param {string} name 参数名称
     * @param {string|Array<string>} prefixs 前缀，无前缀请用""或[]，如果非单字节第一位必须要为符号
     * @param {number} _dataType dataType
     * @param {boolean} endWithSpace 非贪婪模式，遇到空格就结束
     */
    constructor(name, prefixs, _dataType = dataType.string, endWithSpace = false) {
        /** 参数名称
         * @type string */
        this.name = name;
        /** 前缀
         * @type Array<string> */
        this.prefixs = (typeof prefixs === "string") ? [prefixs] : prefixs;
        /** 参数类型
         * @type number */
        this.dataType = _dataType;
        /** 以空格结束
         * @type boolean */
        this.endWithSpace = endWithSpace;

        /** 无前缀
         * @type boolean */
        this.noPrefix = (prefixs.length <= 0);

        /** 提取该参数的正则表达式
         * @type RegExp */
        this.reg = "";
    }

    /**
     * 设置正则表达式
     * @param {Array<string>} ignorePrefixs 
     */
    setReg(ignorePrefixs) {
        if (this.noPrefix) this.reg = buildNoPrefixParamExp(this.dataType, ignorePrefixs, this.endWithSpace);
        else this.reg = buildPrefixParamExp(this.prefixs, this.dataType, ignorePrefixs, this.endWithSpace);
        return this;
    }
}


/** mode 默认参数 */
const param_mode = new Param("mode", [":", "："], dataType.integer);
/** mods 默认参数 */
const param_mods = new Param("mods", ["+", "＋"], dataType.mods);
/** index 默认参数 */
const param_index = new Param("index", ["#", "＃"], dataType.integer);
/** user 默认参数 */
const param_user = new Param("user", [], dataType.string);

module.exports.Param = Param;
module.exports.param_mode = param_mode;
module.exports.param_mods = param_mods;
module.exports.param_index = param_index;
module.exports.param_user = param_user;
