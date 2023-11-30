/*
 * SPDX-FileCopyrightText: 2023 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import React from 'react';

import { Breadcrumbs, BreadcrumbsProps, Container } from '@zextras/carbonio-design-system';
import styled from 'styled-components';

const CustomBreadcrumbs = styled(Breadcrumbs)`
	.crumb {
		&.item-clickable {
			color: ${({ theme }): string => theme.palette.secondary.regular};
			&:hover {
				background-color: ${({ theme }): string => theme.palette.gray6.hover};
			}
		}

		&:not(.item-clickable) {
			cursor: default;
		}
	}
`;

interface HeaderBreadcrumbsProps {
	crumbs: BreadcrumbsProps['crumbs'];
}

export const HeaderBreadcrumbs: React.FC<HeaderBreadcrumbsProps> = ({ crumbs }) => {
	const styledCrumbs = crumbs.map((item, index) => {
		const isLastCrumb = index === crumbs.length - 1;
		return {
			...item,
			className: `crumb ${isLastCrumb ? '' : 'item-clickable'}`,
			onClick: isLastCrumb ? undefined : item.onClick,
			'data-testid': 'crumb'
		};
	});
	return (
		<Container height={'auto'} padding={{ all: '1rem' }} width="100vw" background={'gray5'}>
			<CustomBreadcrumbs data-testid={'breadcrumbs'} crumbs={styledCrumbs} />
		</Container>
	);
};
