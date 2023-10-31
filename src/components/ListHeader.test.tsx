/*
 * SPDX-FileCopyrightText: 2023 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@zextras/carbonio-design-system';
import { expect, it } from 'vitest';

import { ListHeader } from './ListHeader';

it('should show name, last modified, extension and size as list header fields', () => {
	render(
		<ThemeProvider>
			<ListHeader />
		</ThemeProvider>
	);
	expect(screen.getByText('Name')).toBeVisible();
	expect(screen.getByText('Last modified')).toBeVisible();
	expect(screen.getByText('Extension')).toBeVisible();
	expect(screen.getByText('Size')).toBeVisible();
});
