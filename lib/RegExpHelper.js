const dataType = require("./Globals").dataType;

/**
 * 构成有特定前缀的正则表达式
 * 
 * @param {Array<string>} prefixs 该参数的prefix
 * @param {number} _dataType
 * @param {Array<string>} ignorePrefixs 所有参数的prefix
 * @returns {RegExp} 正则表达式
 */
function buildPrefixParamExp(prefixs, _dataType, ignorePrefixs) {
    let starts = prefixs.join("");
    let ignores = ignorePrefixs.join("");
    if (_dataType === dataType.integer) return new RegExp(`[${starts}]([0-9]+)`, "i");
    if (_dataType === dataType.mods) return new RegExp(`[${starts}]([a-z0-9]+)`, "i");
    if (_dataType === dataType.date) return new RegExp(`[${starts}]([0-9]{4}-[0-9]{1,2}-[0-9]{1,2})`, "i");
    return new RegExp(`[${starts}]([^${ignores}]+)`, "i");
}

/**
 * 构成无前缀的正则表达式，只用于移除所有参数后剩余的最后一项
 * 
 * @param {number} _dataType
 * @param {Array<string>} ignorePrefixs 所有参数的prefix
 * @returns {RegExp} 正则表达式
 */
function buildNoPrefixParamExp(_dataType, ignorePrefixs) {
    let ignores = ignorePrefixs.join("");
    if (_dataType === dataType.integer) return new RegExp(`([0-9]+)`, "i");
    if (_dataType === dataType.mods) return new RegExp(`([a-z0-9]+)`, "i");
    if (_dataType === dataType.date) return new RegExp(`([0-9]{4}-[0-9]{1,2}-[0-9]{1,2})`, "i");
    return new RegExp(`([^${ignores}]+)`, "i");
}

module.exports.buildPrefixParamExp = buildPrefixParamExp;
module.exports.buildNoPrefixParamExp = buildNoPrefixParamExp;
