# AirPower4T 版本发布日志

## v1.1.3

### 🎉 Features:

- feat(KeyEvent): 增加了删除快捷键`5s`内不操作超时
- feat(Button): 支持了传入`link-button`的文字类按钮
- feat(Table): 支持了全局`tableLinkButton`指定表格使用文字按钮

### 🐞 Bug fixes:

- fix(Group): 修改展示数据列数上限为`4`
- fix(Service): 修复删除调用后无阻塞的问题
- fix(Button): 修复禁用与权限优先级错误的问题
- fix(Table): 修改表格操作区默认宽度为`auto`
- fix(Hook): 修复`TableHook`重置分页对象可能为`undefined`的问题
- fix(Input): 修复`change`事件不返回变更后的值的问题

## v1.1.2

### 🎉 Features:

- feat(Table): 支持了`tableFieldCacheEnabled`表格列字段缓存配置
- feat(Frame): 支持通过`hideMenu`参数隐藏左侧菜单

### 🐞 Bug fixes:

- fix(IJson): 修改`IJson`的声明方式为接口
- fix(Service): 实体服务基类删除提醒失败的问题修复
- fix(User): 优化了右上角头像部分的样式
- fix(Search): 优化了搜索的展示方式
- fix(Empty): 修改占位图片的宽度和高度
- fix(Table): 树形数据的缩进样式修改

## v1.1.1

### 🎉 Features:

- feat(Http): 添加了允许携带`Cookies`请求的方法
- feat(Config): 支持了全局隐藏表格序号`hideTableIndex`
- feat(Http): 支持了部分成功后继续操作功能`continue`
- feat(Upload): 支持了自定义`Header`请求参数
- feat(Table): 支持了前置显示文本`prefixText`参数

### 🐞 Bug fixes:

- fix(Table): 优化了一些`Table`组件的样式
- fix(Copy): 修复`Number`类数据无法复制的BUG

## v1.1.0

### 🎉 Features:

- feat(TreeBox): 支持`hide-tree`参数隐藏左侧树选择器
- feat(Frame): 支持了配置是否只展开一个菜单

### 🐞 Bug fixes:

- fix(Hooks): 优化Table/Detail/Editor的Service类型

## v1.0.12

### 🎉 Features:

- feat(Tabs): 支持了一个Tabs/Tab组件

### 🐞 Bug fixes:

- fix(Frame): 删除底部版权信息显示
- fix(Menu): 优化菜单展开收起的样式
- fix(Permission): 自动生成权限前缀逻辑优化
- fix(Table): 修复装饰居右不生效的BUG
- fix(FormConfig): 优化获取表单装饰器配置的逻辑
- fix(Input): 输入数字大小验证异常的问题
- fix(Selector): 修复选择后无法回调事件的BUG
- fix(TreeHook): 优化useAirTable和useAirTableTree的使用方式

## v1.0.11

### 🎉 Features:

- feat(Decorator): 提供独立的IsArray装饰器

### 🐞 Bug fixes:

- fix(Hooks): 修复Edit钩子提交之后无ID返回的BUG
- fix(Upload): 上传失败后无法重新上传的bug修复

## v1.0.10

### 🎉 Features:

- feat(Type): type装饰器支持传入是否数组的配置
- feat(TreeBox): 支持了树选择框的折叠展开

## v1.0.9

### 🎉 Features:

- feat(IEntity): 提供了一个实体标准接口

### 🐞 Bug fixes:

- fix(Dictionary): 删除错误的继承关系
- fix(Type): 优化部分数据转换的预定义类型
- fix(Table): 空数据下提示图片的大小

## v1.0.8

### 🐞 Bug fixes:

- fix(Table): 分页多选数据丢失的BUG
- fix(Button): 修复Button配置项逻辑错误的注释
- fix(AirModel): 移除没用的注释行

## v1.0.7

### 🎉 Features:

- feat(AirModel): 支持静态创建实例时传入部分字段

### 🐞 Bug fixes:

- rm(Validate): 移除唯一校验的设计方案
- fix(类包装): 优化类包装无用的declare

## v1.0.6

### 🐞 Bug fixes:

- fix(Page): 分页数量过多可能卡顿的BUG
- fix(Dictionary): 优化查字典的重复代码
- fix(Dictionary): 优化创建字典重复代码

## v1.0.5

### 🎉 Features:

- feat(WebSocket): 添加断线重连机制


### 🐞 Bug fixes:

- fix(hook): 添加一个基础的props参数限制
- fix(Export): 修改导出模块的插槽
- fix(hooks): 优化hooks部分的重复代码
- fix(Input): 修复传入Tree的类型

## v1.0.4

### 🎉 Features:

- feat(Transform): 树的数组递归转为普通的数组
- feat(User): 用户弹窗插槽默认显示昵称

### 🐞 Bug fixes:

- fix(Props): 修复类型约束后代码不提示类型注释


- style(User): 默认弹窗的宽高修改
 
## v1.0.3

### 🎉 Features:

- feat(Websocket): 支持了一个Websocket服务类
- feat(OAuth2): 提供了Oauth2的配置和跳转

## v1.0.2

### 🎉 Features:

- feat(Hook): ```useAirEditor``` 支持传入操作成功的提示信息
- feat(Hook): 提供了一个标准 ```useAirDetail``` 的Hook
- feat(Image): 支持了是否允许移除已上传文件的prop参数
- feat(Image): 支持了一个placeholder的prop参数
- feat(Table): 翻转了部分表格prop参数项的含义


### 🐞 Bug fixes:

- fix(AirProps): 修复 ```airPropsXXX``` 没有显性返回值类型的BUG

### 🐔 Styles:

- style(empty): 空状态图片修改
- style(Frame): 默认的插槽内容修改

## v1.0.1

### 🎉 Features:

- feat(useAirEditor): 支持了一个通用编辑表单内置的```useAirEditor```Hook
- feat(useAirTable): 支持了一个通用表格内置的```useAirTable```Hook
- feat(useAirSelector): 支持了一个通用选择器内置的```useAirSelector```Hook

## v1.0.0

### 🎉 Features:

- feat(AirPower4T): 发布了AirPower4T的第一个版本

### 🐞 Bugs:

- 404 - Bug not found!