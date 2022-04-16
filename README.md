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

CommandHelper构造函数具有3个参数，分别为

 - 指令前缀 可以为单个字符串，也可为字符串数组
```javascript
let ch1 = new CommandHelper("!");
let ch2 = new CommandHelper(["!", "！"]);
```
 - 帮助指令 字符串格式，显示具体指令的帮助，默认为```help```
```javascript
let ch3 = new CommandHelper(["!", "！"], "帮助");
let ci = new CommandInfo("bindaccount", ["bind", "set", "setid"], "绑定", [param_user, param_mode]);
ch3.add(ci);
let data = ch3.run("！帮助 bind");
console.log(data.help);
```
```javascript
data.help = "绑定\n指令：bind/set/setid\n参数：user :mode"
```
- 初始指令格式 为CommandInfo数组，可以省略该参数，后面用```add()```添加
```javascript
let ci = new CommandInfo("bindaccount", ["bind", "set", "setid"], "绑定", [param_user, param_mode]);
let ch4 = new CommandHelper(["!", "！"], "帮助", [ci]);
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

 - 指令说明 帮助里会用到

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

Param构造函数具有3个参数，分别为

 - 参数名称 字符串，该参数的名称

 - 参数前缀 字符串或字符串数组，无前缀请用""或[]，如果非单字节第一位必须要为符号

一条指令最多只能有一个无前缀参数！

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

你也可以使用自定义参数

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

## issue

有任何问题或建议可以提交issue
