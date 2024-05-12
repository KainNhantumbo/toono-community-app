# Toono Community (social content oriented platform)

🎉 Welcome to **toono community** app repository, I am so excited to have you here!

Meet a social constructive content oriented platform inspired by [DEV](dev.to) that allows people around the globe to share their career experience and grow by writing valuable content, build their professional profiles and take part in social discussions. All mates are welcome to find a place within our community.

A platform made for everyone who wants to share, contribute and learn something.

> **Access this app live at: [https://toono-community.vercel.app](https://toono-community.vercel.app)**

## 🌠 Project status

Note: This project is in active development and still unfinished. You can expect to see more features being added in the future. Enjoy!!

For now, here are the major features:

> - ✨ **Backup data:** users can backup their data by downloading it.
> - ✨ **Profiles:** separated dedicated profile page for user profiles, info and images.
> - ✨ **Built-in Comments System:** users can comment and vote posts (through the claps system).
> - ✨ **Built-in CMS:** internal custom CMS for data management, with a customized markdown editor.
> - ✨ **Share:** users can share posts in other social platforms.
> - ✨ **Themes:** Light and dark.
> - ✨ **Platforms:** Web.

## 🌳 Project structure

```bash
$ROOT
├── public
│   └── fonts
└── src
    ├── assets
    ├── components
    │   └── ui
    ├── config
    ├── context
    ├── hooks
    ├── lib
    ├── router
    │   ├── private
    │   │   └── dashboard
    │   └── public
    │       └── auth
    ├── schemas
    ├── shared
    ├── state
    │   └── slices
    ├── styles
    └── types
```

## 🐾 Project Stack (and main packages)

This app run on a React.JS and a backend with Express.JS described [here](https://github.com/KainNhantumbo/toono-community-server).

- **React.JS** - library used to build big, fast Web apps with JavaScript.
- **Typescript** - a superset language of Javascript that provides typechecking.
- **Vite.JS** - Hot Module Replacement (HMR) that stays fast regardless of app size.
- **Tailwind CSS** - a utility-first CSS framework for rapidly building modern websites without ever leaving your HTML (for component styling).
- **React Router V6** - a router library to enable "client side routing" in react apps.
- **Shadcn Components** - brings styled radix-ui components with tailwind css.
- **React Syntax Highlighter** - for highlighting code blocks.
- **React Markdown Editor** - for markdown editing.
- **React Markdown** and **Marked** - to render safely render markdown content in web pages using react.
- **React Redux** - for state management.
- **Zod** - for client side data validation.
- **React Query** and **Axios** - for data fetching and cache.

## 🏗️ Local Setup

Make sure you have installed **Node.js (v18.17.0 or later recommended) which also comes with npm v9.6.7**.\
In the project directory, you can run in terminal:

- Runs the app in the development mode and the server will reload when you make changes to the source code for the render and electron scripts:

```bash
npm ci && npm run dev
```

- Builds the web version of the app for production to the **dist folder**:

```bash
npm run build
```

Don't forget to put the following environment variables on your `.env.local` file:

```bash
# THE SERVER API BASE URL
VITE_BASE_URL=
```

All done, feel deploy if you wish!

## ☘️ Find me!

E-mail: [nhantumbok@gmail.com](nhantumbok@gmail.com "Send an e-mail")\
Github: [https://github.com/KainNhantumbo](https://github.com/KainNhantumbo "See my github profile")\
Portfolio: [https://codenut-dev.vercel.app](https://codenut-dev.vercel.app "See my portfolio website")\
My Blog: [https://codenut-dev.vercel.app/en/blog](https://codenut-dev.vercel.app/en/blog "Visit my blog site")

#### If you like this project, let me know by leaving a star on this repository so I can keep improving this app or [send support](https://www.buymeacoffee.com/nhantumbokU/)!\*\* .😊😘

Best regards, Kain Nhantumbo.\
✌️🇲🇿 **Made with ❤ Vite.JS and Typescript**

## Contributing

I will be accepting no contributions to this project, due it's purposes.

## 📜 License

Licensed under Apache License Version 2.0. All rights reserved.\
Copyright &copy; 2024 Kain Nhantumbo.

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.

Happy Coding
