/*
 * SPDX-FileCopyrightText: 2023 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import React, { useEffect, useRef } from 'react';

import { Divider, Row, useIsVisible } from '@zextras/carbonio-design-system';
import styled from 'styled-components';

import { ListHeader } from './ListHeader';
import { ListItem, ListItemProps } from './ListItem';
import { LoadingIcon } from './LoadingIcon';
import { Node } from '../model/Node';
import { downloadNode } from '../utils/utils';

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
	grid-column: 1 / span 6;
	justify-items: start;
	align-items: center;
	overflow-y: auto;
	overflow-x: hidden;
`;

const RowBorder = styled(Divider)`
	grid-column: 1 / span 6; /* this code makes the row stretch to entire width of the container */
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

interface BottomElementProps {
	listRef: React.RefObject<HTMLDivElement>;
	onVisible: () => void;
}

const CustomRow = styled(Row)`
	grid-column: 1 / span 5; /* this code makes the row stretch to entire width of the container */
`;

const BottomElement: React.FC<BottomElementProps> = ({ listRef, onVisible }) => {
	const [inView, ref] = useIsVisible<HTMLDivElement>(listRef);
	useEffect(() => {
		if (inView && onVisible) {
			onVisible();
		}
	}, [inView, onVisible]);
	return (
		<CustomRow minHeight="3.75rem" width={'fill'}>
			<LoadingIcon icon="Refresh" onClick={onVisible} ref={ref} />
		</CustomRow>
	);
};

interface ListProps {
	nodes: Array<Node>;
	/** callback to be executed when the bottom element is rendered */
	onListBottom?: () => void;
	onItemDoubleClick: (item: Node) => void;
}

export const List: React.FC<ListProps> = ({ nodes, onListBottom, onItemDoubleClick }) => {
	const listRef = useRef<HTMLDivElement>(null);
	const rowsWithDividers = nodes.map<React.JSX.Element>((value, index) => (
		<React.Fragment key={index}>
			<ListItem
				{...convertNodeToListItemProps(value)}
				onDoubleClick={(): void => onItemDoubleClick(value)}
				downloadNode={(): void => downloadNode(value.id)}
			/>
			<RowBorder color="secondary.disabled" />
		</React.Fragment>
	));

	return (
		<Grid ref={listRef}>
			<RowBorder color="secondary.disabled" />
			<ListHeader />
			<RowBorder color="secondary.disabled" />
			<ContentGrid>
				{rowsWithDividers}
				{onListBottom && <BottomElement listRef={listRef} onVisible={onListBottom} />}
			</ContentGrid>
		</Grid>
	);
};
