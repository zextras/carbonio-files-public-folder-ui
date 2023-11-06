/*
 * SPDX-FileCopyrightText: 2023 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

export const schema = {
	kind: 'Document',
	definitions: [
		{
			kind: 'ScalarTypeDefinition',
			name: { kind: 'Name', value: 'DateTime', loc: { start: 7, end: 15 } },
			directives: [],
			loc: { start: 0, end: 15 }
		},
		{
			kind: 'ObjectTypeDefinition',
			name: { kind: 'Name', value: 'File', loc: { start: 22, end: 26 } },
			interfaces: [
				{
					kind: 'NamedType',
					name: { kind: 'Name', value: 'Node', loc: { start: 38, end: 42 } },
					loc: { start: 38, end: 42 }
				}
			],
			directives: [],
			fields: [
				{
					kind: 'FieldDefinition',
					name: { kind: 'Name', value: 'created_at', loc: { start: 47, end: 57 } },
					arguments: [],
					type: {
						kind: 'NonNullType',
						type: {
							kind: 'NamedType',
							name: { kind: 'Name', value: 'DateTime', loc: { start: 59, end: 67 } },
							loc: { start: 59, end: 67 }
						},
						loc: { start: 59, end: 68 }
					},
					directives: [],
					loc: { start: 47, end: 68 }
				},
				{
					kind: 'FieldDefinition',
					name: { kind: 'Name', value: 'extension', loc: { start: 71, end: 80 } },
					arguments: [],
					type: {
						kind: 'NamedType',
						name: { kind: 'Name', value: 'String', loc: { start: 82, end: 88 } },
						loc: { start: 82, end: 88 }
					},
					directives: [],
					loc: { start: 71, end: 88 }
				},
				{
					kind: 'FieldDefinition',
					name: { kind: 'Name', value: 'id', loc: { start: 91, end: 93 } },
					arguments: [],
					type: {
						kind: 'NonNullType',
						type: {
							kind: 'NamedType',
							name: { kind: 'Name', value: 'ID', loc: { start: 95, end: 97 } },
							loc: { start: 95, end: 97 }
						},
						loc: { start: 95, end: 98 }
					},
					directives: [],
					loc: { start: 91, end: 98 }
				},
				{
					kind: 'FieldDefinition',
					name: { kind: 'Name', value: 'mime_type', loc: { start: 101, end: 110 } },
					arguments: [],
					type: {
						kind: 'NonNullType',
						type: {
							kind: 'NamedType',
							name: { kind: 'Name', value: 'String', loc: { start: 112, end: 118 } },
							loc: { start: 112, end: 118 }
						},
						loc: { start: 112, end: 119 }
					},
					directives: [],
					loc: { start: 101, end: 119 }
				},
				{
					kind: 'FieldDefinition',
					name: { kind: 'Name', value: 'name', loc: { start: 122, end: 126 } },
					arguments: [],
					type: {
						kind: 'NonNullType',
						type: {
							kind: 'NamedType',
							name: { kind: 'Name', value: 'String', loc: { start: 128, end: 134 } },
							loc: { start: 128, end: 134 }
						},
						loc: { start: 128, end: 135 }
					},
					directives: [],
					loc: { start: 122, end: 135 }
				},
				{
					kind: 'FieldDefinition',
					name: { kind: 'Name', value: 'size', loc: { start: 138, end: 142 } },
					arguments: [],
					type: {
						kind: 'NonNullType',
						type: {
							kind: 'NamedType',
							name: { kind: 'Name', value: 'Float', loc: { start: 144, end: 149 } },
							loc: { start: 144, end: 149 }
						},
						loc: { start: 144, end: 150 }
					},
					directives: [],
					loc: { start: 138, end: 150 }
				},
				{
					kind: 'FieldDefinition',
					name: { kind: 'Name', value: 'type', loc: { start: 153, end: 157 } },
					arguments: [],
					type: {
						kind: 'NonNullType',
						type: {
							kind: 'NamedType',
							name: { kind: 'Name', value: 'NodeType', loc: { start: 159, end: 167 } },
							loc: { start: 159, end: 167 }
						},
						loc: { start: 159, end: 168 }
					},
					directives: [],
					loc: { start: 153, end: 168 }
				},
				{
					kind: 'FieldDefinition',
					name: { kind: 'Name', value: 'updated_at', loc: { start: 171, end: 181 } },
					arguments: [],
					type: {
						kind: 'NonNullType',
						type: {
							kind: 'NamedType',
							name: { kind: 'Name', value: 'DateTime', loc: { start: 183, end: 191 } },
							loc: { start: 183, end: 191 }
						},
						loc: { start: 183, end: 192 }
					},
					directives: [],
					loc: { start: 171, end: 192 }
				}
			],
			loc: { start: 17, end: 194 }
		},
		{
			kind: 'ObjectTypeDefinition',
			name: { kind: 'Name', value: 'Folder', loc: { start: 201, end: 207 } },
			interfaces: [
				{
					kind: 'NamedType',
					name: { kind: 'Name', value: 'Node', loc: { start: 219, end: 223 } },
					loc: { start: 219, end: 223 }
				}
			],
			directives: [],
			fields: [
				{
					kind: 'FieldDefinition',
					name: { kind: 'Name', value: 'created_at', loc: { start: 228, end: 238 } },
					arguments: [],
					type: {
						kind: 'NonNullType',
						type: {
							kind: 'NamedType',
							name: { kind: 'Name', value: 'DateTime', loc: { start: 240, end: 248 } },
							loc: { start: 240, end: 248 }
						},
						loc: { start: 240, end: 249 }
					},
					directives: [],
					loc: { start: 228, end: 249 }
				},
				{
					kind: 'FieldDefinition',
					name: { kind: 'Name', value: 'id', loc: { start: 252, end: 254 } },
					arguments: [],
					type: {
						kind: 'NonNullType',
						type: {
							kind: 'NamedType',
							name: { kind: 'Name', value: 'ID', loc: { start: 256, end: 258 } },
							loc: { start: 256, end: 258 }
						},
						loc: { start: 256, end: 259 }
					},
					directives: [],
					loc: { start: 252, end: 259 }
				},
				{
					kind: 'FieldDefinition',
					name: { kind: 'Name', value: 'name', loc: { start: 262, end: 266 } },
					arguments: [],
					type: {
						kind: 'NonNullType',
						type: {
							kind: 'NamedType',
							name: { kind: 'Name', value: 'String', loc: { start: 268, end: 274 } },
							loc: { start: 268, end: 274 }
						},
						loc: { start: 268, end: 275 }
					},
					directives: [],
					loc: { start: 262, end: 275 }
				},
				{
					kind: 'FieldDefinition',
					name: { kind: 'Name', value: 'type', loc: { start: 278, end: 282 } },
					arguments: [],
					type: {
						kind: 'NonNullType',
						type: {
							kind: 'NamedType',
							name: { kind: 'Name', value: 'NodeType', loc: { start: 284, end: 292 } },
							loc: { start: 284, end: 292 }
						},
						loc: { start: 284, end: 293 }
					},
					directives: [],
					loc: { start: 278, end: 293 }
				},
				{
					kind: 'FieldDefinition',
					name: { kind: 'Name', value: 'updated_at', loc: { start: 296, end: 306 } },
					arguments: [],
					type: {
						kind: 'NonNullType',
						type: {
							kind: 'NamedType',
							name: { kind: 'Name', value: 'DateTime', loc: { start: 308, end: 316 } },
							loc: { start: 308, end: 316 }
						},
						loc: { start: 308, end: 317 }
					},
					directives: [],
					loc: { start: 296, end: 317 }
				}
			],
			loc: { start: 196, end: 319 }
		},
		{
			kind: 'InterfaceTypeDefinition',
			name: { kind: 'Name', value: 'Node', loc: { start: 331, end: 335 } },
			interfaces: [],
			directives: [],
			fields: [
				{
					kind: 'FieldDefinition',
					name: { kind: 'Name', value: 'created_at', loc: { start: 340, end: 350 } },
					arguments: [],
					type: {
						kind: 'NonNullType',
						type: {
							kind: 'NamedType',
							name: { kind: 'Name', value: 'DateTime', loc: { start: 352, end: 360 } },
							loc: { start: 352, end: 360 }
						},
						loc: { start: 352, end: 361 }
					},
					directives: [],
					loc: { start: 340, end: 361 }
				},
				{
					kind: 'FieldDefinition',
					name: { kind: 'Name', value: 'id', loc: { start: 364, end: 366 } },
					arguments: [],
					type: {
						kind: 'NonNullType',
						type: {
							kind: 'NamedType',
							name: { kind: 'Name', value: 'ID', loc: { start: 368, end: 370 } },
							loc: { start: 368, end: 370 }
						},
						loc: { start: 368, end: 371 }
					},
					directives: [],
					loc: { start: 364, end: 371 }
				},
				{
					kind: 'FieldDefinition',
					name: { kind: 'Name', value: 'name', loc: { start: 374, end: 378 } },
					arguments: [],
					type: {
						kind: 'NonNullType',
						type: {
							kind: 'NamedType',
							name: { kind: 'Name', value: 'String', loc: { start: 380, end: 386 } },
							loc: { start: 380, end: 386 }
						},
						loc: { start: 380, end: 387 }
					},
					directives: [],
					loc: { start: 374, end: 387 }
				},
				{
					kind: 'FieldDefinition',
					name: { kind: 'Name', value: 'type', loc: { start: 390, end: 394 } },
					arguments: [],
					type: {
						kind: 'NonNullType',
						type: {
							kind: 'NamedType',
							name: { kind: 'Name', value: 'NodeType', loc: { start: 396, end: 404 } },
							loc: { start: 396, end: 404 }
						},
						loc: { start: 396, end: 405 }
					},
					directives: [],
					loc: { start: 390, end: 405 }
				},
				{
					kind: 'FieldDefinition',
					name: { kind: 'Name', value: 'updated_at', loc: { start: 408, end: 418 } },
					arguments: [],
					type: {
						kind: 'NonNullType',
						type: {
							kind: 'NamedType',
							name: { kind: 'Name', value: 'DateTime', loc: { start: 420, end: 428 } },
							loc: { start: 420, end: 428 }
						},
						loc: { start: 420, end: 429 }
					},
					directives: [],
					loc: { start: 408, end: 429 }
				}
			],
			loc: { start: 321, end: 431 }
		},
		{
			kind: 'ObjectTypeDefinition',
			name: { kind: 'Name', value: 'NodePage', loc: { start: 438, end: 446 } },
			interfaces: [],
			directives: [],
			fields: [
				{
					kind: 'FieldDefinition',
					name: { kind: 'Name', value: 'nodes', loc: { start: 451, end: 456 } },
					arguments: [],
					type: {
						kind: 'NonNullType',
						type: {
							kind: 'ListType',
							type: {
								kind: 'NamedType',
								name: { kind: 'Name', value: 'Node', loc: { start: 459, end: 463 } },
								loc: { start: 459, end: 463 }
							},
							loc: { start: 458, end: 464 }
						},
						loc: { start: 458, end: 465 }
					},
					directives: [],
					loc: { start: 451, end: 465 }
				},
				{
					kind: 'FieldDefinition',
					name: { kind: 'Name', value: 'page_token', loc: { start: 468, end: 478 } },
					arguments: [],
					type: {
						kind: 'NamedType',
						name: { kind: 'Name', value: 'String', loc: { start: 480, end: 486 } },
						loc: { start: 480, end: 486 }
					},
					directives: [],
					loc: { start: 468, end: 486 }
				}
			],
			loc: { start: 433, end: 488 }
		},
		{
			kind: 'EnumTypeDefinition',
			name: { kind: 'Name', value: 'NodeType', loc: { start: 495, end: 503 } },
			directives: [],
			values: [
				{
					kind: 'EnumValueDefinition',
					name: { kind: 'Name', value: 'APPLICATION', loc: { start: 508, end: 519 } },
					directives: [],
					loc: { start: 508, end: 519 }
				},
				{
					kind: 'EnumValueDefinition',
					name: { kind: 'Name', value: 'AUDIO', loc: { start: 522, end: 527 } },
					directives: [],
					loc: { start: 522, end: 527 }
				},
				{
					kind: 'EnumValueDefinition',
					name: { kind: 'Name', value: 'FOLDER', loc: { start: 530, end: 536 } },
					directives: [],
					loc: { start: 530, end: 536 }
				},
				{
					kind: 'EnumValueDefinition',
					name: { kind: 'Name', value: 'IMAGE', loc: { start: 539, end: 544 } },
					directives: [],
					loc: { start: 539, end: 544 }
				},
				{
					kind: 'EnumValueDefinition',
					name: { kind: 'Name', value: 'MESSAGE', loc: { start: 547, end: 554 } },
					directives: [],
					loc: { start: 547, end: 554 }
				},
				{
					kind: 'EnumValueDefinition',
					name: { kind: 'Name', value: 'OTHER', loc: { start: 557, end: 562 } },
					directives: [],
					loc: { start: 557, end: 562 }
				},
				{
					kind: 'EnumValueDefinition',
					name: { kind: 'Name', value: 'PRESENTATION', loc: { start: 565, end: 577 } },
					directives: [],
					loc: { start: 565, end: 577 }
				},
				{
					kind: 'EnumValueDefinition',
					name: { kind: 'Name', value: 'SPREADSHEET', loc: { start: 580, end: 591 } },
					directives: [],
					loc: { start: 580, end: 591 }
				},
				{
					kind: 'EnumValueDefinition',
					name: { kind: 'Name', value: 'TEXT', loc: { start: 594, end: 598 } },
					directives: [],
					loc: { start: 594, end: 598 }
				},
				{
					kind: 'EnumValueDefinition',
					name: { kind: 'Name', value: 'VIDEO', loc: { start: 601, end: 606 } },
					directives: [],
					loc: { start: 601, end: 606 }
				}
			],
			loc: { start: 490, end: 608 }
		},
		{
			kind: 'ObjectTypeDefinition',
			name: { kind: 'Name', value: 'Query', loc: { start: 615, end: 620 } },
			interfaces: [],
			directives: [],
			fields: [
				{
					kind: 'FieldDefinition',
					name: { kind: 'Name', value: 'findNodes', loc: { start: 625, end: 634 } },
					arguments: [
						{
							kind: 'InputValueDefinition',
							name: { kind: 'Name', value: 'folder_id', loc: { start: 635, end: 644 } },
							type: {
								kind: 'NonNullType',
								type: {
									kind: 'NamedType',
									name: { kind: 'Name', value: 'ID', loc: { start: 646, end: 648 } },
									loc: { start: 646, end: 648 }
								},
								loc: { start: 646, end: 649 }
							},
							directives: [],
							loc: { start: 635, end: 649 }
						},
						{
							kind: 'InputValueDefinition',
							name: { kind: 'Name', value: 'limit', loc: { start: 651, end: 656 } },
							type: {
								kind: 'NamedType',
								name: { kind: 'Name', value: 'Int', loc: { start: 658, end: 661 } },
								loc: { start: 658, end: 661 }
							},
							directives: [],
							loc: { start: 651, end: 661 }
						},
						{
							kind: 'InputValueDefinition',
							name: { kind: 'Name', value: 'page_token', loc: { start: 663, end: 673 } },
							type: {
								kind: 'NamedType',
								name: { kind: 'Name', value: 'String', loc: { start: 675, end: 681 } },
								loc: { start: 675, end: 681 }
							},
							directives: [],
							loc: { start: 663, end: 681 }
						}
					],
					type: {
						kind: 'NamedType',
						name: { kind: 'Name', value: 'NodePage', loc: { start: 684, end: 692 } },
						loc: { start: 684, end: 692 }
					},
					directives: [],
					loc: { start: 625, end: 692 }
				},
				{
					kind: 'FieldDefinition',
					name: { kind: 'Name', value: 'getPublicNode', loc: { start: 695, end: 708 } },
					arguments: [
						{
							kind: 'InputValueDefinition',
							name: { kind: 'Name', value: 'node_link_id', loc: { start: 709, end: 721 } },
							type: {
								kind: 'NonNullType',
								type: {
									kind: 'NamedType',
									name: { kind: 'Name', value: 'String', loc: { start: 723, end: 729 } },
									loc: { start: 723, end: 729 }
								},
								loc: { start: 723, end: 730 }
							},
							directives: [],
							loc: { start: 709, end: 730 }
						}
					],
					type: {
						kind: 'NamedType',
						name: { kind: 'Name', value: 'Node', loc: { start: 733, end: 737 } },
						loc: { start: 733, end: 737 }
					},
					directives: [],
					loc: { start: 695, end: 737 }
				}
			],
			loc: { start: 610, end: 739 }
		}
	],
	loc: { start: 0, end: 739 }
} as unknown as DocumentNode;
