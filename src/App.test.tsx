/*
 * SPDX-FileCopyrightText: 2023 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import { render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';

import App from './App';

it.todo('should show the content of the folder', () => {
	render(<App />);
	expect(screen.getByText('Folder name')).toBeVisible();
	expect(screen.getByText('Name')).toBeVisible();
	expect(screen.getByText('Last modified')).toBeVisible();
	expect(screen.getByText('Extension')).toBeVisible();
	expect(screen.getByText('Size')).toBeVisible();
	expect(screen.getByText('Name of the subfolder')).toBeVisible();
	expect(screen.getByText('Name of file 1')).toBeVisible();
	expect(screen.getByText('Name of file 2')).toBeVisible();
});
