const Param = require("./Param").Param;
const parseData = require("./Globals").parseData;

class RegExpInfo {
    constructor(name, type, reg) {
        this.name = name;
        this.type = type;
        this.reg = reg;
    }
}

class CommandInfo {
    /**
     * 指令格式
     * @param {string} type 指令类别
     * @param {string|Array<string>} base 指令名称
     * @param {string|Array<string>} info 指令说明
     * @param {Array<Param>} param 指令参数
     */
    constructor(type, base, info, param = []) {
        /** 指令类别
         * @type string */
        this.type = type;
        /** 指令名称
         * @type Array<string> */
        this.base = (typeof base === "string") ? [base] : base;
        /** 指令说明
         * @type Array<string> */
        this.info = (typeof info === "string") ? [info] : info;
        /** 指令参数
         * @type Array<Param> */
        this.param = param;
        /** 参数前缀列表
         * @type Array<string> */
        this.prefixList = [];

        /** 带前缀的参数正则
         * @type Array<RegExpInfo> */
        this.regList = [];
        /** 不带前缀的参数正则，只能有1个
         * @type Array<RegExpInfo> */
        this.LastReg = [];

        this.build();
    }

    /**
     * @param {string} cmd 
     * @returns boolean
     */
    checkCmdEqual(cmd) {
        return this.base.some((b) => b.toLowerCase() === cmd.toLowerCase());
    }

    /**
     * @param {string} cmd 
     * @returns boolean
     */
    checkCmdContain(cmd) {
        return this.base.some((b) => (cmd.toLowerCase().indexOf(b.toLowerCase()) === 0));
    }

    /**
     * 给指令添加参数
     * @param {Param|Array<Param>} param 
     */
    addParam(param) {
        if (Array.isArray(param)) this.param.push(...param);
        else this.param.push(param);
        this.build();
        return this;
    }

    buildPrefixList() {
        this.prefixList = [];
        this.param.map((p) => {
            if (!p.noPrefix) {
                let pp1 = p.prefixs.map((pp) => pp.substring(0, 1));
                this.prefixList.push(...pp1);
            }
        });
    }

    buildRegs() {
        this.regList = [];
        this.LastReg = [];
        this.param = this.param.map((p) => {
            return p.setReg(this.prefixList);
        });
        this.param.map((p) => {
            if (p.noPrefix) this.LastReg.push(new RegExpInfo(p.name, p.dataType, p.reg));
            else this.regList.push(new RegExpInfo(p.name, p.dataType, p.reg));
        });
        if (this.LastReg.length > 1) console.warn("指令[" + this.base.join(", ") + "]的无前缀参数多于1条，这可能导致参数提取错误。");
    }

    build() {
        if (this.param.length <= 0) return this;
        this.buildPrefixList();
        this.buildRegs();
        return this;
    }

    /**
     * 获取该指令的帮助
     * @returns {string}
     */
    getHelp() {
        let output = this.info[0] + "\n";
        output += "指令：" + this.base.join("/") + "\n";
        output += "参数：" + this.param.map((p) => ((p.noPrefix) ? "" : p.prefixs[0]) + p.name).join("/");
        if (this.info.length > 1) output += "\n" + this.info.slice(1).join("\n");
        return output;
    }

    /**
     * 获取消息中的各项参数和值
     * @param {string} msg 已经去除指令本体的消息
     * @param {boolean} includeUnused 返回值包括消息中未被截取到的参数
     * @returns {object} 参数：值
     */
    getDatas(msg, includeUnused = false) {
        let s = msg;
        let data = {};
        this.regList.map((ri) => {
            let rst = ri.reg.exec(s);
            if (rst) {
                // rst[0]：找到的整句
                // rst[1]：整句中要的数据部分
                s = s.replace(rst[0], " ");
                data[ri.name] = parseData(rst[1].trim(), ri.type);
            }
        });
        this.LastReg.map((ri) => {
            let rst = ri.reg.exec(s);
            if (rst) {
                let d = rst[0].trim();
                if (!d) return;
                s = s.replace(rst[0], " ");
                data[ri.name] = parseData(rst[1].trim(), ri.type);
            }
        });
        if (includeUnused) {
            s = s.trim();
            if (s) data.unused = s;
        }
        return data;
    }
}

module.exports = CommandInfo;
