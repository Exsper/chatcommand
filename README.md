# chatcommand

一套从聊天消息中获取指令和参数的框架

主要用于osu!qq群消息

## 安装

```
npm install Exsper/chatcommand
```

## 使用

### 示例

使用起来很简单
```javascript
const {CommandHelper, CommandInfo, param_user, param_mode} = require("chatcommand");
let ch = new CommandHelper(["!", "！"]);
let ci = new CommandInfo("bindaccount", ["bind", "set", "setid"], "绑定", [param_mode, param_user]);
ch.add(ci);
let data = ch.run("！bind Exsper:3");
console.log(data);
```
```javascript
data = {
  type: 'bindaccount',
  command: 'bind',
  info: '绑定',
  param: { mode: 3, user: 'Exsper' }
}
```



### 指令管理器 CommandHelper

#### 引用

```javascript
const {CommandHelper} = require("chatcommand");
```

#### 说明

CommandHelper构造函数具有4个参数，分别为

 - 指令前缀 可以为单个字符串，也可为字符串数组

```javascript
let ch1 = new CommandHelper("!");
let ch2 = new CommandHelper(["!", "！"]);
```

 - 额外参数 当有多个指令前缀时，给具体的指令加上指定的额外参数，如不需要该功能则设为[]

```javascript
let ch1_1 = new CommandHelper(["!", "?"], [{ server: 1 }, { server: 2 }]);
let ci1_1 = new CommandInfo("best", ["bp"], "bp列表", [param_user]);
ch1_1.add(ci1_1);
let data1 = ch1_1.run("!bp exsper");
let data2 = ch1_1.run("?bp exsper");
```

```javascript
data1 = {
  server: 1,
  type: 'best',
  command: 'bp',
  info: 'bp列表',
  param: { user: 'exsper' }
}
data2 = {
  server: 2,
  type: 'best',
  command: 'bp',
  info: 'bp列表',
  param: { user: 'exsper' }
}
```

 - 帮助指令 字符串或字符串数组，用于显示具体指令的帮助，默认为```["help"]```

如果是字符串形式，则其为帮助指令，返回指令列表

如果是数组形式，则其中第一个元素为帮助指令，其他元素作为返回信息

```javascript
let ch3 = new CommandHelper(["!", "！"], [], "帮助");
let ci = new CommandInfo("bindaccount", ["bind", "set", "setid"], "绑定", [param_user, param_mode]);
ch3.add(ci);
let data = ch3.run("！帮助 bind");
console.log(data.help);

let data2 = ch3.run("！帮助");
console.log(data2.help);

let ch3_1 = new CommandHelper(["!", "！"], [], ["帮助", "去官网查吧", "我懒"]);
let data2_1 = ch3_1.run("！帮助");
console.log(data2_1.help);
```

```javascript
data.help = "绑定\n指令：bind/set/setid\n参数：user/:mode"
data2.help = "指令列表：\nbind\n输入 help + 指令名称 查看具体指令帮助"
data2_1.help = "去官网查吧\n我懒"
```

- 初始指令格式 为CommandInfo数组，可以省略该参数，后面用```add()```添加

```javascript
let ci = new CommandInfo("bindaccount", ["bind", "set", "setid"], "绑定", [param_user, param_mode]);
let ch4 = new CommandHelper(["!", "！"], [], "帮助", [ci]);
```

### 指令管理

- ```add()```添加指令（默认直接启用）

- ```del()```删除指令（参数为指令格式中的一种指令字符串）

- ```enableCi()```启用指令（参数为指令格式中的一种指令字符串）

- ```disableCi()```停用指令（参数为指令格式中的一种指令字符串）

```javascript
let ch3 = new CommandHelper(["!", "！"], [], "帮助");
let ci = new CommandInfo("bindaccount", ["bind", "set", "setid"], "绑定", [param_user, param_mode]);

// 添加指令
ch3.add(ci);
// 删除指令
ch3.del("set");
// !set、!bind和!setid指令被永久删除

// 重新添加指令
ch3.add(ci);
// 停用指令
ch3.disableCi("set");
// !set、!bind和!setid指令被停用

// 启用指令
ch3.enableCi("set");
// !set、!bind和!setid指令又可以使用了
```





### 指令格式 CommandInfo

#### 引用

```javascript
const {CommandInfo} = require("chatcommand");
```

#### 说明

CommandInfo构造函数具有4个参数，分别为

```javascript
let ci = new CommandInfo("bindaccount", ["bind", "set", "setid"], "绑定", [param_user, param_mode]);
```

 - 指令类别 字符串格式，你在获取参数后处理时可能会用到

 - 指令名称 字符串或字符串数组，这是指令主体

 - 指令说明 字符串或字符串数组，帮助里会用到

如果是数组形式，则其中第一个元素为说明标题，其他元素将作为额外说明被添加到说明末尾

```javascript
let ci = new CommandInfo("bindaccount", ["bind", "set", "setid"],
           ["绑定", "允许的mode：osu=0/taiko=1/catch=2/mania=3"]);
```

 - 指令参数 为Param数组，可以省略该参数，后面用```addParam()```添加

```javascript
let ci = new CommandInfo("bindaccount", ["bind", "set", "setid"], "绑定");
ci.addParam([param_user, param_mode]);
// 或者
ci.addParam(param_user).addParam(param_mode);
```



### Param 参数格式

#### 引用

```javascript
const {Param} = require("chatcommand");
```

#### 说明

框架已经内置了几种参数格式，可以直接使用

```javascript
const {param_index, param_mode, param_mods, param_user} = require("chatcommand");

// 定义如下

const {dataType} = require("chatcommand");

/** mode 默认参数 */
const param_mode = new Param("mode", [":", "："], dataType.integer);
/** mods 默认参数 */
const param_mods = new Param("mods", ["+", "＋"], dataType.mods);
/** index 默认参数 */
const param_index = new Param("index", ["#", "＃"], dataType.integer);
/** user 默认参数 */
const param_user = new Param("user", [], dataType.string);
```

也可以使用自定义参数

```javascript
let ci = new CommandInfo("score", ["score", "s"], "成绩");
let p1 = new Param("beatmapid", "&", dataType.integer);
ci.addParam([param_user, param_mode, param_mods, p1]);

commandHelper.add(ci);
let data = commandHelper.run("!s exsper &114514 :3 +HDDT");
console.log(data.param);
```

```javascript
data.param = { mode: 3, mods: 72, beatmapid: 114514, user: 'exsper' }
```

Param构造函数具有4个参数，分别为

 - 参数名称 字符串，该参数的名称

 - 参数前缀 字符串或字符串数组，无前缀请用""或[]，如果非单字节第一位必须要为符号

一条指令最多只能有一个无前缀参数！无前缀参数请尽量放在末尾或最后一个导入

特别的，如果你习惯于```key value```形式的参数，那也可以在这里使用，但是第一位必须要用符号

```javascript
let ch4 = new CommandHelper(["!", "！"]);
let ci4 = new CommandInfo("best", ["bp"], "bp");
let p4_1 = new Param("from", ["@from", "@start"], dataType.date);
let p4_2 = new Param("to", ["@to", "@end"], dataType.date);
ci4.addParam([param_user, param_mode, p4_1, p4_2]);
ch4.add(ci4);
data = ch4.run("!bp exsper @from 2012-12-12 @end 2222-2-22");
```

```javascript
data.param = {
  from: 2012-12-12T00:00:00.000Z,
  to: 2222-02-21T16:00:00.000Z,
  user: 'exsper'
}
```

 - 数据格式 获取到参数后需要对其进行格式转换

```javascript
dataType = {
    /** 任意字符串 */
    string: 0,
    /** 纯数字 */
    integer: 1,
    /** 多项mods */
    mods: 2,
    /** 日期 */
    date: 3,
}
```

 - 以空格结束 这将使正则匹配改为非贪婪模式，一般情况下不建议使用

```javascript
let ch5 = new CommandHelper(["!", "！"]);
let ci5_1 = new CommandInfo("score1", ["score1", "s1"], "成绩");
let ci5_2 = new CommandInfo("score2", ["score2", "s2"], "成绩");
let p5_1 = new Param("mode", "#", dataType.string, true);
let p5_2 = new Param("mode", "#", dataType.string, false);
ci5_1.addParam([p5_1, param_user]);
ci5_2.addParam([p5_2, param_user]);
ch5.add([ci5_1, ci5_2]);
data1 = ch5.run("!s1#catch exsper");
// param: { mode: 'catch', user: 'exsper' }
data2 = ch5.run("!s2#catch exsper");
// param: { mode: 'catch exsper' }
```

## issue

有任何问题或建议可以提交issue
