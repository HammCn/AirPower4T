<p align="center">
  <img width="300" src="./assets/img/airpower.png"/>
</p>

<p align="center">
  <img src="https://svg.hamm.cn?key=Lang&value=TypeScript&bg=green"/>
  <img src="https://svg.hamm.cn?key=Base&value=Vue3"/>
  <img src="https://svg.hamm.cn?key=Build&value=Vite"/>
  <img src="https://svg.hamm.cn?key=UI&value=ElementPlus"/>
</p>



## What's this?

> 你可以先阅读 [掘金专栏](https://juejin.cn/post/7273290114921889807) 的一些文章，也可以体验 [线上示例DEMO](https://service.hamm.cn)

为了满足前端开发标准化、工程化、系统化等等需求，我们设计并开发了一个开发组件库和常用类库和方法库的集合基础脚手架，其中包含了一些页面通用的布局、常用的弹窗和交互、提示信息以及网络请求，强类型面向对象的约束规范等，以满足日常开发的快捷、稳健、标准化等要求。


AirPower是一个基于Vue3+TypeScript+ElementPlus+Vite的开发基础库，使用TypeScript的装饰器/反射/面向对象/类转换等前端开发方式。开发者交流QQ群：555156313

## Why named **AirPower**

早期是子仓库方式的设计, 这个依赖库跟宿主项目在一起, 所以为了排前面, 选择使用**A**开头的单词, 后来想起 **Apple** 家难产了的一个产品的名称, **AirPower**, 作者是Apple十年老粉, 那就顺便致敬下 **Apple**. 

## Show me the features

1. **Model** / **Entity** 所有的数据交互都以数据模型实例的方式进行, 不再直接使用JSON.
2. **Service** 使用服务类对所有的网络请求进行抽象, 通过继承方式实现相似代码的复用
3. **Component** 提供了很多后台管理系统常用的组件和一些反馈组件
4. **Hook** 提供了与Service交互的一些通用的交互Hooks
5. **Enum** 提供了很多很多很多的枚举
6. **Decorator** 提供了很多很多很多的装饰器
7. 提供了类似 **Java** BeanCopy 相关的数据转换方式, 提供了完整的面向对象实现
8. ......

## How to use?

你可以通过我们提供的 ```AirPowerWebStarter``` 项目提供的一键初始化脚本来完成 **AirPower** 宿主项目的初始化:

```bash
git clone https://github.com/HammCn/AirPowerWebStarter.git &&
cd AirPowerWebStarter/src && 
git clone https://github.com/HammCn/AirPower4T.git airpower && cd ../ &&
yarn && cp .env.dev .env && yarn s
```

## Suggestions

我们提供的 [AirPower宿主仓库](https://github.com/HammCn/AirPowerWebStarter), 里面提供了一些 ```ESlint规则``` ```路由配置``` ```环境变量配置``` ```tsconfig``` ```vite.config```, 以及很多的 **demo** 代码, 你可以进行参考, 当然, 你也可以阅读我们的开发文档: [AirPower开发文档](https://apt.hamm.cn)

## Enjoy it

好了, 那么接下来你可以愉快的开发了, 如果你有什么建议或者意见, 可以在本仓库中提交你的 **issues**, 你可以为这个依赖库进行 **添砖加瓦**!

> Java: 加瓦? 什么Java?
