# Hi AirPower!

> 项目的安装与初始化请先查看宿主项目

https://github.com/HammCn/AirPowerWebStarter

## What's this?

为了满足前端开发标准化、工程化、系统化等等需求，我们设计并开发了一个开发组件库和常用类库和方法库的集合基础脚手架，其中包含了一些页面通用的布局、常用的弹窗和交互、提示信息以及网络请求，强类型面向对象的约束规范等，以满足日常开发的快捷、稳健、标准化等要求。

## Why named **AirPower**

早期是子仓库方式的设计, 这个依赖库跟宿主项目在一起, 所以为了排前面, 选择使用**A**开头的单词, 后来想起 **Apple** 家难产了的一个产品的名称, **AirPower**, 作者是Apple十年老粉, 那就顺便致敬下 **Apple**. 

## How to use?

你可以在你的 **Vue3 & TypeScript & ElementPlus** 项目中直接从 **npm** 安装这个依赖库:

```bash
yarn add airpower 
// or
npm install airpower
```

然后在你的 **main.ts** 中从 **airpower** 导入 **app**, 然后挂载到DOM上即可:

```typescript
import { app } from 'airpower'
app.mount('#app')
```

## Suggestions

我们推荐了一个 [AirPower宿主仓库](https://github.com/HammCn/AirPowerWebStarter), 里面提供了一些 ```ESlint规则``` ```路由配置``` ```环境变量配置``` ```tsconfig``` ```vite.config```, 以及很多的 **demo** 代码, 你可以进行参考, 当然, 你也可以阅读我们的开发文档: [AirPower开发文档](https://apt.hamm.cn)

## Enjoy it

好了, 那么接下来你可以愉快的开发了, 如果你有什么建议或者意见, 可以在本仓库中提交你的 **issues**, 你可以为这个依赖库进行 **添砖加瓦**!

> Java: 加瓦? 什么Java?