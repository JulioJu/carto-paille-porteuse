# carto-paille-porteuse

This template should help get you started developing with Vue 3 in Vite.

<!-- vim-markdown-toc GFM -->

* [Recommended IDE Setup](#recommended-ide-setup)
  * [Type Support for `.vue` Imports in TS](#type-support-for-vue-imports-in-ts)
* [Vite Customize configuration](#vite-customize-configuration)
* [Project Setup](#project-setup)
  * [Download dependencies](#download-dependencies)
  * [Set environment variables](#set-environment-variables)
  * [TypeScript and Parse Platform JS SDK](#typescript-and-parse-platform-js-sdk)
  * [Destroy and Generate Schema database](#destroy-and-generate-schema-database)
    * [Into src/App.vue add](#into-srcappvue-add)
    * [Set master key](#set-master-key)
    * [Run](#run)
    * [Revert changes](#revert-changes)
    * [Security](#security)
  * [Compile and Hot-Reload for Development](#compile-and-hot-reload-for-development)
  * [Type-Check, Compile and Minify for Production](#type-check-compile-and-minify-for-production)
  * [Lint with ESLint](#lint-with-eslint)
  * [Deploy on back4app](#deploy-on-back4app)
* [Security configuration](#security-configuration)
* [TODO](#todo)
* [Note](#note)
* [Credits](#credits)

<!-- vim-markdown-toc -->

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

### Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
    1) Run `Extensions: Show Built-in Extensions` from VSCode's command palette
    2) Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

## Vite Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

### Download dependencies

```sh
npm install
```

### Set environment variables

```sh
cp ./src/environment.example.ts ./src/environment.ts
```

Then into ./src/environment.ts follow https://www.back4app.com/docs/get-started/parse-sdk

### TypeScript and Parse Platform JS SDK

To have Parse and TypeScript you should execute

```sh
make parse-post-install
```

Normally `npm install` trigger following automatically this command. But no `npm install aPackage --save` .

Therefore ***you should trigger*** `make parse-post-install` after installing a new package.

### Destroy and Generate Schema database

Execute ***locally*** ./src/batiment/parse-platform-generate-batiment.ts

To do that

#### Into src/App.vue add

```typescript
import parsePlatformGenerateBatiment from "@/parse-platform-generate-batiment";

// Already into App.vue
parsePlatform.initializeParse();

parsePlatformGenerateBatiment();
```

#### Set master key

Into ./src/batiment/parse-platform-generate-batiment.ts set master key

You could find it at https://www.back4app.com/docs/get-started/parse-sdk

#### Run

```sh
npm run dev
```

Then open app into a browser. It ***destroys*** and generate a new schema.

#### Revert changes

Do not forget to revert changes to avoid generation if you load again the page.

#### Security

See section below

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


* I use following regex to validate token
    ```
+"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*\-_+=[\]{}|\\:',.?/`~"();!])[A-Za-z\d@#$%^&*\-_+=[\]{}|\\:',.?/`~"();!]{8,}$"

. You should have minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character. Les caractéres spéciaux autorisés sont : @ # $ % ^ & * - _ + = [ ] { } | \\ : \' , . ? / ` ~ " ( ) ; !
    ```
    * See also https://stackoverflow.com/questions/19605150/regex-for-password-must-contain-at-least-eight-characters-at-least-one-number-a

    * Session expire after 1 day. I use `"sessionLength":86400`" into server-settings
        (see also https://parseplatform.org/parse-server/api/master/ParseServerOptions.html).

## TODO

* We could have error "error 209 invalid session token" randomly
  See also https://stackoverflow.com/questions/32103777/parse-for-javascript-error-209-invalid-session-token-when-signing-up-a-new-u
  Try catch each Parse (not already done because I would like understand better the error)

* Unicity of latitude and longitude in back-end
    * https://community.parseplatform.org/t/can-parseschema-add-unique-index/1203
    * https://github.com/parse-community/parse-server/issues/7289
    * https://sapandiwakar.in/uniqueness-constraints-in-parse-database/

* To delete a file you should use master key. Therefore create a cloud function.
    https://docs.parseplatform.org/js/guide/#deleting-files
    * Currently we could use backoffice to clean up of file
        See https://parse-dashboard.back4app.com/apps/XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX/settings/general

* See
    > Requires Parse Server 5.0.0+
    > By default, Parse Server creates Users with public read access. This allows other users, and un-authenticated users, to read data such as email. When moving to production, set the key enforcePrivateUsers to true, as this will remove the public read access to new users.
    > http://docs.parseplatform.org/ios/guide/#enforcing-private-users

## Note

* First development on Parse Platform 4.5.0 in 2022. On Back4App it was the last production release.

* useRouter().beforeEach is triggered multiple times on navigation, contrary to beforeRouteEnter()
    Following guide is interesting https://github.com/vuejs/rfcs/discussions/302

* If there is no existing batiments, we can't create a batiment.

* I've set limit to not retrieve more than 10000 objects (default is 99)

* With Parse 4.5.0 If you try to make a CRUD on an object without right, you have error:
    ```
    Error: Object not found.
    ```

## Credits

We use https://openlayers.org/en/latest/examples/data/icon.png (licence CC-BY 3.0)
