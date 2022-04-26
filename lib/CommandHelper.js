const CommandInfo = require("./CommandInfo").CommandInfo;

class CommandHelper {
    /**
     * 指令管理器
     * @param {string|Array<string>} prefixs 指令前缀
     * @param {Array<object>} prefixAdd 当有多个指令前缀时，给具体的指令加上指定的额外参数，如不需要该功能则设为[]
     * @param {string|Array<string>} helpCommand 帮助指令和说明
     * @param {Array<CommandInfo>} commandInfos 指令格式
     */
    constructor(prefixs, prefixAdd = [], helpCommand = ["help"], commandInfos = []) {
        /** 指令前缀
         * @type Array<string> */
        this.prefixs = (typeof prefixs === "string") ? [prefixs] : prefixs;
        /** 额外参数
         * @type Array<string> */
        this.prefixAdd = prefixAdd;
        /** 指令格式
         * @type Array<CommandInfo> */
        this.commandInfos = commandInfos;
        /** 已禁用指令
         * @type Array<CommandInfo> */
        this.disabledCommandInfos = [];
        /** 指令本体列表
         * @type Array<string> */
        this.commandList = [];
        /** 指令字典
         * @type Array<{base: string, ci: CommandInfo}> */
        this.commandDist = [];
        /** 帮助指令
         * @type string */
        this.helpCommand = (typeof helpCommand === "string") ? [helpCommand] : helpCommand;

        this.build();
    }

    /**
     * 添加指令（默认启用）
     * @param {CommandInfo|Array<CommandInfo>} ci 
     */
    add(ci) {
        if (Array.isArray(ci)) this.commandInfos.push(...ci);
        else this.commandInfos.push(ci);
        this.build();
        return this;
    }

    /**
     * 删除指令
     * @param {string} ba 指令主体
     */
    del(ba) {
        this.commandInfos = this.commandInfos.filter((ci) => {
            return (!ci.checkCmdEqual(ba));
        });
        this.build();
        return this;
    }

    /**
     * 停用指令
     * @param {string} ba 指令主体
     */
    disableCi(ba) {
        let find = this.commandInfos.filter((ci) => {
            return (ci.checkCmdEqual(ba));
        });
        if (find.length > 0) {
            this.disabledCommandInfos.push(...find);
            this.commandInfos = this.commandInfos.filter((ci) => {
                return (!ci.checkCmdEqual(ba));
            });
            this.build();
        }
        return this;
    }

    /**
     * 启用指令
     * @param {string} ba 指令主体
     */
    enableCi(ba) {
        let find = this.disabledCommandInfos.filter((ci) => {
            return (ci.checkCmdEqual(ba));
        });
        if (find.length > 0) {
            this.commandInfos.push(...find);
            this.disabledCommandInfos = this.disabledCommandInfos.filter((ci) => {
                return (!ci.checkCmdEqual(ba));
            });
            this.build();
        }
        return this;
    }

    buildCommandList() {
        this.commandInfos.map((ci) => {
            ci.base.map((b) => {
                let bl = b.toLowerCase();
                this.commandList.push(bl);
                this.commandDist.push({base: bl, ci: ci});
            });
        });
        if ([...new Set(this.commandList)].length < this.commandInfos.length) console.warn("定义了重复指令，这可能导致重复指令永远无法执行");
    }

    build() {
        this.commandList = [];
        this.commandDist = [];
        if (this.commandInfos.length <= 0) return this;
        this.buildCommandList();
        return this;
    }

    /**
     * 匹配指令本体
     * @param {string} cmd 
     * @returns {{base: string, ci: CommandInfo}}
     */
    matchingCmd(cmd) {
        let _cmd = cmd.toLowerCase();
        // 尝试完整匹配
        let r = this.commandDist.find((cd) => (cd.base === _cmd));
        if (r) return r;
        // 尝试包含匹配，但是尽量选取相同字数多的
        let sr = this.commandDist.filter((cd) => {
            return (_cmd.indexOf(cd.base) === 0);
        });
        if (!sr) return null;
        sr.sort((a,b) => {
            return (b.base.length - a.base.length);
        });
        return sr[0];
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
        let npfi = this.prefixs.findIndex((prefix) => s.startsWith(prefix));
        if (npfi < 0) return output;
        if (this.prefixAdd.length > 0) output = Object.assign(output, this.prefixAdd[npfi]);
        s = s.substring(this.prefixs[npfi].length).trim();
        let cs = s.split(" ")[0];
        if (cs.toLowerCase() === this.helpCommand[0].toLowerCase()) {
            let cmd = s.substring(cs.length).trim();
            if (!cmd) {
                // 纯help时
                if(this.helpCommand.length <=1) {
                    // 未指定help内容
                    output.help = "指令列表：\n" + this.commandInfos.map((ci) => ci.base[0]).join("\n") + "\n输入 help + 指令名称 查看具体指令帮助";
                }
                else {
                    output.help = this.helpCommand.slice(1).join("\n");
                }
                return output;
            }
            let h =this.commandInfos.find((ci) => {
                if (ci.checkCmdEqual(cmd)) {
                    output.type = ci.type;
                    output.command = cs;
                    output.info = ci.info[0];
                    output.help = ci.getHelp();
                    return true;
                }
                else return false;
            });
            if (!h) output.help = "未找到该指令";
            return output;
        }
        else {
            let match = this.matchingCmd(s);
            if(!match) return output;
            output.type = match.ci.type;
            output.command = match.base;
            output.info = match.ci.info[0];
            let ps = s.substring(match.base.length).trim();
            output.param = match.ci.getDatas(ps, true);
            return output;
        }
    }

}

module.exports = CommandHelper;
