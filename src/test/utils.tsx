/*
 * SPDX-FileCopyrightText: 2023 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { PropsWithChildren, ReactElement } from 'react';

import { faker } from '@faker-js/faker';
import { act, render, RenderOptions, RenderResult, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { BreadcrumbsProps, Crumb, ThemeProvider } from '@zextras/carbonio-design-system';
import { vi } from 'vitest';

import { ICONS } from './constants';
import { ListItemProps } from '../components/ListItem';
import { GQLNodeType } from '../graphql/types';

export function listItemPropsBuilder(props?: Partial<ListItemProps>): ListItemProps {
	return {
		name: faker.system.fileName({ extensionCount: 0 }),
		type: faker.helpers.arrayElement(Object.values(GQLNodeType)),
		mimeType: faker.system.mimeType(),
		lastModified: faker.date.recent().valueOf(),
		size: faker.number.int(),
		extension: faker.system.fileExt(),
		...props
	};
}

export function crumbsBuilder(count: number = 3): BreadcrumbsProps['crumbs'] {
	return [...Array(count)].map((_, index) => {
		const label2 = faker.system.fileName({ extensionCount: 0 });
		const crumb2: Crumb = {
			label: label2,
			id: `${index}`
		};

		return crumb2;
	});
}

type SetupOptions = {
	renderOptions?: Omit<RenderOptions, 'queries'>;
	setupOptions?: Parameters<(typeof userEvent)['setup']>[0];
};

export type UserEvent = ReturnType<(typeof userEvent)['setup']> & {
	readonly rightClick: (target: Element) => Promise<void>;
};

const setupUserEvent = (options: SetupOptions['setupOptions']): UserEvent => {
	const user = userEvent.setup(options);
	const rightClick = (target: Element): Promise<void> =>
		user.pointer({ target, keys: '[MouseRight]' });

	return {
		...user,
		rightClick
	};
};

function customRender(
	ui: React.ReactElement,
	options?: Omit<RenderOptions, 'queries' | 'wrapper'>
): RenderResult {
	return render(ui, {
		wrapper: ({ children }: PropsWithChildren) => <ThemeProvider>{children}</ThemeProvider>,
		...options
	});
}

export const setup = (
	ui: ReactElement,
	options?: SetupOptions
): { user: UserEvent } & ReturnType<typeof customRender> => ({
	user: setupUserEvent({ advanceTimers: vi.advanceTimersByTime, ...options?.setupOptions }),
	...customRender(ui, options?.renderOptions)
});

export function triggerLoadMore(): void {
	const { calls, instances } = vi.mocked(window.IntersectionObserver).mock;
	const [onChange] = calls[calls.length - 1];
	const instance = instances[instances.length - 1];
	// trigger the intersection on the observed element
	act(() => {
		onChange(
			[
				{
					target: screen.getByTestId(ICONS.queryLoading),
					intersectionRatio: 0,
					isIntersecting: true
				} as unknown as IntersectionObserverEntry
			],
			instance
		);
	});
}
