/*
 * SPDX-FileCopyrightText: 2023 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import type { UserConfig } from '@commitlint/types';

const configs: UserConfig = {
	extends: ['@commitlint/config-conventional']
};

export default configs;
