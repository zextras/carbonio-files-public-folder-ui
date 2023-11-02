import { faker } from '@faker-js/faker';
import { render, screen } from '@testing-library/react';
import { Crumb, ThemeProvider } from '@zextras/carbonio-design-system';
import { expect, it } from 'vitest';

import { HeaderBreadcrumbs } from './HeaderBreadcrumbs';
import { crumbsBuilder } from '../test/utils';

it('should show only one crumb when only one crumb is provided', () => {
	const label = faker.system.fileName({ extensionCount: 0 });
	const crumb: Crumb = {
		label,
		id: label
	};

	render(
		<ThemeProvider>
			<HeaderBreadcrumbs crumbs={[crumb]} />
		</ThemeProvider>
	);
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

	render(
		<ThemeProvider>
			<HeaderBreadcrumbs crumbs={[crumb, crumb2]} />
		</ThemeProvider>
	);
	expect(screen.getByText(label)).toBeVisible();
	expect(screen.getByText(label2)).toBeVisible();
});

it('should show 25 crumbs when 25 crumbs are provided', () => {
	const crumbs = crumbsBuilder(2);
	render(
		<ThemeProvider>
			<div style={{ width: '200px' }}>
				<HeaderBreadcrumbs crumbs={crumbs} />
			</div>
		</ThemeProvider>
	);
	crumbs.forEach(({ label }) => {
		expect(screen.getByText(label)).toBeVisible();
	});
});

it('should show only the name of the folder if it has not a parent', () => {});

it('should show the name of the current folder and its parent, if it has a parent', () => {});

it.todo('should navigate into a specific folder when click on the breadcrumb');
