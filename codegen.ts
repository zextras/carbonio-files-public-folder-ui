/*
 * SPDX-FileCopyrightText: 2023 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import type { CodegenConfig } from '@graphql-codegen/cli';
import { TypeScriptTypedDocumentNodesConfig } from '@graphql-codegen/typed-document-node';
import { TypeScriptPluginConfig } from '@graphql-codegen/typescript';
import { TypeScriptDocumentsPluginConfig } from '@graphql-codegen/typescript-operations';

const config: CodegenConfig = {
	overwrite: true,
	schema: 'src/graphql/schema-public.graphql',
	documents: 'src/graphql/queries/*.graphql',
	generates: {
		'src/graphql/types.ts': {
			plugins: [
				// https://the-guild.dev/graphql/codegen/plugins/typescript/typescript
				'typescript',
				// https://the-guild.dev/graphql/codegen/plugins/typescript/typescript-operations
				'typescript-operations',
				'typed-document-node',
				// https://the-guild.dev/graphql/codegen/plugins/other/add
				{
					add: {
						content: ['// THIS FILE IS AUTOGENERATED BY GRAPHQL-CODEGEN. DO NOT EDIT!']
					}
				}
			],
			config: {
				typesPrefix: 'GQL',
				defaultScalarType: 'unknown',
				exportFragmentSpreadSubTypes: true,
				mergeFragmentTypes: true,
				nonOptionalTypename: true,
				scalars: {
					DateTime: 'number'
				},
				strictScalars: true,
				useTypeImports: true
			} satisfies TypeScriptPluginConfig &
				TypeScriptDocumentsPluginConfig &
				TypeScriptTypedDocumentNodesConfig
		},
		'src/graphql/schema-public.ts': {
			plugins: [
				'src/graphql/plugin/schemaGenerator.cjs', // https://the-guild.dev/graphql/codegen/plugins/other/add
				{
					add: {
						content: ['// THIS FILE IS AUTOGENERATED BY GRAPHQL-CODEGEN. DO NOT EDIT!']
					}
				}
			]
		}
	},
	hooks: {
		afterAllFileWrite:
			'eslint --fix --resolve-plugins-relative-to node_modules/@zextras/carbonio-ui-configs src/graphql/types.ts'
	}
};

export default config;
