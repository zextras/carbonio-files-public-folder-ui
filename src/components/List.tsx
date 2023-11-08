/*
 * SPDX-FileCopyrightText: 2023 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import React from 'react';

import { Divider } from '@zextras/carbonio-design-system';
import styled from 'styled-components';

import { ListHeader } from './ListHeader';
import { ListItem, ListItemProps } from './ListItem';
import { Node } from '../model/Node';

const Grid = styled.div`
	box-sizing: border-box;
	width: 100%;
	gap: 0.5rem 1rem;
	display: grid;
	grid-template-columns: max-content 3fr repeat(3, minmax(max-content, 1fr));
	justify-items: start;
	align-items: center;
	grid-template-rows: minmax(max-content, 1fr);
`;

const RowBorder = styled(Divider)`
	grid-column: 1 / span 5; /* this code makes the row stretch to entire width of the container */
`;

function convertNodeToListItemProps(node: Node): ListItemProps {
	return {
		name: node.name,
		type: node.type,
		mimeType: node.mimeType,
		lastModified: node.updatedAt,
		size: node.size,
		extension: node.extension ?? undefined
	};
}

interface ListProps {
	nodes: Array<Node>;
}
export const List: React.FC<ListProps> = ({ nodes }) => {
	const rowsWithDividers = nodes.map((value, index) => (
		<React.Fragment key={index}>
			<ListItem {...convertNodeToListItemProps(value)} />
			<RowBorder color="secondary.disabled" />
		</React.Fragment>
	));
	return (
		<Grid>
			<RowBorder color="secondary.disabled" />
			<ListHeader />
			<RowBorder color="secondary.disabled" />
			{rowsWithDividers}
		</Grid>
	);
};
