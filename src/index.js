import { mkdirSync, existsSync } from 'fs';
import { join } from 'path';
import _ from 'lodash';
import { parseApolloFiles } from './functions/utils';
import generateIndexFile from './functions/indexFile';
import generatePageResolversFile from './functions/pageResolversFile';
import generatePageSchemaFile from './functions/pageSchemaFile';

const joinApolloPath = api => path => join(api.paths.tmpDirPath, 'apollo', path);
const joinApolloTemplatePath = __ => path => join(__dirname, '../template/umi/apollo', path);

export default function(api, opts = {}) {
  const apolloFiles = parseApolloFiles(api);
  const schemas = apolloFiles.filter(x => x.fileType === 'Schema');
  const resolvers = apolloFiles.filter(x => x.fileType === 'Resolvers');
  
  const bag = {
    schemas,
    resolvers,
    joinApolloPath: joinApolloPath(api),
    joinApolloTemplatePath: joinApolloTemplatePath(api),
  }

  api.onGenerateFiles(() => {
    const apolloPath = joinApolloPath(api)('');
    if (!existsSync(apolloPath)) {
      mkdirSync(apolloPath);
    }
  });

  generateIndexFile(api, bag);
  generatePageSchemaFile(api, bag);
  generatePageResolversFile(api, bag);

  api.addRendererWrapperWithComponent('./apollo/index');

  api.addVersionInfo([
    'apollo-cache-inmemory',
    'apollo-client',
    'apollo-link',
    'apollo-link-error',
    'apollo-link-http',
    'apollo-link-state',
    'graphql',
    'graphql-tag',
    'graphql-tools',
    'lodash',
    'react-apollo',  
  ].map(pkgName => `${pkgName}@${require(`${pkgName}/package`).version}`));

  api.registerGenerator('apollo:page', {
    Generator: require('./commands/generate/page').default(api),
    resolved: join(__dirname, './commands/generate/page'),
  });

  // api.changePluginOption('umi-plugin-react', {
  //   routes: {
  //     exclude: [
  //       /components\//,
  //       /schema\.js/,
  //       /resolvers\.js/,
  //     ],
  //   },
  // });
};
