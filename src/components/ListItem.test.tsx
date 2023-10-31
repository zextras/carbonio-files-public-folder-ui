import { faker } from '@faker-js/faker';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@zextras/carbonio-design-system';
import { expect, it } from 'vitest';

import { ListItem } from './ListItem.tsx';
import { listItemPropsBuilder } from '../test/utils.ts';
import { NodeType } from '../types/graphql/types.ts';
import { ICON_BY_NODE_TYPE, ICON_COLOR_BY_NODE_TYPE, MIME_TYPE } from '../utils/constants.ts';
import { humanFileSize } from '../utils/utils.ts';

it('should show the name of list item', () => {
	const props = listItemPropsBuilder();
	render(
		<ThemeProvider>
			<ListItem {...props} />
		</ThemeProvider>
	);
	expect(screen.getByText(props.name)).toBeVisible();
});

it.each(Object.values(NodeType).filter((nodeType) => nodeType !== NodeType.Text))(
	'should show the icon for type %s',
	(nodeType) => {
		const props = listItemPropsBuilder({ type: nodeType });
		render(
			<ThemeProvider>
				<ListItem {...props} />
			</ThemeProvider>
		);
		expect(screen.getByTestId(`icon: ${ICON_BY_NODE_TYPE[props.type]()}`)).toBeVisible();
	}
);

it('should show the FilePdf icon when NodeType is Text and mimeType is application/pdf', () => {
	const props = listItemPropsBuilder({
		type: NodeType.Text,
		mimeType: MIME_TYPE['application/pdf']
	});
	render(
		<ThemeProvider>
			<ListItem {...props} />
		</ThemeProvider>
	);
	expect(
		screen.getByTestId(`icon: ${ICON_BY_NODE_TYPE[props.type](MIME_TYPE['application/pdf'])}`)
	).toBeVisible();
});

it('should show the FileText icon when NodeType is Text and mimeType is not application/pdf ', () => {
	const props = listItemPropsBuilder({
		type: NodeType.Text,
		mimeType: MIME_TYPE['text/plain']
	});
	render(
		<ThemeProvider>
			<ListItem {...props} />
		</ThemeProvider>
	);
	expect(
		screen.getByTestId(`icon: ${ICON_BY_NODE_TYPE[props.type](MIME_TYPE['text/plain'])}`)
	).toBeVisible();
});

it.each(Object.values(NodeType).filter((nodeType) => nodeType !== NodeType.Text))(
	'should show the colored icon for type %s',
	(nodeType) => {
		const props = listItemPropsBuilder({ type: nodeType });
		render(
			<ThemeProvider>
				<ListItem {...props} />
			</ThemeProvider>
		);
		expect(screen.getByTestId(`icon: ${ICON_BY_NODE_TYPE[props.type]()}`)).toHaveStyle({
			color: ICON_COLOR_BY_NODE_TYPE[props.type]()
		});
	}
);

it('should show the error colored icon when NodeType is Text and mimeType is application/pdf ', () => {
	const props = listItemPropsBuilder({
		type: NodeType.Text,
		mimeType: MIME_TYPE['application/pdf']
	});
	render(
		<ThemeProvider>
			<ListItem {...props} />
		</ThemeProvider>
	);
	expect(
		screen.getByTestId(`icon: ${ICON_BY_NODE_TYPE[props.type](MIME_TYPE['application/pdf'])}`)
	).toHaveStyle({
		color: ICON_COLOR_BY_NODE_TYPE[props.type](undefined, MIME_TYPE['application/pdf'])
	});
});

it('should show the primary colored icon when NodeType is Text and mimeType is not application/pdf ', () => {
	const props = listItemPropsBuilder({
		type: NodeType.Text,
		mimeType: MIME_TYPE['text/plain']
	});
	render(
		<ThemeProvider>
			<ListItem {...props} />
		</ThemeProvider>
	);
	expect(
		screen.getByTestId(`icon: ${ICON_BY_NODE_TYPE[props.type](MIME_TYPE['text/plain'])}`)
	).toHaveStyle({
		color: ICON_COLOR_BY_NODE_TYPE[props.type](undefined, MIME_TYPE['text/plain'])
	});
});

it('should show the last modified formatted date and time', () => {
	const props = listItemPropsBuilder({ lastModified: new Date().valueOf() });
	render(
		<ThemeProvider>
			<ListItem {...props} />
		</ThemeProvider>
	);
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
	render(
		<ThemeProvider>
			<ListItem {...listItemPropsBuilder()} size={size} />
		</ThemeProvider>
	);
	expect(screen.getByText(humanFileSize(size))).toBeVisible();
});

it('should show the size if provided and value is 0', () => {
	render(
		<ThemeProvider>
			<ListItem {...listItemPropsBuilder()} size={0} />
		</ThemeProvider>
	);
	expect(screen.getByText(humanFileSize(0))).toBeVisible();
});

it('should show a - if the size is not provided', () => {
	render(
		<ThemeProvider>
			<ListItem {...listItemPropsBuilder()} size={undefined} />
		</ThemeProvider>
	);
	expect(screen.getByText('-')).toBeVisible();
});

it.todo('should show the size of a file');

it.todo('should not show the size of a folder');

it('should show the extension if provided', () => {
	const extension = faker.system.fileExt();
	render(
		<ThemeProvider>
			<ListItem {...listItemPropsBuilder()} extension={extension} />
		</ThemeProvider>
	);
	expect(screen.getByText(extension)).toBeVisible();
});
