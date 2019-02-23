# umi-plugin-apollo

[![NPM version](https://img.shields.io/npm/v/@tuofeng/umi-plugin-apollo.svg?style=flat)](https://npmjs.org/package/@tuofeng/umi-plugin-apollo)

Umi plugin for apollo graphql client with hooks support.

fork from https://github.com/lemol/umi-plugin-apollo add react-apollo-hooks

### Install

```bash
$ yarn add @tuofeng/umi-plugin-apollo    # OR npm install --save @tuofeng/umi-plugin-apollo
```

### Setup

Having setup the `umi-plugin-react`, add the `@tuofeng/umi-plugin-apollo` plugin:

```js
// .umirc.js

export default {
  plugins: [
    ['umi-plugin-react', {
      routes: {
        exclude: [
          /schema\.(js|jsx|ts|tsx)$/,
          /resolvers\.(js|jsx|ts|tsx)$/,
        ],
      },
      // other umi-plugin-react options
    }],
    ['@tuofeng/umi-plugin-apollo'],
  ]
}
```

Done.

### Generators

```bash
$ umi generate apollo:page user/index
```

Result:

```bash
└── src/
    ├── pages/
        ├── user/
            ├── index.css
            ├── index.js
            ├── schema.js
            └── resolvers.js
```

### Runtime

Run `npm start` then navigate to `http://localhost:8000/user`.

### Under the hood

Check the generated files on `src/pages/.umi/apollo`.

### License

MIT