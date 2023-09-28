<p align="center">
  <img width="300" src="./assets/img/airpower.png"/>
</p>

<p align="center">
  <img src="https://svg.hamm.cn?key=Lang&value=TypeScript&bg=green"/>
  <img src="https://svg.hamm.cn?key=Base&value=Vue3"/>
  <img src="https://svg.hamm.cn?key=Build&value=Vite"/>
  <img src="https://svg.hamm.cn?key=UI&value=ElementPlus"/>
</p>


## 📖 这是个什么项目

> 你当前查看的是 ```web``` 分支，我们也同时提供了 [```wechat```(微信小程序)](https://github.com/HammCn/AirPower4T/tree/wechat) [```uniapp```(UniApp)](https://github.com/HammCn/AirPower4T/tree/uniapp) 等分支：） 你可以先阅读 [掘金专栏](https://juejin.cn/post/7273290114921889807) 的一些文章，也可以体验 [线上示例DEMO](https://service.hamm.cn)，如果你喜欢这个项目，欢迎给我们大大的 ⭐️⭐️⭐️

为了满足前端开发标准化、工程化、系统化等等需求，我们设计并开发了一个开发组件库和常用类库和方法库的集合基础脚手架，其中包含了一些页面通用的布局、常用的弹窗和交互、提示信息以及网络请求，强类型面向对象的约束规范等，以满足日常开发的快捷、稳健、标准化等要求。

**AirPower** 是一个基于 ```Vue3``` ```TypeScript``` ```Element Plus``` ```Vite``` 的开发基础库，使用 **装饰器**、**面向对象**、**Hook** 等前端开发方式。

## 🎈 为何起名**AirPower**

早期是子仓库方式的设计, 这个依赖库跟宿主项目在一起, 所以为了排前面, 选择使用**A**开头的单词, 后来想起 **Apple** 家难产了的一个产品的名称, **AirPower**, 作者是Apple十年老粉, 那就顺便致敬下 **Apple**. 

## 🎉 有哪些功能(设计)

1. **Model** / **Entity** 所有的数据交互都以数据模型实例的方式进行, 不再直接使用JSON.
2. **Service** 使用服务类对所有的网络请求进行抽象, 通过继承方式实现相似代码的复用
3. **Component** 提供了很多后台管理系统常用的组件和一些反馈组件
4. **Hook** 提供了与Service交互的一些通用的交互Hooks
5. **Enum** 提供了很多很多很多的枚举
6. **Decorator** 提供了很多很多很多的装饰器
7. 提供了类似 **Java** BeanCopy 相关的数据转换方式, 提供了完整的面向对象实现
8. ......

## 💻 代码风格展示

<img width="24%" src="https://github.com/HammCn/AirPower4T/assets/16929327/effac781-9f53-4809-8f90-de3a10e33cb4"/>
<img width="24%" src="https://github.com/HammCn/AirPower4T/assets/16929327/68ea8ea9-948b-477d-839f-64e132a63f62"/>
<img width="24%" src="https://github.com/HammCn/AirPower4T/assets/16929327/6a782594-e633-4220-b9df-6755a28bb48f"/>
<img width="24%" src="https://github.com/HammCn/AirPower4T/assets/16929327/9498f65a-780e-42af-bbd8-aac257e545ff"/>


## 🔑 如何使用(初始化)?

1. 你可以通过我们提供的 ```AirPowerWebStarter``` 项目提供的一键初始化脚本来完成 **AirPower** 宿主项目的初始化:

```bash
git clone https://github.com/HammCn/AirPowerWebStarter.git &&
cd AirPowerWebStarter/src && 
git clone https://github.com/HammCn/AirPower4T.git airpower && cd ../ &&
yarn && cp .env.dev .env && yarn s
```

2. 如果你需要手动初始化项目，可以参考下面的命令一步步执行

```bash
# 克隆宿主项目
git clone https://github.com/HammCn/AirPowerWebStarter.git

# 进入 src 目录
cd AirPowerWebStarter/src

# 克隆依赖项目
git clone https://github.com/HammCn/AirPower4T.git airpower

# 然后就可以复制一个环境变量，装依赖 启动
cp .env.dev .env
yarn
yarn s
```

## 🛎 我们的建议

我们提供的 [AirPower宿主仓库](https://github.com/HammCn/AirPowerWebStarter), 里面提供了一些 ```ESlint规则``` ```路由配置``` ```环境变量配置``` ```tsconfig``` ```vite.config```, 以及很多的 **demo** 代码, 你可以进行参考。

如果你有什么疑问或者问题，你也可以加入开发者交流QQ群(```555156313```)进行咨询，当然，我们更建议你 [发起一个issue](https://github.com/HammCn/AirPower4T/issues/new)


## ⏰ Enjoy it

好了, 那么接下来你可以愉快的开发了, 如果你有什么建议或者意见, 可以在本仓库中提交你的 **issues**, 你可以为这个依赖库进行 **添砖加瓦**!

> ☕️Java: 加瓦? 什么Java?




## 📷 来点*图(示例)

<img width="24%" src="https://github.com/HammCn/AirPower4T/assets/16929327/b2f4bab2-3d6d-460d-9bdd-d3ebc65d184d"/>
<img width="24%" src="https://github.com/HammCn/AirPower4T/assets/16929327/19b9400a-b8ac-4463-b1e2-d3b7a8eb1d97"/>
<img width="24%" src="https://github.com/HammCn/AirPower4T/assets/16929327/7135097b-a450-4f2e-b355-52e2fccc0b4a"/>
<img width="24%" src="https://github.com/HammCn/AirPower4T/assets/16929327/84b4f4ad-0aac-40f3-baf1-9f36de87c8aa"/>
 
