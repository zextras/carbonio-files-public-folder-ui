/*
 * SPDX-FileCopyrightText: 2023 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import React from 'react';

import { ThemeProvider } from '@zextras/carbonio-design-system';

import { HeaderBreadcrumbs } from './components/HeaderBreadcrumbs';
import { ListBc } from './components/ListBc';
import { crumbsBuilder } from './test/utils';

const App = (): React.JSX.Element => (
	<ThemeProvider>
		<HeaderBreadcrumbs crumbs={crumbsBuilder(10)} />
		<ListBc folderId={''} />
	</ThemeProvider>
);

export default App;
