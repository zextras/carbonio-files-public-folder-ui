/*
 * SPDX-FileCopyrightText: 2023 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import React from 'react';

import styled from '@emotion/styled';
import type { BreadcrumbsProps } from '@zextras/carbonio-design-system';
import { Breadcrumbs, Container } from '@zextras/carbonio-design-system';

const CustomBreadcrumbs = styled(Breadcrumbs)`
	.crumb {
		&.item-clickable {
			color: ${({ theme }): string => theme.palette.secondary.regular};
			&:hover {
				background-color: ${({ theme }): string => theme.palette.gray6.hover};
			}
		}
	}
`;

interface HeaderBreadcrumbsProps {
	crumbs: BreadcrumbsProps['crumbs'];
	children?: React.ReactNode;
}

export const HeaderBreadcrumbs: React.FC<HeaderBreadcrumbsProps> = ({ crumbs, children }) => {
	const styledCrumbs = crumbs.map((item, index) => {
		const isLastCrumb = index === crumbs.length - 1;
		return {
			...item,
			className: `crumb ${!isLastCrumb && 'item-clickable'}`,
			onClick: isLastCrumb ? undefined : item.onClick,
			'data-testid': 'crumb',
			style: isLastCrumb
				? { cursor: 'default', ...item.style }
				: { cursor: 'pointer', ...item.style }
		};
	});
	return (
		<Container
			height={'auto'}
			padding={{ all: '1rem' }}
			width="100vw"
			background={'gray5'}
			orientation={'horizontal'}
		>
			<CustomBreadcrumbs data-testid={'breadcrumbs'} crumbs={styledCrumbs} />
			{children}
		</Container>
	);
};
