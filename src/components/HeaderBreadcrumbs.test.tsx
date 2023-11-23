/*
 * SPDX-FileCopyrightText: 2023 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import { faker } from '@faker-js/faker';
import { screen, within } from '@testing-library/react';
import { Crumb } from '@zextras/carbonio-design-system';
import { expect, it } from 'vitest';

import { HeaderBreadcrumbs } from './HeaderBreadcrumbs';
import { COLORS, SELECTORS } from '../test/constants';
import { crumbsBuilder, setup } from '../test/utils';

it('should show only one crumb when only one crumb is provided', () => {
	const label = faker.system.fileName({ extensionCount: 0 });
	const crumb: Crumb = {
		label,
		id: label
	};

	setup(<HeaderBreadcrumbs crumbs={[crumb]} />);
	expect(screen.getByText(label)).toBeVisible();
});

it('should show 2 crumbs when 2 crumbs are provided', () => {
	const label = faker.system.fileName({ extensionCount: 0 });
	const crumb: Crumb = {
		label,
		id: label
	};

	const label2 = faker.system.fileName({ extensionCount: 0 });
	const crumb2: Crumb = {
		label: label2,
		id: label2
	};

	setup(<HeaderBreadcrumbs crumbs={[crumb, crumb2]} />);
	expect(screen.getByText(label)).toBeVisible();
	expect(screen.getByText(label2)).toBeVisible();
});

it('should show 25 crumbs when 25 crumbs are provided', () => {
	const crumbs = crumbsBuilder(2);
	setup(
		<div style={{ width: '200px' }}>
			<HeaderBreadcrumbs crumbs={crumbs} />
		</div>
	);
	crumbs.forEach(({ label }) => {
		expect(screen.getByText(label)).toBeVisible();
	});
});

it('should show overlay on hover on clickable item', async () => {
	const crumbs = crumbsBuilder(2);
	const { user } = setup(<HeaderBreadcrumbs crumbs={crumbs} />);
	await user.hover(screen.getByText(crumbs[0].label));
	expect(
		screen
			.getAllByTestId(SELECTORS.crumb)
			.find((crumb) => within(crumb).queryByText(crumbs[0].label) !== null)
	).toHaveStyle({
		backgroundColor: COLORS.crumbHover,
		cursor: 'pointer'
	});
});

it('should not show overlay on hover on last item', async () => {
	const crumbs = crumbsBuilder(2);
	const { user } = setup(<HeaderBreadcrumbs crumbs={crumbs} />);
	await user.hover(screen.getByText(crumbs[0].label));
	const lastCrumb = screen
		.getAllByTestId(SELECTORS.crumb)
		.find((crumb) => within(crumb).queryByText(crumbs[1].label) !== null);
	expect(lastCrumb).not.toHaveStyle({
		backgroundColor: COLORS.crumbHover
	});
	expect(lastCrumb).toHaveStyle({
		cursor: 'default'
	});
});

it('should show only the name of the folder if it has not a parent', () => {});

it('should show the name of the current folder and its parent, if it has a parent', () => {});

it.todo('should navigate into a specific folder when click on the breadcrumb');
