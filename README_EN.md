<p align="center">
  <img width="300" src="./assets/img/airpower-bg.svg"/> <b>4T</b>
</p>

<p align="center">
  <img src="https://svg.hamm.cn?key=Lang&value=TypeScript&bg=green"/>
  <img src="https://svg.hamm.cn?key=Base&value=Vue3"/>
  <img src="https://svg.hamm.cn?key=Build&value=Vite"/>
  <img src="https://svg.hamm.cn?key=UI&value=ElementPlus"/>
</p>

<p align="center"><a href="https://github.com/AirPowerTeam/AirPower4T">Github</a> /
  <a href="https://gitee.com/air-power/AirPower4T">Gitee</a> /  <a href="./CHANGELOG.md">CHANGELOG</a> / <a href="./docs/README.md">DOCUMENT</a>
</p>

## 0️⃣ 语言 Language

[中文(Chinese)](/README.md) | 英文(English)

## 1️⃣ What is AirPower4T

**AirPower4T** is a development library based on `Vue3`, `TypeScript`, `Element Plus`, `Vite`
which provides lots of Backend-Platform features such as `Data-Transform` `Form Table Decorators` `Encrypt/Decrypt`
`Encoding/Decoding` `Api-Request` `Backend-Permission`.

**We use **OOP** **Decoration** **Hooks** to make your development more efficient.**

> **AirPower4T** is inspired by `Java SpringBoot JPA` and other back-end development ideas, using `classes`,
`enumerations`, `interfaces`, `decorators`, etc., to provide a lot of common background management components based on
`Element Plus`, to help developers quickly develop Web applications.
>
>
> The design concept of `AirPower4T` is object-oriented programming, encapsulating all abstract functions, data
> structures and services into `classes`, using class inheritance to achieve some code reuse, reduce repetitive code,
> and
> make the code clearer and easier to read. Using `decorator` to realize the configuration of some common components,
> data
> conversion rules, front-end display copy and other information, so that the configuration of components is more
> centralized, flexible and intuitive.

## 2️⃣ Why named **AirPower**

In the early stage, it was designed in the sub-repository way, and this dependent library was together with the host
project, so in order to `line up` the front, I chose to use the word beginning with `A`. Later, I choose the unpublished
product of `Apple`
`AirPower`, and I am a fan of `Apple`, So I named it **AirPower**.

## 3️⃣ Features

1. **Model** / **Entity** Use Model/Entity instance instead `JSON`
2. **Service** Use Service to abstract all network requests
3. **Component** background management components and some feedback components
4. **Hook**
5. **Enum**
6. **Decorator**

## 4️⃣ Some code screenshots

<img width="24%" src="./docs/img/1.png"/><img width="24%" src="./docs/img/2.png"/><img width="24%" src="./docs/img/3.png"/><img width="24%" src="./docs/img/4.png"/>

<img width="24%" src="./docs/img/5.png"/><img width="24%" src="./docs/img/6.png"/><img width="24%" src="./docs/img/7.png"/><img width="24%" src="./docs/img/8.png"/>

## 5️⃣ Get Started

We use `Vite` to build, and the package management tool is `yarn`, please install the relevant tools before continuing

### 5.1. Install **TypeScript**

  ```shell
  npm install -D typescript
  ```

### 5.2. Clone the template repository

You can use our **SPMS-Web** project to initialize a project:

- Via **Github**

  ```shell
  git clone https://github.com/s-pms/SPMS-Web.git &&
  cd SPMS-Web &&
  git clone https://github.com/AirPowerTeam/AirPower4T.git airpower &&
  yarn && cp .env.dev .env && yarn s
  ```

- Via **Gitee**

  ```shell
  git clone https://gitee.com/s-pms/SPMS-Web.git &&
  cd SPMS-Web &&
  git clone https://gitee.com/air-power/AirPower4T.git airpower &&
  yarn && cp .env.dev .env && yarn s
  ```

### 5.3. Modify the configuration

Copy `.env.dev` to `.env` and modify the configuration:

  ```conf
  VITE_APP_NAME = "Dev"
  VITE_APP_API_URL = "/api/"
  VITE_APP_STATIC_URL = "/static/"
  ```

You can edit the `vite.config.ts` if you need to proxy to cross-origin.

### 5.4. Start the project

```shell
# Start the project
yarn s              #Short Command
```

## 6️⃣ Start or Build

Before starting the project, we recommend you to close the `visual studio code` `Vetur` plugin to avoid conflicts
between `vue2` and `vue3`.

```shell
# Build
yarn dev            #Dev .env.dev
yarn test           #Test .env.test
yarn production     #Production .env.production
```

## 7️⃣ Other Commands

```shell
# Standard Commit Template
yarn c

# Update AirPower and Host Project
yarn u

# View Git Logs
yarn l
```

## 8️⃣ Some recommended VSCODE plugins

- Vue - Official
- ESLint
- SCSS Formatter

> If you encounter any compatibility problems, it is recommended to disable the above three plugins except `Vetur` in
> the

## 9️⃣ Our Suggestions

We provide some `ESlint rules` `router config` `env config` `tsconfig` `vite.config`, and many **demo** code in our
**SPMS-Web** project, which can help you get started quickly.

If you have any questions or problems, you can join the developer QQ group (`555156313`) for consultation, of course, we
recommend you to submit your **issues** in this
repository [Github issue](https://github.com/AirPowerTeam/AirPower4T/issues/new) / [Gitee issue](https://gitee.com/air-power/AirPower4T/issues/new)
here.

## 🔟 Enjoy it

<p align="center">
ATTENTION: Contributor list is just for fun!!!
</p>
