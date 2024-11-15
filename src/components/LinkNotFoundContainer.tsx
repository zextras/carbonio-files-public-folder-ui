/*
 * SPDX-FileCopyrightText: 2024 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import React from 'react';

import { Container, Text } from '@zextras/carbonio-design-system';
import { useTranslation } from 'react-i18next';

import { IconBig } from './IconBig';

export const LinkNotFoundContainer = (): React.JSX.Element => {
	const [t] = useTranslation();
	return (
		<Container gap={'0.0625rem'}>
			<IconBig icon={'EmptyFolder'} color={'gray5'} />
			<Container height={'auto'} width={'auto'} gap={'0.5rem'}>
				<Text weight={'bold'} color={'secondary'}>
					{t('carbonio-public-folder-ui.invalidLink.title', 'Public access link not available.')}
				</Text>
				<Text color={'secondary'}>
					{t(
						'carbonio-public-folder-ui.invalidLink.description.line1',
						'This link has been removed or is not valid.'
					)}
				</Text>
				<Text color={'secondary'}>
					{t(
						'carbonio-public-folder-ui.invalidLink.description.line2',
						'For more information, try to contact the person who shared it with you.'
					)}
				</Text>
			</Container>
		</Container>
	);
};
