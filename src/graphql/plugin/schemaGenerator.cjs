/*
 * SPDX-FileCopyrightText: 2023 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
const { printSchema, parse } = require('graphql');

module.exports = {
	plugin(schema, documents, config, info) {
		const schemaStr = printSchema(schema);
		const schemaNode = parse(schemaStr);
		return `export const schema = ${JSON.stringify(schemaNode)} as unknown as DocumentNode`;
	}
}