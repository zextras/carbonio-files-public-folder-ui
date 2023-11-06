/*
 * SPDX-FileCopyrightText: 2023 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
// THIS FILE IS AUTOGENERATED BY GRAPHQL-CODEGEN. DO NOT EDIT!
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = {
	[_ in K]?: never;
};
export type Incremental<T> =
	| T
	| { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
	ID: { input: string; output: string };
	String: { input: string; output: string };
	Boolean: { input: boolean; output: boolean };
	Int: { input: number; output: number };
	Float: { input: number; output: number };
	DateTime: { input: number; output: number };
};

export type File = Node & {
	__typename?: 'File';
	created_at: Scalars['DateTime']['output'];
	extension?: Maybe<Scalars['String']['output']>;
	id: Scalars['ID']['output'];
	mime_type: Scalars['String']['output'];
	name: Scalars['String']['output'];
	size: Scalars['Float']['output'];
	type: NodeType;
	updated_at: Scalars['DateTime']['output'];
};

export type Folder = Node & {
	__typename?: 'Folder';
	created_at: Scalars['DateTime']['output'];
	id: Scalars['ID']['output'];
	name: Scalars['String']['output'];
	type: NodeType;
	updated_at: Scalars['DateTime']['output'];
};

export type Node = {
	created_at: Scalars['DateTime']['output'];
	id: Scalars['ID']['output'];
	name: Scalars['String']['output'];
	type: NodeType;
	updated_at: Scalars['DateTime']['output'];
};

export type NodePage = {
	__typename?: 'NodePage';
	nodes: Array<Maybe<Node>>;
	page_token?: Maybe<Scalars['String']['output']>;
};

export enum NodeType {
	Application = 'APPLICATION',
	Audio = 'AUDIO',
	Folder = 'FOLDER',
	Image = 'IMAGE',
	Message = 'MESSAGE',
	Other = 'OTHER',
	Presentation = 'PRESENTATION',
	Spreadsheet = 'SPREADSHEET',
	Text = 'TEXT',
	Video = 'VIDEO'
}

export type Query = {
	__typename?: 'Query';
	findNodes?: Maybe<NodePage>;
	getPublicNode?: Maybe<Node>;
};

export type QueryFindNodesArgs = {
	folder_id: Scalars['ID']['input'];
	limit?: InputMaybe<Scalars['Int']['input']>;
	page_token?: InputMaybe<Scalars['String']['input']>;
};

export type QueryGetPublicNodeArgs = {
	node_link_id: Scalars['String']['input'];
};

export type FindNodesQueryVariables = Exact<{
	folder_id: Scalars['ID']['input'];
	limit?: InputMaybe<Scalars['Int']['input']>;
	page_token?: InputMaybe<Scalars['String']['input']>;
}>;

export type FindNodesQuery = {
	findNodes?:
		| ({
				page_token?: string | null;
				nodes: Array<
					| ({
							extension?: string | null;
							mime_type: string;
							size: number;
							created_at: number;
							id: string;
							name: string;
							type: NodeType;
							updated_at: number;
					  } & { __typename?: 'File' })
					| ({
							created_at: number;
							id: string;
							name: string;
							type: NodeType;
							updated_at: number;
					  } & { __typename?: 'Folder' })
					| null
				>;
		  } & { __typename?: 'NodePage' })
		| null;
} & { __typename?: 'Query' };

export type GetPublicNodeQueryVariables = Exact<{
	node_link_id: Scalars['String']['input'];
}>;

export type GetPublicNodeQuery = {
	getPublicNode?: ({ id: string; name: string } & { __typename?: 'File' | 'Folder' }) | null;
} & { __typename?: 'Query' };

export const FindNodesDocument = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'query',
			name: { kind: 'Name', value: 'findNodes' },
			variableDefinitions: [
				{
					kind: 'VariableDefinition',
					variable: { kind: 'Variable', name: { kind: 'Name', value: 'folder_id' } },
					type: {
						kind: 'NonNullType',
						type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } }
					}
				},
				{
					kind: 'VariableDefinition',
					variable: { kind: 'Variable', name: { kind: 'Name', value: 'limit' } },
					type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } }
				},
				{
					kind: 'VariableDefinition',
					variable: { kind: 'Variable', name: { kind: 'Name', value: 'page_token' } },
					type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } }
				}
			],
			selectionSet: {
				kind: 'SelectionSet',
				selections: [
					{
						kind: 'Field',
						name: { kind: 'Name', value: 'findNodes' },
						arguments: [
							{
								kind: 'Argument',
								name: { kind: 'Name', value: 'folder_id' },
								value: { kind: 'Variable', name: { kind: 'Name', value: 'folder_id' } }
							},
							{
								kind: 'Argument',
								name: { kind: 'Name', value: 'limit' },
								value: { kind: 'Variable', name: { kind: 'Name', value: 'limit' } }
							},
							{
								kind: 'Argument',
								name: { kind: 'Name', value: 'page_token' },
								value: { kind: 'Variable', name: { kind: 'Name', value: 'page_token' } }
							}
						],
						selectionSet: {
							kind: 'SelectionSet',
							selections: [
								{
									kind: 'Field',
									name: { kind: 'Name', value: 'nodes' },
									selectionSet: {
										kind: 'SelectionSet',
										selections: [
											{ kind: 'Field', name: { kind: 'Name', value: 'created_at' } },
											{ kind: 'Field', name: { kind: 'Name', value: 'id' } },
											{ kind: 'Field', name: { kind: 'Name', value: 'name' } },
											{ kind: 'Field', name: { kind: 'Name', value: 'type' } },
											{ kind: 'Field', name: { kind: 'Name', value: 'updated_at' } },
											{
												kind: 'InlineFragment',
												typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'File' } },
												selectionSet: {
													kind: 'SelectionSet',
													selections: [
														{ kind: 'Field', name: { kind: 'Name', value: 'extension' } },
														{ kind: 'Field', name: { kind: 'Name', value: 'mime_type' } },
														{ kind: 'Field', name: { kind: 'Name', value: 'size' } }
													]
												}
											}
										]
									}
								},
								{ kind: 'Field', name: { kind: 'Name', value: 'page_token' } }
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<FindNodesQuery, FindNodesQueryVariables>;
export const GetPublicNodeDocument = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'query',
			name: { kind: 'Name', value: 'getPublicNode' },
			variableDefinitions: [
				{
					kind: 'VariableDefinition',
					variable: { kind: 'Variable', name: { kind: 'Name', value: 'node_link_id' } },
					type: {
						kind: 'NonNullType',
						type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } }
					}
				}
			],
			selectionSet: {
				kind: 'SelectionSet',
				selections: [
					{
						kind: 'Field',
						name: { kind: 'Name', value: 'getPublicNode' },
						arguments: [
							{
								kind: 'Argument',
								name: { kind: 'Name', value: 'node_link_id' },
								value: { kind: 'Variable', name: { kind: 'Name', value: 'node_link_id' } }
							}
						],
						selectionSet: {
							kind: 'SelectionSet',
							selections: [
								{ kind: 'Field', name: { kind: 'Name', value: 'id' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'name' } }
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<GetPublicNodeQuery, GetPublicNodeQueryVariables>;
