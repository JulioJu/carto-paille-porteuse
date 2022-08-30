# carto-paille-porteuse

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
    1) Run `Extensions: Show Built-in Extensions` from VSCode's command palette
    2) Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

## Parse platform setup

```sh
cp ./src/environment.example.ts ./src/environment.ts
```

Then into ./src/environment.ts follow https://www.back4app.com/docs/get-started/parse-sdk

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

### Deploy on back4app

Download and configure b4a cli.

See also
* https://blog.back4app.com/cli-parse-server/
* https://www.back4app.com/docs/local-development/parse-cli


```sh
npm run deploy
```

You could see what is deployed at https://parse-dashboard.back4app.com/apps/B4A_APP_UUID/cloud_code

## Security configuration

See
* https://docs.parseplatform.org/js/guide/#security
* https://www.back4app.com/docs/security/parse-security
* https://blog.back4app.com/parse-server-security/?utm_source=ActiveCampaign&utm_medium=email&utm_content=Back4App+%7C+Advanced+Guides&utm_campaign=Advance+Stage+Email+I

* Into Parse Platform settings configuration, do not forget to add a strong REGEX for password


## TODO

* We could have error "error 209 invalid session token" randomly
  See also https://stackoverflow.com/questions/32103777/parse-for-javascript-error-209-invalid-session-token-when-signing-up-a-new-u
  Try catch each Parse (not already done because I would like understand better the error)

## Note

* useRouter().beforeEach is triggered multiple times on navigation, contrary to beforeRouteEnter()
    Following guide is interesting https://github.com/vuejs/rfcs/discussions/302
