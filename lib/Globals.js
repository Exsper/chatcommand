const dataType = {
    /** 任意字符串 */
    string: 0,
    /** 纯数字 */
    integer: 1,
    /** 多项mods */
    mods: 2,
    /** 日期 */
    date: 3,
}

/**
 * 计算mods数值
 * @param {String} modsString mods字符串，都是两个字母缩写
 * @returns {Number} mods value
 */
function getEnabledModsValue(modsString) {
    const mods = {
        NM: 0, // None
        NF: 1,
        EZ: 2,
        TD: 4, // TouchDevice
        HD: 8,
        HR: 16,
        SD: 32,
        DT: 64,
        RX: 128, // Relax
        HT: 256,
        NC: 512, // Only set along with DoubleTime. i.e: NC only gives 576
        FL: 1024,
        // Autoplay : 2048,
        SO: 4096,
        AP: 8192, // Autopilot
        PF: 16384, // Only set along with SuddenDeath. i.e: PF only gives 16416
        '4K': 32768,
        '5K': 65536,
        '6K': 131072,
        '7K': 262144,
        '8K': 524288,
        FI: 1048576,
        RD: 2097152, // Random
        // Cinema : 4194304,
        // Target : 8388608,
        '9K': 16777216,
        // KeyCoop : 33554432,
        '1K': 67108864,
        '3K': 134217728,
        '2K': 268435456,
        V2: 536870912, // ScoreV2
        MR: 1073741824 // Mirror
        // KeyMod : Key1 | Key2 | Key3 | Key4 | Key5 | Key6 | Key7 | Key8 | Key9 | KeyCoop,
        // FreeModAllowed : NoFail | Easy | Hidden | HardRock | SuddenDeath | Flashlight | FadeIn | Relax | Relax2 | SpunOut | KeyMod,
        // ScoreIncreaseMods : Hidden | HardRock | DoubleTime | Flashlight | FadeIn
    };
    let sum = 0;
    let i = 0;
    const length = modsString.length;
    while (i + 2 <= length) {
        const s = modsString.substring(i, i + 2);
        if (mods[s] !== undefined) {
            if (s === 'NC') sum = sum + mods.DT;
            else if (s === 'PF') sum = sum + mods.SD;
            sum = sum + mods[s];
        }
        i += 2;
    }
    return sum;
}

/**
 * 转化数据格式
 * @param {string} data 
 * @param {number} _dataType 
 * @returns 
 */
function parseData(data, _dataType) {
    if (_dataType == dataType.integer) return parseInt(data);
    if (_dataType == dataType.date) return new Date(data);
    if (_dataType == dataType.mods) return getEnabledModsValue(data);
    else return data;
}


module.exports.dataType = dataType;
module.exports.parseData = parseData;
