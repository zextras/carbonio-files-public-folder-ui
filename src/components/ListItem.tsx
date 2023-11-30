/*
 * SPDX-FileCopyrightText: 2023 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import React from 'react';

import { Avatar, Tooltip, IconButton, Text, useTheme } from '@zextras/carbonio-design-system';
import { useTranslation } from 'react-i18next';
import styled, { css, SimpleInterpolation } from 'styled-components';

import { Node } from '../model/Node';
import { ICON_BY_NODE_TYPE, ICON_COLOR_BY_NODE_TYPE } from '../utils/constants';
import { humanFileSize, preventTextSelectionOnDoubleClick } from '../utils/utils';

export interface ListItemProps {
	name: string;
	type: Node['type'];
	mimeType?: string;
	lastModified: number;
	size?: number;
	extension?: string;
	onDoubleClick?: () => void;
	downloadNode?: () => void;
}

const CustomAvatar = styled(Avatar)`
	& svg {
		min-width: 1.5rem;
		min-height: 1.5rem;
		max-width: 1.5rem;
		max-height: 1.5rem;
	}
`;

const RowGrid = styled.div`
	display: grid;
	grid-template-columns: subgrid;
	grid-column: 1 / span 6;
	align-items: center;
	padding: 0.5rem 1.5rem;
	gap: 0 1rem;
	${({ onDoubleClick, theme }): SimpleInterpolation =>
		onDoubleClick !== undefined &&
		css`
			&:hover {
				background-color: ${theme.palette.gray6.hover};
				cursor: pointer;
			}
		`}
`;

export const ListItem: React.FC<ListItemProps> = ({
	name,
	type,
	mimeType,
	lastModified,
	size,
	extension,
	onDoubleClick,
	downloadNode
}) => {
	const [t] = useTranslation();
	const theme = useTheme();

	return (
		<RowGrid
			onDoubleClick={onDoubleClick}
			onMouseDown={preventTextSelectionOnDoubleClick}
			data-testid={'list-item'}
		>
			<CustomAvatar
				label=""
				icon={ICON_BY_NODE_TYPE[type](mimeType)}
				color={ICON_COLOR_BY_NODE_TYPE[type](theme, mimeType)}
				background="gray3"
				shape="square"
				size="large"
			/>
			<Text>{name}</Text>
			<Text>
				{Intl.DateTimeFormat(undefined, {
					day: '2-digit',
					minute: '2-digit',
					hour: '2-digit',
					month: '2-digit',
					year: 'numeric'
				}).format(new Date(lastModified))}
			</Text>
			<Text>{extension ?? '-'}</Text>
			<Text>{size !== undefined ? humanFileSize(size) : '-'}</Text>
			<span>
				{downloadNode !== undefined && (
					<Tooltip label={t('preview.actions.tooltip.download', 'Download')} placement={'top'}>
						<IconButton
							icon={'DownloadOutline'}
							size={'large'}
							borderRadius="round"
							onClick={downloadNode}
						/>
					</Tooltip>
				)}
			</span>
		</RowGrid>
	);
};
