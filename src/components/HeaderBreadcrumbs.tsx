import React from 'react';

import { Breadcrumbs, BreadcrumbsProps, Container } from '@zextras/carbonio-design-system';

interface HeaderBreadcrumbsProps {
	crumbs: BreadcrumbsProps['crumbs'];
}

export const HeaderBreadcrumbs: React.FC<HeaderBreadcrumbsProps> = ({ crumbs }) => (
	<Container padding={{ all: '1rem' }} width="100vw" background="gray5">
		<Breadcrumbs crumbs={crumbs} />
	</Container>
);
