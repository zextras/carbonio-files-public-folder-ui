/*
 * SPDX-FileCopyrightText: 2023 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import React from 'react';

import { Padding, Text } from '@zextras/carbonio-design-system';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

const Span2 = styled.span`
	grid-column: 1 / span 2;
	line-height: 1.5;
`;

interface ListHeaderProps {}
export const ListHeader: React.FC<ListHeaderProps> = () => {
	const [t] = useTranslation();
	return (
		<>
			<Span2>
				<Padding left="2rem" top="1rem" bottom="1rem">
					<Text weight="bold">{t('carbonio-public-folder-ui.listHeader.name', 'Name')}</Text>
				</Padding>
			</Span2>
			<Text weight="bold">
				{t('carbonio-public-folder-ui.listHeader.lastModified', 'Last modified')}
			</Text>
			<Text weight="bold">{t('carbonio-public-folder-ui.listHeader.extension', 'Extension')}</Text>
			<Padding right={'1.5rem'}>
				<Text weight="bold">{t('carbonio-public-folder-ui.listHeader.size', 'Size')}</Text>
			</Padding>
		</>
	);
};
