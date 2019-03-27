const { loadDocuments, loadSchema, mergeTypeDefs } = require('graphql-toolkit');
const typescriptPlugin = require('@graphql-codegen/typescript');
const typescriptOperationsPlugin = require('@graphql-codegen/typescript-operations');
const typescriptReactApolloPlugin = require('@graphql-codegen/typescript-react-apollo');
const { codegen } = require('@graphql-codegen/core');
const fs = require('fs');
const { promisify } = require('util');
const { getOptions } = require('loader-utils');
const fsWriteAsync = promisify(fs.writeFile);

async function outputSchemaToGlobalTypes({ schemaInput, schemaOutput }) {
    console.log('downloading schema...');

    let schema = await loadSchema(schemaInput);
    schema = mergeTypeDefs([schema]);

    let code = await codegen({
        schema,
        documents: [],
        filename: schemaOutput,
        plugins: [
            {
                typescript: {
                    enumsAsTypes: true,
                    scalars: {
                        Date: 'Date'
                    }
                },
            },
        ],
        pluginMap: {
            typescript: typescriptPlugin,
        }
    });

    // we want a d.ts files were 'export' statements are not valid. So lets remove them.
    // We also wrap the types with a namespace to prevent conflicts with builtin browser types.
    code = `declare namespace GraphQL {
        ${code.replace(/export\s+/g, '')}
    }`;

    await fsWriteAsync(schemaOutput, code);

    return schema;
}

let schemaPromise = null;

module.exports = async function (source, map) {
    const options = getOptions(this);

    console.log(options);

    if (this.cacheable) {
        this.cacheable();
    }

    this.addDependency(this.resourcePath);

    const callback = this.async();

    if(!schemaPromise) {
        schemaPromise = outputSchemaToGlobalTypes(options);
    }

    const outFile = `${this.resourcePath}.tsx`;

    let schema;
    try {
        schema = await schemaPromise;
    }
    catch(e) {
        schemaPromise = null;
        callback(new Error('Unable to download schema'));
        return;
    }

    const documents = await loadDocuments(source);

    let code = await codegen({
        schema,
        documents,
        filename: outFile,
        plugins: [
            {
                typescriptOperations: {
                    typesPrefix: 'GraphQL.',
                },
            },
            {
                typescriptReactApollo: {
                    withComponent: true,
                    withHOC: false,
                    gqlImport: 'graphql.macro#gql',
                },
            }
        ],
        pluginMap: {
            typescriptOperations: typescriptOperationsPlugin,
            typescriptReactApollo: typescriptReactApolloPlugin,
        }
    });

    // if we use a typesPrefix of GraphQL the code generator generates invalid types. So lets fix that.
    code = code
        .replace(/export type GraphQL\./g, 'export type ')
        .replace(/Maybe/g, 'GraphQL.Maybe');

    await fsWriteAsync(outFile, code);

    callback(null, code, map);
}
