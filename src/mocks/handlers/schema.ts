/*
 * SPDX-FileCopyrightText: 2023 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import { buildSchema, print } from 'graphql';

import { schema as schemaPublic } from '../../graphql/schema-public';

export const schema = buildSchema(print(schemaPublic));
