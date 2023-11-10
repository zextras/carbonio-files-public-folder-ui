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
	min-height: 0;
	flex-shrink: 1;
	box-sizing: border-box;
	width: 100%;
	gap: 0.5rem 1rem;
	display: grid;
	grid-template-columns: max-content 3fr repeat(3, minmax(max-content, 1fr));
	justify-items: start;
	align-items: baseline;
	grid-template-rows: auto auto auto 1fr;
`;

const ContentGrid = styled.div`
	height: 100%;
	gap: 0.5rem 1rem;
	display: grid;
	grid-template-columns: subgrid;
	grid-column: 1 / span 5;
	justify-items: start;
	align-items: center;
	overflow-y: auto;
	overflow-x: hidden;
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

// interface BottomElementProps {
// 	listRef: React.RefObject<HTMLDivElement>;
// 	onVisible: () => void;
// }

// const BottomElement: React.FC<BottomElementProps> = ({ listRef, onVisible }) => {
// 	const [inView, ref] = useIsVisible<HTMLDivElement>(listRef);
// 	useEffect(() => {
// 		if (inView && onVisible) {
// 			onVisible();
// 		}
// 	}, [inView, onVisible]);
// 	return <div ref={ref} style={{ minHeight: '4px', minWidth: '1px' }} />;
// };
interface ListProps {
	nodes: Array<Node>;
	/** callback to be executed when the bottom element is rendered */
	onListBottom?: () => void;
}

export const List: React.FC<ListProps> = ({ nodes }) => {
	const rowsWithDividers = nodes.map<React.JSX.Element>((value, index) => (
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
			<ContentGrid>{rowsWithDividers}</ContentGrid>
		</Grid>
	);
};
