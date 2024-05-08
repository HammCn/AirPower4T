<p align="center">
  <img width="300" src="../assets/img/airpower.svg"/> <b>4T</b>
</p>

<p align="center">
  <img src="https://svg.hamm.cn?key=Lang&value=TypeScript&bg=green"/>
  <img src="https://svg.hamm.cn?key=Base&value=Vue3"/>
  <img src="https://svg.hamm.cn?key=Build&value=Vite"/>
  <img src="https://svg.hamm.cn?key=UI&value=ElementPlus"/>
</p>

## 📖 AirPower4T 使用文档

欢迎查阅 **AirPower4T** 的使用文档，本文将从 **设计理念**、**快速开始**、**目录结构**、**常用组件**、**常用装饰器**、**内置工具
** 等方面说明。

## 1. 设计理念

**AirPower4T** 是一个基于 **Vue3** 的 **TypeScript** 开发包，
它的灵感来自于 **Java SpringBoot JPA** 等后端开发思想，使用了大量的 **类**、**枚举**、**接口**、**装饰器** 等，
提供了很多基于 **Element Plus** 的常用后台管理组件，帮助开发者快速开发 **Web 应用**。

**AirPower4T** 的设计理念是 **面向对象编程**，将一切能抽象的功能、数据结构、服务封装为 **类**，
使用类的继承来实现一些代码的复用，减少重复代码，使代码更加清晰易读。
使用装饰器来实现一些 **常用组件**、**数据转换规则**、**前端显示文案** 等信息的配置，使组件的配置更集中、灵活、直观。

## 2. 快速开始

**AirPower4T** 目前使用子目录的方式提供，你可以将 **AirPower4T** 源代码下载或克隆后命名为 **airpower** 添加到你的项目的 *
*src** 目录下，然后使用 **Vite** 构建你的项目。

推荐你直接使用我们提供的 **WebStarter**
模板来快速开启一个项目：via [Gitee](https://gitee.com/air-power/AirPowerWebStarter/blob/main/README.md) / [Github](https://github.com/HammCn/AirPowerWebStarter/blob/main/README.md)

## 3. 目录结构

```bash
├── App.vue           # 根组件
├── assets            # 静态资源
│   ├── css           # 样式
├── base              # 基类
├── component         # 组件
├── config            # 配置
├── decorator         # 装饰器
├── enum              # 枚举（常见枚举类型）
├── feedback          # 反馈类（弹窗、确认、加载、通知）
├── helper            # 助手类
├── hook              # 常用hook
├── interface         # 接口
├── model             # 模型
│   ├── entity        # 实体类
│   └── extend        # 扩展类
├── store             # 状态管理
├── type              # 类型
├── view              # 页面
└── websocket         # WebSocket
```

## 4. 常用组件

    请注意，我们虽然提供了一些组件，但为了区分，建议直接从 `@/airpower/component` 中导入，避免直接导入我们提供的原始文件。

### 4.1 `AButton` 按钮

#### AButton 参数

|     参数名     |   类型    |    默认值    |                  描述                   |
|:-----------:|:-------:|:---------:|:-------------------------------------:|
| customClass | String  |    ''     |                自定义样式类                 |
| permission  | String  | undefined |             权限标识 如无权限 将禁用             |
|   tooltip   | String  |    ''     |         提示文字 如不提供 不显示tooltip          |
|    icon     | String  |    ''     |                自定义图标类名                |
|    type     | String  |    ''     | 常用图标(仅支持传入 ```AirIconType``` 支持的图标类型) |
| iconButton  | Boolean |   false   |                是否图标按钮                 |
| linkButton  | Boolean |   false   |                是否链接按钮                 |
|   primary   | Boolean |   false   |                是否是主按钮                 |
|   danger    | Boolean |   false   |                是否是危险按钮                |
|  disabled   | Boolean |   false   |                是否禁用按钮                 |

#### AButton 事件

|  事件名称   | 参数 |  描述  |
|:-------:|:--:|:----:|
|  click  | -  | 点击事件 |
| onClick | -  | 点击事件 |

#### AButton 插槽

|  插槽名称   | 参数 |    描述     |
|:-------:|:--:|:---------:|
| default | -  | 默认插槽，按钮内容 |

### 4.2 `ACopy` 一键复制

#### ACopy 参数

|   参数名   |   类型   | 默认值 |  描述   |
|:-------:|:------:|:---:|:-----:|
| content | String | ''  | 复制的内容 |

#### ACopy 插槽

|  插槽名称   | 参数 |      描述      |
|:-------:|:--:|:------------:|
| default | -  | 默认插槽，复制显示的内容 |

### 4.3 `ADateTime` 日期时间

#### ADateTime 参数

|    参数名     |   类型    |             默认值             |    描述    |
|:----------:|:-------:|:---------------------------:|:--------:|
|    time    | Number  |              0              |  毫秒时间戳   |
| formatter  | String  | AirConfig.dateTimeFormatter | 时间格式化模板  |
| isFriendly | Boolean |            false            | 是否显示友好时间 |

### 4.4 `ADialog` 弹窗

#### ADialog 参数

| 参数名            | 类型      | 默认值 | 描述          |
|----------------|---------|-----|-------------|
| title          | String  | -   | 弹窗标题        |
| confirmText    | String  | -   | 确定按钮文字      |
| cancelText     | String  | -   | 取消按钮文字      |
| width          | String  | -   | 宽度          |
| height         | String  | -   | 高度          |
| minWidth       | String  | -   | 最小宽度        |
| minHeight      | String  | -   | 最小高度        |
| hideCtrl       | Boolean | -   | 隐藏底部控制栏     |
| hideFooter     | Boolean | -   | 隐藏Footer    |
| hideConfirm    | Boolean | -   | 隐藏确认按钮      |
| disableConfirm | Boolean | -   | 是否禁用确认按钮    |
| hideCancel     | Boolean | -   | 隐藏取消按钮      |
| hideClose      | Boolean | -   | 隐藏右上角关闭     |
| loading        | Boolean | -   | 是否正在Loading |
| fullable       | Boolean | -   | 允许显示全屏按钮    |
| fullScreen     | Boolean | -   | 是否全屏        |
| formRef        | Object  | -   | Form的Ref实例  |
| isSelector     | Boolean | -   | 是否是选择器      |
| hoverClose     | Boolean | -   | 是否支持点击遮罩层关闭 |

#### ADialog 事件

|   事件名称    | 参数 |  描述  |
|:---------:|:--:|:----:|
| onCancel  | -  | 取消事件 |
|  onFull   | -  | 全屏事件 |
| onConfirm | -  | 确认事件 |

#### ADialog 插槽

|     插槽名称     | 参数 |     描述      |
|:------------:|:--:|:-----------:|
|   default    | -  |   默认插槽，内容   |
| middleButton | -  | 右下角操作按钮中间插槽 |
|   leftCtrl   | -  | 右下角操作区左侧插槽  |
|    status    | -  |   左下角状态插槽   |

### 4.5 `AEmpty` 空数据

#### AEmpty 插槽

|  插槽名称   | 参数 |   描述    |
|:-------:|:--:|:-------:|
| default | -  | 默认插槽，内容 |

### 4.6 `AFrame` 框架

#### AFrame 参数

| 参数名          | 类型      | 默认值   | 描述          |
|--------------|---------|-------|-------------|
| menuWidth    | Number  | 250   | 左侧宽度        |
| menuList     | Array   | -     | 菜单列表        |
| uniqueOpened | Boolean | false | 是否只保持展开一个菜单 |
| hideMenu     | Boolean | false | 是否隐藏菜单      |

### AFrame 插槽

| 插槽名称      | 参数 | 描述        |
|-----------|----|-----------|
| logo      | -  | 左上角logo插槽 |
| navigator | -  | 导航栏插槽     |
| user      | -  | 右上角用户插槽   |
| default   | -  | 默认主题插槽    |

### 4.7 `AGroup` 分组框

#### AGroup 参数

| 参数名             | 类型      | 默认值   | 描述       |
|-----------------|---------|-------|----------|
| title           | String  | -     | 分组标题     |
| column          | Number  | 1     | 列数       |
| autoHeight      | Boolean | false | 是否自适应高度  |
| autoCol         | Boolean | false | 列数自适应    |
| disableCollapse | Boolean | false | 是否禁用展开收起 |
| collapse        | Boolean | false | 是否默认收起   |

#### AGroup 插槽

| 插槽名称    | 参数 | 描述       |
|---------|----|----------|
| default | -  | 默认插槽，内容  |
| custom  | -  | 右上角自定义插槽 |
| tips    | -  | 提示插槽     |

### 4.8 `AImage` 图片

#### AImage 参数

| 参数名            | 类型      | 默认值   | 描述         |
|----------------|---------|-------|------------|
| src            | String  | -     | 图片地址       |
| clearable      | Boolean | false | 是否显示删除图标   |
| placeholder    | String  | -     | 提示文本       |
| upload         | Boolean | false | 是否允许上传     |
| showTips       | Boolean | false | 是否显示上传tips |
| imageConfig    | Object  | -     | 图片配置       |
| limit          | Number  | -     | 限制上传的大小    |
| exts           | Array   | -     | 允许上传的格式    |
| uploadUrl      | String  | -     | 上传地址       |
| headers        | Object  | -     | 请求头        |
| uploadFileName | String  | -     | 上传文件的字段名   |
| entity         | Object  | -     | 接收的文件实体类   |

#### AImage 事件

|   事件名称   | 参数 |  描述  |
|:--------:|:--:|:----:|
| onUpload | -  | 上传事件 |
| onRemove | -  | 删除事件 |

### 4.9 `AInput` 输入框

#### AInput 参数

| 参数名               | 类型       | 默认值   | 描述        |
|-------------------|----------|-------|-----------|
| modelValue        | String   | -     | 值         |
| modelModifiers    | Object   | -     | 值         |
| disabled          | Boolean  | false | 是否禁用      |
| readonly          | Boolean  | false | 是否只读      |
| disabledValue     | String   | -     | 禁用时显示的值   |
| dateShowFormatter | String   | -     | 显示的格式化方式  |
| entity            | Object   | -     | 接收的文件实体类  |
| placeholder       | String   | -     | 提示文本      |
| list              | Array    | -     | 可选数组      |
| tree              | Array    | -     | 可选树结构     |
| showClear         | Boolean  | false | 是否显示清空的图标 |
| onSearch          | Function | -     | 远程搜索的回调方法 |

#### AInput 事件

|       事件名称        | 参数 |   描述   |
|:-----------------:|:--:|:------:|
|       blur        | -  | 失去焦点事件 |
|      onBlur       | -  | 失去焦点事件 |
|       focus       | -  | 获得焦点事件 |
|      onFocus      | -  | 获得焦点事件 |
|     onChange      | -  | 值改变事件  |
|      change       | -  | 值改变事件  |
| update:modelValue | -  | 值改变事件  |
|      onClear      | -  |  清空事件  |
|       clear       | -  |  清空事件  |

#### AInput 插槽

| 插槽名称   | 参数 | 描述    |
|--------|----|-------|
| append |    | 输入框后置 |
| suffix |    | 输入框后置 |

### 4.10 `AMenu` 菜单

defineProps({
/**

* # 菜单列表
* ---
* ### 💡 请确保传入的数组类型为 ```IMenu``` 的实现类

*/
menuList: {
type: Array as PropType<IMenu[]>,
required: true,
},

/**

* # 是否只保持展开一个菜单

*/
uniqueOpened: {
type: Boolean,
default: false,
},
})

#### AMenu 参数

| 参数名          | 类型      | 默认值   | 描述          |
|--------------|---------|-------|-------------|
| menuWidth    | Number  | 250   | 菜单宽度        |
| menuList     | Array   | -     | 菜单列表        |
| uniqueOpened | Boolean | false | 是否只保持展开一个菜单 |

### 4.11 `AMoney` 金额

#### AMoney 参数

| 参数名       | 类型     | 默认值 | 描述     |
|-----------|--------|-----|--------|
| money     | Number | -   | 金额     |
| precision | Number | -   | 小数精度   |
| direction | String | -   | 小数舍弃方式 |

### 4.12 `APage` 分页

#### APage 参数

| 参数       | 类型              | 默认值 | 说明   |
|----------|-----------------|-----|------|
| response | AirResponsePage | -   | 响应对象 |

#### APage 事件

| 事件       | 参数      | 说明 |
|----------|---------|----|
| onChange | AirPage | -  | 值改变事件 |
| change   | AirPage | -  | 值改变事件 |

### 4.13 `APanel` 面板

#### APanel 参数

| 参数名         | 类型      | 默认值 | 描述     |
|-------------|---------|-----|--------|
| title       | String  | -   | 标题     |
| description | String  | -   | 描述     |
| showTitle   | Boolean | -   | 是否显示标题 |
| hideFooter  | Boolean | -   | 是否隐藏底部 |
| hideIcon    | Boolean | -   | 是否隐藏图标 |
| fullable    | Boolean | -   | 是否允许全屏 |

#### APanel 插槽

| 插槽名称        | 参数 | 描述   |
|-------------|----|------|
| icon        | -  | 图标   |
| headerRight | -  | 头部右侧 |
| footerLeft  | -  | 底部左侧 |
| footerRight | -  | 底部右侧 |

### 4.14 `APhone` 手机

#### APhone 参数

| 参数名   | 类型     | 默认值 | 描述   |
|-------|--------|-----|------|
| phone | String | -   | 手机号码 |

### 4.15 `AQrcode` 二维码

#### AQrcode 参数

| 参数名     | 类型     | 默认值 | 描述 |
|---------|--------|-----|----|
| content | String | -   | 内容 |
| size    | Number | 200 | 大小 |

### 4.16 `ASelector` 选择器

#### ASelector 参数

| 参数名         | 类型        | 默认值 | 描述       |
|-------------|-----------|-----|----------|
| default     | String    | -   | 默认空值的提示  |
| placeholder | String    | -   | 提示信息     |
| selector    | Component | -   | 使用的选择器视图 |
| param       | Object    | -   | 选择器参数    |
| disabled    | Boolean   | -   | 是否禁用     |

#### ASelector 事件

| 事件       | 参数        | 描述 |
|----------|-----------|----|
| change   | AirEntity | -  | 值改变事件 |
| onChange | AirEntity | -  | 值改变事件 |
| clear    | -         | -  | 清空事件 |
| onClear  | -         | -  | 清空事件 |

### 4.17 `ATab` 标签

#### ATab 插槽

| 插槽名称    | 参数 | 描述 |
|---------|----|----|
| default | -  | -  |

### 4.18 `ATable` 表格

#### ATable 参数

| 参数名               | 类型       | 默认值 | 描述          |
|-------------------|----------|-----|-------------|
| dataList          | Array    | -   | 表格数据        |
| selectList        | Array    | -   | 默认选中的项      |
| fieldList         | Array    | -   | 表格字段        |
| fieldCacheKey     | String   | -   | 字段缓存Key     |
| emptyText         | String   | -   | 空文案         |
| showSelect        | Boolean  | -   | 是否显示多选      |
| hideIndex         | Boolean  | -   | 是否隐藏序号      |
| hideCtrl          | Boolean  | -   | 是否隐藏操作      |
| hideFieldSelector | Boolean  | -   | 是否隐藏字段选择    |
| ctrlWidth         | Number   | -   | 操作区宽度       |
| autoHeight        | Boolean  | -   | 是否自动撑起高度    |
| selectable        | Function | -   | 是否禁用多选      |
| showDetail        | Boolean  | -   | 是否显示详情      |
| showAdd           | Boolean  | -   | 是否显示添加      |
| showDelete        | Boolean  | -   | 是否显示删除      |
| customDelete      | Boolean  | -   | 是否自定义删除事件   |
| showMoreButton    | Boolean  | -   | 是否显示更多的下拉按钮 |
| entity            | Function | -   | 表格绑定的数据实体   |
| entityConfig      | Object   | -   | 表格配置        |
| treeProps         | Object   | -   |
| load              | Function | -   |
| defaultExpandAll  | Boolean  | -   | 是否展开树的所有项目  |
| deleteTitle       | String   | -   | 删除确认框提示标题   |
| deleteContent     | String   | -   | 删除确认框提示内容   |
| deleteInMore      | Boolean  | -   | 在更多里显示删除    |
| editInMore        | Boolean  | -   | 在更多里显示编辑    |
| detailInMore      | Boolean  | -   | 在更多里显示详情    |
| lazy              | Boolean  | -   | 是否懒加载       |

#### ATable 事件

| 事件       | 参数 | 描述       |
|----------|----|----------|
| onDetail | -  | 详情按钮点击事件 |
| onDelete | -  | 删除按钮点击事件 |
| onEdit   | -  | 编辑按钮点击事件 |
| onSelect | -  | 选中事件     |
| onAdd    | -  | 添加按钮点击事件 |
| onSort   | -  | 排序事件     |

#### ATable 插槽

| 插槽名称        | 参数 | 描述     |
|-------------|----|--------|
| default     | -  | -      |
| addButton   | -  | 添加按钮插槽 |
| customRow   | -  | 自定义行插槽 |
| endRow      | -  | 结束行插槽  |
| moreButtons | -  | 更多按钮插槽 |

### 4.19 `ATabs` 标签页

| 插槽名称    | 参数 | 描述 |
|---------|----|----|
| default | -  | -  |

### 4.20 `AToolBar` 工具栏

#### AToolBar 参数

| 参数                | 类型       | 默认值                       | 描述              |
|-------------------|----------|---------------------------|-----------------|
| addPermission     | String   | -                         | 左侧添加按钮的权限标识     |
| exportPermission  | String   | -                         | 右侧导出按钮的权限标识     |
| importPermission  | String   | -                         | 左侧导入按钮的权限标识     |
| searchParams      | Array    | -                         | 搜索的对象           |
| loading           | Boolean  | false                     | 加载的状态           |
| entity            | Function | -                         | 实体类             |
| showSearch        | Boolean  | undefined                 | 是否显示            |
| showFilter        | Boolean  | undefined                 | 是否显示更多筛选器       |
| hideAdd           | Boolean  | undefined                 | 隐藏添加按钮          |
| exportUrl         | String   | undefined                 | 导出接口地址 如传入则优先使用 |
| exportParam       | Object   | undefined                 | 导出的请求参数         |
| showExport        | Boolean  | false                     | 是否显示导出按钮        |
| exportAsync       | Boolean  | false                     | 异步导出            |
| importUrl         | String   | undefined                 | 导入接口地址          |
| importTemplateUrl | String   | undefined                 | 导入模板下载地址        |
| importTitle       | String   | undefined                 | 导入上传的标题         |
| showImport        | Boolean  | false                     | 是否显示导入按钮        |
| fileEntity        | Function | AirConfig.fileEntityClass | 导入的文件实体类        |
| service           | Function | -                         | 接口服务类           |
| searchPlaceholder | String   | undefined                 | 搜索框提示文案         |

#### AToolBar 事件

| 事件名称     | 参数 | 描述   |
|----------|----|------|
| onSearch | -  | 搜索事件 |
| onAdd    | -  | 添加事件 |
| onReset  | -  | 重置事件 |

#### AToolBar 插槽

| 插槽名称         | 参数 | 描述    |
|--------------|----|-------|
| beforeSearch | -  | 搜索前插槽 |
| afterSearch  | -  | 搜索后插槽 |
| afterButton  | -  | 按钮后插槽 |
| beforeButton | -  | 按钮前插槽 |

### 4.21 `ATreeBox` 树形选择器

#### ATreeBox 参数

| 参数名称             | 类型      | 默认值     | 描述       |
|------------------|---------|---------|----------|
| hideTree         | Boolean | false   | 隐藏树      |
| defaultExpandAll | Boolean | true    | 是否默认展开全部 |
| searchable       | Boolean | false   | 是否显示树搜索  |
| placeholder      | String  | '搜索...' | 树搜索提示文案  |
| treeData         | Array   | -       | 左侧树的数据   |
| hideIcon         | Boolean | true    | 是否隐藏图标   |
| isTreeLoading    | Boolean | false   | 树是否正在加载  |
| title            | String  | ''      | 标题       |
| width            | Number  | 300     | 左侧树的宽度   |
| collapse         | Boolean | false   | 是否可折叠    |
| defaultCollapse  | Boolean | false   | 默认折叠状态   |

#### ATreeBox 事件

| 事件名称     | 参数 | 描述     |
|----------|----|--------|
| onChange | -  | 树形选择事件 |

#### ATreeBox 插槽

| 插槽名称    | 参数 | 描述   |
|---------|----|------|
| default | -  | -    |
| icon    | -  | 图标插槽 |

### 4.22 `AUpload` 上传

#### AUpload 参数

| 参数名称            | 类型                      | 默认值                       | 描述                |
|-----------------|-------------------------|---------------------------|-------------------|
| onConfirm       | Function                | -                         | 标准确认返回            |
| onCustomConfirm | Function                | -                         | 自定义确认按钮事件         |
| onCustomSuccess | Function                | -                         | 自定义上传成功回调         |
| onCancel        | Function                | -                         | 标准取消返回            |
| title           | String                  | '文件上传'                    | 上传弹窗中的标题          |
| confirmText     | String                  | -                         | 确认按钮的文字           |
| maxSize         | Number                  | 10 * 1024 * 1024          | 上传允许的最大文件大小 默认10m |
| uploadName      | String                  | AirConfig.uploadFileName  | 上传文件使用的name属性     |
| uploadSuccess   | String                  | '上传成功'                    | 上传成功的文案提示         |
| uploadUrl       | String                  | ''                        | 手动指定的上传路径         |
| exts            | Array                   | ['jpg', 'jpeg', 'png']    | 允许上传的后缀           |
| entity          | ClassConstructor<IFile> | AirConfig.fileEntityClass | 接收文件的实体类          |
| data            | IJson                   | null                      | 上传文件同时发送的数据       |
| header          | IJson                   | null                      | 上传文件同时发送的header   |
| tips            | String                  | ''                        | 显示的提示文字           |

### 4.23 `AUser` 用户

#### AUser 参数

| 参数名称   | 类型     | 默认值 | 描述   |
|--------|--------|-----|------|
| user   | IUser  | -   | 用户信息 |
| width  | Number | 400 | 宽度   |
| height | Number | 300 | 高度   |

#### AUser 插槽

| 插槽名称    | 参数 | 描述   |
|---------|----|------|
| title   | -  | 标题   |
| default | -  | 默认插槽 |

### 5. 常用装饰器

## 6. 内置工具

