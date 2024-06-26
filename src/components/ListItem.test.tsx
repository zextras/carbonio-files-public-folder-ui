/*
 * SPDX-FileCopyrightText: 2023 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import { faker } from '@faker-js/faker';
import { expect, it, vi } from 'vitest';

import { ListItem } from './ListItem';
import { GQLNodeType } from '../graphql/types';
import { COLORS, ICONS, SELECTORS } from '../test/constants';
import { listItemPropsBuilder, screen, setup } from '../test/utils';
import { ICON_BY_NODE_TYPE, ICON_COLOR_BY_NODE_TYPE, MIME_TYPE } from '../utils/constants';
import { humanFileSize } from '../utils/utils';

it('should show the name of list item', () => {
	const props = listItemPropsBuilder();
	setup(<ListItem {...props} />);
	expect(screen.getByText(props.name)).toBeVisible();
});

it.each(Object.values(GQLNodeType).filter((nodeType) => nodeType !== GQLNodeType.Text))(
	'should show the icon for type %s',
	(nodeType) => {
		const props = listItemPropsBuilder({ type: nodeType });
		setup(<ListItem {...props} />);
		expect(screen.getByTestId(`icon: ${ICON_BY_NODE_TYPE[props.type]()}`)).toBeVisible();
	}
);

it('should show the FilePdf icon when NodeType is Text and mimeType is application/pdf', () => {
	const props = listItemPropsBuilder({
		type: GQLNodeType.Text,
		mimeType: MIME_TYPE['application/pdf']
	});
	setup(<ListItem {...props} />);
	expect(
		screen.getByTestId(`icon: ${ICON_BY_NODE_TYPE[props.type](MIME_TYPE['application/pdf'])}`)
	).toBeVisible();
});

it('should show the FileText icon when NodeType is Text and mimeType is not application/pdf ', () => {
	const props = listItemPropsBuilder({
		type: GQLNodeType.Text,
		mimeType: MIME_TYPE['text/plain']
	});
	setup(<ListItem {...props} />);
	expect(
		screen.getByTestId(`icon: ${ICON_BY_NODE_TYPE[props.type](MIME_TYPE['text/plain'])}`)
	).toBeVisible();
});

it.each(Object.values(GQLNodeType).filter((nodeType) => nodeType !== GQLNodeType.Text))(
	'should show the colored icon for type %s',
	(nodeType) => {
		const props = listItemPropsBuilder({ type: nodeType });
		setup(<ListItem {...props} />);
		expect(screen.getByTestId(`icon: ${ICON_BY_NODE_TYPE[props.type]()}`)).toHaveStyle({
			color: ICON_COLOR_BY_NODE_TYPE[props.type]()
		});
	}
);

it('should show the error colored icon when NodeType is Text and mimeType is application/pdf ', () => {
	const props = listItemPropsBuilder({
		type: GQLNodeType.Text,
		mimeType: MIME_TYPE['application/pdf']
	});
	setup(<ListItem {...props} />);
	expect(
		screen.getByTestId(`icon: ${ICON_BY_NODE_TYPE[props.type](MIME_TYPE['application/pdf'])}`)
	).toHaveStyle({
		color: ICON_COLOR_BY_NODE_TYPE[props.type](undefined, MIME_TYPE['application/pdf'])
	});
});

it('should show the primary colored icon when NodeType is Text and mimeType is not application/pdf ', () => {
	const props = listItemPropsBuilder({
		type: GQLNodeType.Text,
		mimeType: MIME_TYPE['text/plain']
	});
	setup(<ListItem {...props} />);
	expect(
		screen.getByTestId(`icon: ${ICON_BY_NODE_TYPE[props.type](MIME_TYPE['text/plain'])}`)
	).toHaveStyle({
		color: ICON_COLOR_BY_NODE_TYPE[props.type](undefined, MIME_TYPE['text/plain'])
	});
});

it('should show the last modified formatted date and time', () => {
	const props = listItemPropsBuilder({ lastModified: new Date().valueOf() });
	setup(<ListItem {...props} />);
	expect(
		screen.getByText(
			Intl.DateTimeFormat(undefined, {
				day: '2-digit',
				minute: '2-digit',
				hour: '2-digit',
				month: '2-digit',
				year: 'numeric'
			}).format(new Date(props.lastModified))
		)
	).toBeVisible();
});

it('should show the size if provided', () => {
	const size = faker.number.int();
	setup(<ListItem {...listItemPropsBuilder()} size={size} />);
	expect(screen.getByText(humanFileSize(size))).toBeVisible();
});

it('should show the size if provided and value is 0', () => {
	setup(<ListItem {...listItemPropsBuilder()} size={0} />);
	expect(screen.getByText(humanFileSize(0))).toBeVisible();
});

it('should show a - if the size is not provided', () => {
	setup(<ListItem {...listItemPropsBuilder()} size={undefined} />);
	expect(screen.getByText('-')).toBeVisible();
});

it('should show the extension if provided', () => {
	const extension = faker.system.fileExt();
	setup(<ListItem {...listItemPropsBuilder()} extension={extension} />);
	expect(screen.getByText(extension)).toBeVisible();
});

it('should show overlay on hover if onDoubleClick is valued', async () => {
	const { user } = setup(
		<ListItem
			{...listItemPropsBuilder()}
			onDoubleClick={(): void => undefined}
			data-testid={'item'}
		/>
	);
	const listItem = screen.getByTestId(SELECTORS.listItem);
	await user.hover(listItem);
	expect(listItem).toHaveStyle({
		backgroundColor: COLORS.listItemHover,
		cursor: 'pointer'
	});
});

it('should not show overlay on hover if onDoubleClick is not valued', async () => {
	const { user } = setup(<ListItem {...listItemPropsBuilder()} onDoubleClick={undefined} />);
	const listItem = screen.getByTestId(SELECTORS.listItem);
	await user.hover(listItem);
	expect(listItem).not.toHaveStyle({
		backgroundColor: COLORS.listItemHover
	});
	expect(listItem).not.toHaveStyle({ cursor: 'pointer' });
});

it('should show the download button icon if downloadNode is not undefined', () => {
	const props = listItemPropsBuilder({
		downloadNode: vi.fn()
	});
	setup(<ListItem {...props} />);

	expect(screen.getByRoleWithIcon('button', { icon: ICONS.download })).toBeVisible();
});

it('should not show the download icon if downloadNode is undefined', () => {
	const props = listItemPropsBuilder({
		downloadNode: undefined
	});
	setup(<ListItem {...props} />);
	expect(screen.queryByRoleWithIcon('button', { icon: ICONS.download })).not.toBeInTheDocument();
});

it('should show the tooltip on hover of the download icon', async () => {
	const props = listItemPropsBuilder({
		downloadNode: vi.fn()
	});
	const { user } = setup(<ListItem {...props} />);
	vi.advanceTimersToNextTimer();
	await user.hover(screen.getByRoleWithIcon('button', { icon: ICONS.download }));
	expect(await screen.findByText('Download')).toBeVisible();
});

it('should call the download function when the user clicks on the icon button', async () => {
	const props = listItemPropsBuilder({
		downloadNode: vi.fn()
	});
	const { user } = setup(<ListItem {...props} />);
	await user.click(screen.getByRoleWithIcon('button', { icon: ICONS.download }));
	expect(props.downloadNode).toHaveBeenCalled();
});
