const CommandInfo = require("./CommandInfo").CommandInfo;

class CommandHelper {
    /**
     * 指令管理器
     * @param {string|Array<string>} prefixs 指令前缀
     * @param {string} helpCommand 帮助指令
     * @param {Array<CommandInfo>} commandInfos 指令格式
     */
    constructor(prefixs, helpCommand = "help", commandInfos = []) {
        /** 指令前缀
         * @type Array<string> */
        this.prefixs = (typeof prefixs === "string") ? [prefixs] : prefixs;
        /** 指令格式
         * @type Array<CommandInfo> */
        this.commandInfos = commandInfos;
        /** 指令本体列表
         * @type Array<string> */
        this.commandList = [];
        /** 帮助指令
         * @type string */
        this.helpCommand = helpCommand;

        this.build();
    }

    /**
     * 添加指令
     * @param {CommandInfo|Array<CommandInfo>} ci 
     */
    add(ci) {
        if (Array.isArray(ci)) this.commandInfos.push(...ci);
        else this.commandInfos.push(ci);
        this.build();
        return this;
    }

    buildCommandList() {
        this.commandList = [];
        this.commandInfos.map((ci) => {
            this.commandList.push(...ci.base);
        });
        if ([...new Set(this.commandList)].length < this.commandInfos.length) console.warn("定义了重复指令，这可能导致重复指令永远无法执行");
    }

    build() {
        if (this.commandInfos.length <= 0) return this;
        this.buildCommandList();
        return this;
    }

    /**
     * 从消息中获取指令及参数
     * @param {string} msg 消息
     * @returns {object} 指令和参数信息，如不匹配则为{}
     */
    run(msg = "") {
        let output = {};
        let s = msg.trim();
        if (!s) return output;
        let npf = this.prefixs.find((prefix) => s.startsWith(prefix));
        if (!npf) return output;
        s = s.substring(npf.length).trim();
        let cs = s.split(" ")[0];
        if (cs === this.helpCommand) {
            let cmd = s.substring(cs.length).trim();
            let h =this.commandInfos.find((ci) => {
                if (ci.base.indexOf(cmd) >=0) {
                    output.type = ci.type;
                    output.command = cs;
                    output.info = ci.info;
                    output.help = ci.getHelp();
                    return true;
                }
                else return false;
            });
            if (!h) output.help = "未找到该指令";
            return output;
        }
        else if (this.commandList.indexOf(cs) >= 0) {
            this.commandInfos.find((ci) => {
                if (ci.base.indexOf(cs) >=0) {
                    output.type = ci.type;
                    output.command = cs;
                    output.info = ci.info;
                    let ps = s.substring(cs.length).trim();
                    output.param = ci.getDatas(ps, true);
                    return true;
                }
                else return false;
            });
            return output;
        }
        else {
            this.commandInfos.find((ci) => {
                let cib = ci.base.find((b) => (s.startsWith(b)));
                if (!cib) return false;
                output.type = ci.type;
                output.command = cs;
                output.info = ci.info;
                let ps = s.substring(cib.length).trim();
                output.param = ci.getDatas(ps, true);
                return true;
            });
            return output;
        }
    }

}

module.exports = CommandHelper;
