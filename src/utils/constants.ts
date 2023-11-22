/*
 * SPDX-FileCopyrightText: 2023 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import { DefaultTheme } from 'styled-components';

import { GQLNodeType } from '../graphql/types';

export const MIME_TYPE = {
	'application/pdf': 'application/pdf',
	'text/plain': 'text/plain'
};

export const ICON_BY_NODE_TYPE = {
	[GQLNodeType.Application]: (): keyof DefaultTheme['icons'] => 'Code',
	[GQLNodeType.Audio]: (): keyof DefaultTheme['icons'] => 'Music',
	[GQLNodeType.Folder]: (): keyof DefaultTheme['icons'] => 'Folder',
	[GQLNodeType.Image]: (): keyof DefaultTheme['icons'] => 'Image',
	[GQLNodeType.Message]: (): keyof DefaultTheme['icons'] => 'Email',
	[GQLNodeType.Other]: (): keyof DefaultTheme['icons'] => 'File',
	[GQLNodeType.Presentation]: (): keyof DefaultTheme['icons'] => 'FilePresentation',
	[GQLNodeType.Spreadsheet]: (): keyof DefaultTheme['icons'] => 'FileCalc',
	[GQLNodeType.Text]: (mimeType?: string): keyof DefaultTheme['icons'] =>
		mimeType === MIME_TYPE['application/pdf'] ? 'FilePdf' : 'FileText',
	[GQLNodeType.Video]: (): keyof DefaultTheme['icons'] => 'Video'
} satisfies Record<GQLNodeType, () => keyof DefaultTheme['icons']>;

export const ICON_COLOR_BY_NODE_TYPE = {
	[GQLNodeType.Application]: (theme?: DefaultTheme): string =>
		theme?.palette.gray0.regular ?? '#414141',
	[GQLNodeType.Audio]: (theme?: DefaultTheme): string => theme?.palette.gray0.regular ?? '#414141',
	[GQLNodeType.Folder]: (theme?: DefaultTheme): string =>
		theme?.palette.secondary.regular ?? '#828282',
	[GQLNodeType.Image]: (theme?: DefaultTheme): string => theme?.palette.error.regular ?? '#d74942',
	[GQLNodeType.Message]: (theme?: DefaultTheme): string =>
		theme?.palette.primary.regular ?? '#2b73d2',
	[GQLNodeType.Other]: (theme?: DefaultTheme): string =>
		theme?.palette.primary.regular ?? '#2b73d2',
	[GQLNodeType.Presentation]: (theme?: DefaultTheme): string =>
		theme?.avatarColors.avatar_47 ?? '#FFA726',
	[GQLNodeType.Spreadsheet]: (theme?: DefaultTheme): string =>
		theme?.palette.success.regular ?? '#8bc34a',
	[GQLNodeType.Text]: (theme?: DefaultTheme, mimeType?: string): string =>
		mimeType === MIME_TYPE['application/pdf']
			? theme?.palette.error.regular ?? '#d74942'
			: theme?.palette.primary.regular ?? '#2b73d2',
	[GQLNodeType.Video]: (theme?: DefaultTheme): string => theme?.palette.error.regular ?? '#d74942'
} satisfies Record<GQLNodeType, (theme?: DefaultTheme) => string>;

export const FIND_NODES_LIMITS = 25;

export const API_ENDPOINT = '/services/files/public/graphql/';

export const API_DOWNLOAD_ENDPOINT = '/services/files/public/download';

export const ICON = {
	download: 'icon: DownloadOutline'
};
