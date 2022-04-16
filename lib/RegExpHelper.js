const dataType = require("./Globals").dataType;

/**
 * 构成有特定前缀的正则表达式
 * 
 * @param {Array<string>} prefixs 该参数的prefix
 * @param {number} _dataType
 * @param {Array<string>} ignorePrefixs 所有参数的prefix
 * @param {boolean} endWithSpace 非贪婪模式，遇到空格就结束
 * @returns {RegExp} 正则表达式
 */
function buildPrefixParamExp(prefixs, _dataType, ignorePrefixs, endWithSpace = false) {
    let ends = (endWithSpace) ? "?)(?:\\s|$" :"";
    if (prefixs.some((p) => p.length > 1)) {
        let starts = prefixs.join("|");
        let ignores = ignorePrefixs.join("");
        if (_dataType === dataType.integer) return new RegExp(`(?:${starts})\\s*([0-9]+${ends})`, "i");
        if (_dataType === dataType.mods) return new RegExp(`(?:${starts})\\s*([a-z0-9]+${ends})`, "i");
        if (_dataType === dataType.date) return new RegExp(`(?:${starts})\\s*([0-9]{4}-[0-9]{1,2}-[0-9]{1,2}${ends})`, "i");
        return new RegExp(`(?:${starts})\\s*([^${ignores}]+${ends})`, "i");
    }
    else {
        let starts = prefixs.join("");
        let ignores = ignorePrefixs.join("");
        if (_dataType === dataType.integer) return new RegExp(`[${starts}]([0-9]+${ends})`, "i");
        if (_dataType === dataType.mods) return new RegExp(`[${starts}]([a-z0-9]+${ends})`, "i");
        if (_dataType === dataType.date) return new RegExp(`[${starts}]([0-9]{4}-[0-9]{1,2}-[0-9]{1,2}${ends})`, "i");
        return new RegExp(`[${starts}]([^${ignores}]+${ends})`, "i");
    }
}

/**
 * 构成无前缀的正则表达式，只用于移除所有参数后剩余的最后一项
 * 
 * @param {number} _dataType
 * @param {Array<string>} ignorePrefixs 所有参数的prefix
 * @param {boolean} endWithSpace 以空格结束
 * @returns {RegExp} 正则表达式
 */
function buildNoPrefixParamExp(_dataType, ignorePrefixs, endWithSpace = false) {
    let ends = (endWithSpace) ? "?)(?:\\s|$" :"";
    let ignores = ignorePrefixs.join("");
    if (_dataType === dataType.integer) return new RegExp(`([0-9]+${ends})`, "i");
    if (_dataType === dataType.mods) return new RegExp(`([a-z0-9]+${ends})`, "i");
    if (_dataType === dataType.date) return new RegExp(`([0-9]{4}-[0-9]{1,2}-[0-9]{1,2}${ends})`, "i");
    return new RegExp(`([^${ignores}]+${ends})`, "i");
}

module.exports.buildPrefixParamExp = buildPrefixParamExp;
module.exports.buildNoPrefixParamExp = buildNoPrefixParamExp;
