/*
 * SPDX-FileCopyrightText: 2023 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

export const ICONS = {
	emptyFolder: 'icon: Folder',
	contentLoader: 'icon: LoaderOutline',
	queryLoading: 'icon: Refresh',
	unavailableFolder: 'icon: EmptyFolder'
} as const;

export const SELECTORS = {
	breadcrumbs: 'breadcrumbs',
	crumb: 'crumb',
	listItem: 'list-item'
} as const;

export const COLORS = {
	crumbHover: '#E6E6E6',
	listItemHover: '#E6E6E6'
};
