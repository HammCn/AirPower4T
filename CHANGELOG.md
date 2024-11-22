# AirPower4T 版本发布日志

## v3.0.0

### 🎉 Features:

- feat(Field): 提供了一个全新的 `@Field` 装饰器 

### 🐞 Bug fixes:

- refactor(type): 将 ClassConstructor 类型迁移至 AirType
- refactor(component): 重构工具栏组件中的 API 地址处理逻辑
- refactor(Service): 重构成功提示逻辑 
- docs(payload): 优化 Payload组件脚本标签属性顺序
- perf(component): 优化脱敏逻辑
- refactor(Dialog): 优化对话框组件的样式和功能
- refactor(ToolBar): 优化日期选择器的代码结构和配置
- refactor(Table): 优化 Table组件代码结构
- refactor(upload): 将 exts 属性重命名为 extensions
- refactor(selector): 重构选择器组件

## v2.4.3

### 🎉 Features:

- feat(Desensitize): 增加自定义脱敏符号功能

### 🐞 Bug fixes:

## v2.4.2

### 🎉 Features:

- feat(Table): 支持了表格列中脱敏数据的配置属性
- feat(Component): 提供了一个脱敏组件`ADesensitize`
- feat(Phone): 增强手机/固话号码中间位数隐藏功能 

## v2.4.1

### 🎉 Features:

- feat(Sort): ATable组件支持了清空排序

### 🐞 Bug fixes:

- fix(Dictionary): 修复获取全局配置字典失败的问题

## v2.4.0

### 🎉 Features:

- feat(Dictionary): 支持了string和number类枚举的装饰器标注

### 🐞 Bug fixes:

- fix(Dictionary): 将获取配置时字典的优先级提前

## v2.3.9

### 🎉 Features:

- feat(Selector): 支持了传入选择器默认筛选器
- feat(Entity): 支持了一个链式调用的setDisable()方法

### 🐞 Bug fixes:

- fix(Selector): 修复树列表和不分页列表渲染失败的BUG
- fix(Input): 修复具名插槽不生效的BUG
- fix(Input): 修复`AInput`的`append`插槽和装饰器优先级
- fix(TableField): 修复ITableFieldConfig的绝对导入路径

## v2.3.8

### 🎉 Features:

- feat(Field): 支持了配置枚举类到字典属性上

### 🐞 Bug fixes:

- fix(Decorator): 修复获取字典数组的正确数据类型
- fix(Input): 优化了获取列配置字典数据的逻辑
- fix(Table): 优化了获取列配置字典数据的逻辑
- fix(ToolBar): 优化了获取列配置字典数据的逻辑
- fix(Type): 显式定义了一些方法返回值类型

## v2.3.7

### 🎉 Features:

- feat(Search): 支持了一个配置是否可清空筛选的参数
- feat(ToolBar): 支持了默认的筛选器参数

### 🐞 Bug fixes:

- fix(Image): 直接提供了宽度和高度的配置替代类配置

## v2.3.6

### 🎉 Features:

- feat(IPayload): 提供了一个`Payload`标准接口

### 🐞 Bug fixes:

- fix(ISelector): 统一到 `IPayload` 接口
- fix(Copy): 优化`Copy`组件的行内展示样式
- fix(TableField): 移除泛型支持和冗余属性
- fix(ToolBar): 移除关键词搜索，更新搜索逻辑
- fix(Upload): 修改自定义上传成功的返回事件优先级

## v2.3.5

### 🎉 Features:

- feat(Table): 支持了行斑马纹和禁用状态
- feat(Config): 支持配置全局是否显示表格斑马纹

### 🐞 Bug fixes:

- fix(Dictionary): 修正AirDictionaryArray的导入路径
- fix(Service): 修改`newEntityInstance`为`protected`
- style(Code): 优化了一些代码风格和格式

## v2.3.4

### 🎉 Features:

- feat(Keys): 支持了一个键盘值枚举
- feat(Constant): 支持了一个AirConstant静态常量类

### 🐞 Bug fixes:

- fix(Constant): 使用常量替换树结构中的硬编码字符串
- fix(Validator): 优化了验证器的类型和生成逻辑
- fix(DateTime): 修复AirDateTime对象类型检查错误
- fix(Table): 更新AirTable字段配置中的默认图像大小
- fix(Entity): 简化AirEntity中的copyExposeId方法

## v2.3.3

### 🎉 Features:

- feat(Service): 新增可选的自定义请求URL参数

### 🐞 Bug fixes:

- fix(DateTime): 移除DateTime组件中不必要的CSS规则
- fix(Dialog): 优化Dialog组件字体和按钮的CSS
- fix(AirModel): 移除AirModel内处理'Sass.types'的代码行
- fix(DateTime): 优化`AirDateTime`中时间戳和日期格式化的逻辑
- fix(Group): 只有一列时自动方向改为纵向且支持最小高度

## v2.3.2

### 🎉 Features:

- feat(AirTree): 实现AirTree类转换树形数据结构

### 🐞 Bug fixes:

- fix(Core): 保证类型安全，移除不必要的any类型用法
- fix(AirProps): 优化事件类型定义
- fix(AirHttp): 保证设置正确的内容类型header
- fix(config): 将控制台输出从表格格式更改为日志格式
- fix(AirHttp): 防止在已包含协议时意外地附加baseUrl
- fix(AirHttp): 确保AirHttp错误处理后不再reject Promise
- fix(Service): 简化AirAbstractService中的http请求创建
- fix(Validator): 优化身份证验证逻辑
- fix(Decorator): 优化AirDecorator中的配置检索和字段配置逻辑
- fix(AirModel): 修正删除无用的数据字段的逻辑
- fix(Decorator): 添加类型装饰器参数目标类约束
- fix(Model): 在toJSON时跳过null或undefined的属性

### 📖 Docs

- docs(selector): 文档化onConfirm和onCancel回调函数
- docs(AirTree): 添加类注释，增强文档清晰度

## v2.3.1

### 🎉 Features:

- feat(Config): 支持禁用自动权限处理的配置

### 🐞 Bug fixes:

- style(Page): 优化了分页组件的样式
- fix(AirHttp): 修正AirHttp响应数据的解析方式

## v2.3.0

### 🐞 Bug fixes:

- fix(Page): 要求`element-plus`升级至`v2.8.0`
- fix(helper): 更新Element Plus最低版本
- fix(page): 调整页码padding以优化UI对齐

## v2.2.5

### 🐞 Bug fixes:

- fix(component): 调整Frame组件菜单宽度的默认值
- fix(Empty): 更新了空状态的图片
- fix(element-ui): 调整表格单元格内链接的间距
- fix(Dialog): 优化Dialog的标题样式
- fix(Frame): 优化顶部的边距和边框线
- fix(Panel): 标题默认为显示

## v2.2.4

### 🐞 Bug fixes:

- fix(Page): 优化了分页组件动态计算按钮宽度

## v2.2.3

### 🎉 Features:

- feat(AirDecorator): 支持了一个获取装饰器字典的方法

### 🐞 Bug fixes:

- fix(ASelector): 修复查询参数没有生效的BUG
- fix(Decorator): 优化了装饰器处理字典的方法
- fix(vite): 修改`vite.config.ts`到`vite.config.mts`

## v2.2.2

### 🐞 Bug fixes:

- fix(Table): 优化了表格插槽索引的数据类型为`Number`

## v2.2.1

### 🎉 Features:

- feat(AirModel): 支持了`sass types` 转换
- feat(ASelector): 添加一个更方便的选择器

### 🐞 Bug fixes:

- fix(useAirSelector): 修复`disableConfirm`不是响应式的BUG
- docs(airpower): 添加用户列表到README以展示服务支持

## v2.2.0

### 🎉 Docs:

- docs(注释): 修改了大量的注释代码,规范了注释风格

## v2.1.4

### 🎉 Features:

- feat(useAirSelector): 当多选且未选择任何数据禁用确认按钮

## v2.1.3

### 🎉 Features:

- feat(泛型): 为部分组件添加`props`和`emits`的泛型约束

## v2.1.2

### 🎉 Features:

- feat(type): 内置了一些标准数据类型别名
- feat(Rules): 添加了useAirEditor自定义验证器的类型约束

### 🐞 Bug fixes:

- fix(component): 修正组件及装饰器中导入路径的相对引用
- docs(IFieldConfig): 将@FieldName替换为@Field注解说明

## v2.1.1

### 🎉 Features:

- feat(Export): 内置了默认异步导出的相关方法
- feat(Search): 支持了输入框失去焦点触发搜索

## v2.1.0

### 🐞 Bug fixes:

- fix(Permission): 优化了权限验证逻辑

> 后端需同步升级到 `v2.1.0`

## v2.0.1

### 🎉 Features:

- feat(FormField): 支持了传入`list`和`tree`的参数

## v2.0.0

### 🎉 Features:

- release(v2.0.0): 发布了`v2.0.0`正式版本

## v1.5.1

### 🐞 Bug fixes:

- fix(Config): 修改授权令牌请求头默认值为 `Authorization`
- fix(注释): 优化了一些错误的注释

## v1.5.0

### 🐞 Bug fixes:

- fix(Breaking): 弃用了一些方法和装饰器
- fix(Decorator): 修复一个ES兼容问题

## v1.4.9

### 🐞 Bug fixes:

- rm(IEntity): 移除了没有使用的`IEntity`接口
- fix(Page): 修复分页组件输入异常的问题

## v1.4.8

### 🐞 Bug fixes:

- fix(Table): 修复多语言环境的提示文案错误
- fix(Dialog): 隐藏关闭按钮时`ESC`不触发自动关闭

## v1.4.7

### 🐞 Bug fixes:

- fix(Import): 优化了一些错误的绝对引用路径
- fix(Table): 禁用/启用/删除后不返回第一页

## v1.4.6

### 🎉 Features:

- feat(Entity): 提供了一个复制到只带ID的实体的方法
- feat(Hook): `useAirTableTree` 支持了配置不分页

### 🐞 Bug fixes:

- fix(Crypto): 优化了`aes`加解密的方法

## v1.4.5

### 🐞 Bug fixes:

- fix(Permission): 缓存权限Key错误的问题修复

## v1.4.4

### 🐞 Bug fixes:

- fix(Input): 修复输入重复emit的性能问题
- fix(Button): 修复按钮权限异常的BUG
- fix(ToolBar): 修复了搜索清空时触发两次的BUG

## v1.4.3

### 🎉 Features:

- feat(Dictionary): 提供了禁用启用的全局字典配置
- feat(Config): 提供了配置是否表格开启禁用启用按钮
- feat(Service): 提供了禁用启用的API默认调用和配置

### 🐞 Bug fixes:

- fix(BUG): 修复了一些错误的样式
- fix(Permission): 优化了权限列表的读取和缓存

## v1.4.2

### 🎉 Features:

- feat(ESC): 支持了`esc`只关闭最后弹出的对话框

### 🐞 Bug fixes:

- fix(Table): 为`allFieldList`添加了强制类型断言
- fix(Phone): 修复拨打电话组件不显示且无法拨打的问题
- fix(Table): 修复只有一个更多菜单时的居中问题

## v1.4.1

### 🎉 Features:

- feat(Table): 支持了个选择字段的缓存参数`fieldCacheKey`

### 🐞 Bug fixes:

- fix(Config): 优化数字大小配置的安全边界值
- fix(Input): 修复输入小数`1.02`类型失败的BUG
- fix(CSS): 优化了一些冗余像素的样式代码

## v1.4.0

### ⛔️ Breaking:

- (style): 优化了大量的代码风格

### 🎉 Features:

- feat(Selector): 提供了一个清除的监听事件

## v1.3.4

### 🐞 Bug fixes:

- fix(Qrcode): 修改一个错误导出的组件名称

## v1.3.3

### 🎉 Features:

- feat(Money): 支持了全局默认金额舍弃方向和配置

## v1.3.2

### 🎉 Features:

- feat(Money): 新增了金额组件且表格字段支持配置`money` `moneyPrecision`

### 🐞 Bug fixes:

- fix(Table): 更多按钮的间距调整

## v1.3.1

### 🎉 Features:

- feat(Table): 支持了行尾更多按钮的几个配置项
- feat(Selector): 支持了一个标准选择组件
- feat(FormField): 支持了`payload`的表单校验

### 🐞 Bug fixes:

- fix(Warnings): 修复了调试输出的部分警告问题
- fix(Input): 修复自定义后缀显示异常的问题
- fix(Selector): 修复错误的绝对依赖路径

## v1.3.0

### ⛔️ Breaking:

`AirConfig.tableLinkButton` 默认值修改为 `true`，你依然可以通过 `AirConfig.tableLinkButton = false` 来继续使用图标按钮

### 🎉 Features:

- feat(FormField): 支持配置`hide=true`将字段从`getFormFieldConfigList`中隐藏
- feat(Decorator): 支持了类和原型兼容获取装饰器配置

### 🐞 Bug fixes:

- fix(Upload): 参数实体类配置修改为可选
- fix(Frame): 修改菜单默认为允许多个同时展开
- fix(Hook): 优化`useAirTable`的刷新数据逻辑
- fix(ToolBar): 修复`watch`导致重复发起查询请求的问题
- fix(ToolBar): 输入搜索变更后发起搜索
- fix(AirConfig): 设置表格默认按钮样式为链接按钮

## v1.2.2

### ⛔️ Breaking:

- deprecate(v1.2.1): 弃用了`v1.2.1`版本

### 🎉 Features:

- feat(AirRand): 提供了一个获取随机颜色的方法
- feat(Decorator): 支持了类和原型兼容获取装饰器配置

### 🐞 Bug fixes:

- fix(Component): 修复两个错误的绝对引用地址
- fix(Dictionary): 弃用了`createCustom`方法
- fix(Input): 修改插槽和`FieldConfig`后置文字的显示优先级
- fix(AirModel): 修复数据转换默认值失败的BUG
- fix(Input): 优化`Input`组件字符串清空的数据处理逻辑
- fix(Phone): 优化`Phone`组件的显示和校验

## ~~v1.2.1 @Deprecated~~

### ~~🎉 Features:~~

- ~~feat(AirRand): 提供了一个获取随机颜色的方法~~
- ~~feat(Decorator): 支持了类和原型兼容获取装饰器配置~~

### ~~🐞 Bug fixes:~~

- ~~fix(Component): 修复两个错误的绝对引用地址~~
- ~~fix(Dictionary): 弃用了`createCustom`方法~~
- ~~fix(Input): 修改插槽和`FieldConfig`后置文字的显示优先级~~
- ~~fix(AirModel): 修复数据转换默认值失败的BUG~~

## v1.2.0

### ⛔️ Breaking:

- breaking(Version): 限制了`ElementPlus`的版本最小为`v2.6.0`

### 🎉 Features:

- feat(Version): 添加了版本助手类和依赖版本验证

### 🐞 Bug fixes:

- fix(Radio): 修复`ElementPlus`的历史遗留`label`屎问题 &PR#15525
- fix(Entity): 修复实体的错误继承问题
- fix(Copy): 修复复制组件的居中问题
- fix(ToolBar): 修复ToolBar自定义插槽不触发Search事件的bug
- fix(Input): 优化了一些事件名称和数据处理逻辑
- fix(ToolBar): 修复搜索输入后回车触发两次的问题

## v1.1.9

### 🎉 Features:

- feat(Image): 支持选择图片后显示到本地
- feat(Input): 支持了监听`blur`/`focus`事件
- feat(Qrcode): 支持了一个标准二维码生成组件
- feat(Phone): 支持了一个可扫码拨打的电话组件

### 🐞 Bug fixes:

- fix(Validator): 修复验证必填时错误的提示文案
- fix(Copy): 优化了复制组件的样式

## v1.1.8

### 🎉 Features:

- feat(I18n): 支持了一个I18n的工具类
- feat(I18n): 添加了一个I18n的语言包枚举
- feat(I18n): 内置了一个常用的语言包

### 🐞 Bug fixes:

- fix(Config): 修改默认令牌`header`为`authorization`
- style(Message): 修复来自ElementPlus修改的屎样式(#15912)

## v1.1.7

### 🎉 Features:

- feat(AirString): 提供了一个字符串处理类

### 🐞 Bug fixes:

- fix(Permission): 更新了`AirPermissionAction`部分错误的注释
- fix(Dictionary): 优化了`AirDictionaryArray`字典拷贝数据的问题
- fix(Path): 修改部分绝对路径为相对路径

## v1.1.6

### 🐞 Bug fixes:

- fix(Search): 修改搜索框默认宽度为`150`像素
- fix(AirModel): 修复简单类型数据嵌套转换失败的BUG

## v1.1.5

### 🎉 Features:

- feat(Image): 添加了一个上传的`Loading`状态
- feat(Table): 支持了图片显示的圆角配置
- feat(Upload): 支持指定上传的文件名,默认`file`

### 🐞 Bug fixes:

- fix(字典数组): `AirDictionaryArray`默认泛型修改为`IDictionary`
- fix(DateTime): 删除了格式化时间参数验证冗余代码
- fix(File): 优化`AirFile`格式化文件大小计算方式

## v1.1.4

### 🎉 Features:

- feat(Upload): 支持传入一个`tips`提示信息参数
- feat(Image): 上传支持传入自定义`headers`
- feat(Page): 添加了一个判断是否在当前首页的方法

### 🐞 Bug fixes:

- fix(User): 空头像无法弹出的BUG修复
- fix(Table): 修改操作区在`Windows`下的宽度显示异常问题

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

- feat(Hook): `useAirEditor` 支持传入操作成功的提示信息
- feat(Hook): 提供了一个标准 `useAirDetail` 的Hook
- feat(Image): 支持了是否允许移除已上传文件的prop参数
- feat(Image): 支持了一个placeholder的prop参数
- feat(Table): 翻转了部分表格prop参数项的含义

### 🐞 Bug fixes:

- fix(AirProps): 修复 `airPropsXXX` 没有显性返回值类型的BUG

### 🐔 Styles:

- style(empty): 空状态图片修改
- style(Frame): 默认的插槽内容修改

## v1.0.1

### 🎉 Features:

- feat(useAirEditor): 支持了一个通用编辑表单内置的`useAirEditor`Hook
- feat(useAirTable): 支持了一个通用表格内置的`useAirTable`Hook
- feat(useAirSelector): 支持了一个通用选择器内置的`useAirSelector`Hook

## v1.0.0

### 🎉 Features:

- feat(AirPower4T): 发布了AirPower4T的第一个版本

### 🐞 Bugs:

- 404 - Bug not found!
