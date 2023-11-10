/*
 * SPDX-FileCopyrightText: 2023 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import React from 'react';

import { Breadcrumbs, BreadcrumbsProps, Container } from '@zextras/carbonio-design-system';

interface HeaderBreadcrumbsProps {
	crumbs: BreadcrumbsProps['crumbs'];
}

export const HeaderBreadcrumbs: React.FC<HeaderBreadcrumbsProps> = ({ crumbs }) => (
	<Container height={'auto'} padding={{ all: '1rem' }} width="100vw" background="gray5">
		<Breadcrumbs crumbs={crumbs} />
	</Container>
);
