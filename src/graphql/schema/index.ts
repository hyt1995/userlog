import { loadFilesSync } from "@graphql-tools/load-files"
import {makeExecutableSchema }from "@graphql-tools/schema"
import { mergeResolvers, mergeTypeDefs } from '@graphql-tools/merge';



const allTypes = loadFilesSync('src/graphql/**/**/*.graphql')
const allResoves = loadFilesSync('src/graphql/**/**/*.{js,ts}')

const schema = makeExecutableSchema({ 
  typeDefs : mergeTypeDefs(allTypes), 
  resolvers : mergeResolvers(allResoves)
 });

export default schema;