/*
 * SPDX-FileCopyrightText: 2023 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import { render } from '@testing-library/react';
import { ThemeProvider } from '@zextras/carbonio-design-system';
import { it } from 'vitest';

import { List } from './List';

it('should ', () => {
	render(
		<ThemeProvider>
			<List nodes={[]} />
		</ThemeProvider>
	);
});
