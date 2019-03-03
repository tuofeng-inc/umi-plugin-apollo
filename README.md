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
    ['@tuofeng/umi-plugin-apollo', {/*
      uri: 'https://my.endpoint.com/graphql',
      mock: true,
      options: 'path/to/options/file',
    */}],
  ]
}
```

Done.

### Options

| name                | type                             | default                     |
|---------------------|----------------------------------|-----------------------------|
| uri                 | string (required in production)  | `process.env.GRAPHQL_URI`   |
| mock                | string (optional)                | `process.env.MOCK`          |
| options             | string (optional)                |                             |

### Options file

You can create an options file that will be used to customize the creation of ApolloClient.
Define this file on the `options` field in the plugin options: 

```js
// .umirc.js
export default {
  plugins: [
    ['umi-plugin-apollo', {
      options: 'path/to/options/file',
    }],
  ]
}
```

This file can define the following fields:

```js
export const cacheOptions = {
};

export const httpLinkOptions = {
};

export const stateLinkOptions = {
};

export const extraLinks = [
];

export const clientOptions = {
};

export const providerOptions = {
};

export const makeCache = undefined; // : ({ cacheOptions }) => Cache
export const makeHttpLink = undefined; // : ({ clientStateLink, remoteLink, httpLinkOptions }) => ApolloLink
export const makeStateLink = undefined; // : ({ resolvers, defaults, cache, typeDefs, stateLinkOptions }) => ApolloLink
export const makeLink = undefined; // : ({ clientStateLink, remoteLink, extraLinks }) => ApolloLink
export const makeClient = undefined; // : ({ link, cache, clientOptions }) => ApolloClient
export const makeProvider = undefined; // : ({ client, providerOptions }) => ReactElement (eg: ({ children }) => <ApolloProvider client={client}>{children}</ApolloProvider)
```

Please, check [this example](https://github.com/lemol/angolans-on-github/blob/master/packages/react-umi-apollo/src/options/apollo.js).

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
