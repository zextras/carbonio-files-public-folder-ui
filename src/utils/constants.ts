/*
 * SPDX-FileCopyrightText: 2023 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import type { Theme } from '@zextras/carbonio-design-system';

import { GQLNodeType } from '../graphql/types';

export const MIME_TYPE = {
	'application/pdf': 'application/pdf',
	'text/plain': 'text/plain'
};

export const ICON_BY_NODE_TYPE = {
	[GQLNodeType.Application]: (): keyof Theme['icons'] => 'Code',
	[GQLNodeType.Audio]: (): keyof Theme['icons'] => 'Music',
	[GQLNodeType.Folder]: (): keyof Theme['icons'] => 'Folder',
	[GQLNodeType.Image]: (): keyof Theme['icons'] => 'Image',
	[GQLNodeType.Message]: (): keyof Theme['icons'] => 'Email',
	[GQLNodeType.Other]: (): keyof Theme['icons'] => 'File',
	[GQLNodeType.Presentation]: (): keyof Theme['icons'] => 'FilePresentation',
	[GQLNodeType.Spreadsheet]: (): keyof Theme['icons'] => 'FileCalc',
	[GQLNodeType.Text]: (mimeType?: string): keyof Theme['icons'] =>
		mimeType === MIME_TYPE['application/pdf'] ? 'FilePdf' : 'FileText',
	[GQLNodeType.Video]: (): keyof Theme['icons'] => 'Video'
} satisfies Record<GQLNodeType, () => keyof Theme['icons']>;

export const ICON_COLOR_BY_NODE_TYPE = {
	[GQLNodeType.Application]: (theme?: Theme): string => theme?.palette.gray0.regular ?? '#414141',
	[GQLNodeType.Audio]: (theme?: Theme): string => theme?.palette.gray0.regular ?? '#414141',
	[GQLNodeType.Folder]: (theme?: Theme): string => theme?.palette.secondary.regular ?? '#828282',
	[GQLNodeType.Image]: (theme?: Theme): string => theme?.palette.error.regular ?? '#d74942',
	[GQLNodeType.Message]: (theme?: Theme): string => theme?.palette.primary.regular ?? '#2b73d2',
	[GQLNodeType.Other]: (theme?: Theme): string => theme?.palette.primary.regular ?? '#2b73d2',
	[GQLNodeType.Presentation]: (theme?: Theme): string => theme?.avatarColors.avatar_47 ?? '#FFA726',
	[GQLNodeType.Spreadsheet]: (theme?: Theme): string => theme?.palette.success.regular ?? '#8bc34a',
	[GQLNodeType.Text]: (theme?: Theme, mimeType?: string): string =>
		mimeType === MIME_TYPE['application/pdf']
			? (theme?.palette.error.regular ?? '#d74942')
			: (theme?.palette.primary.regular ?? '#2b73d2'),
	[GQLNodeType.Video]: (theme?: Theme): string => theme?.palette.error.regular ?? '#d74942'
} satisfies Record<GQLNodeType, (theme?: Theme) => string>;

export const FIND_NODES_LIMITS = 25;

export const API_ENDPOINT = '/services/files/public/graphql/';
export const API_DOWNLOAD_ENDPOINT = '/services/files/public/download';

export const CARBONIO_STATIC_PATH = '/static/iris/';
export const COMPONENTS_ENDPOINT = `${CARBONIO_STATIC_PATH}components.json`;
export const I18N_PATH = '/i18n/{{lng}}.json';
export const FILES_PROJECT_NAME = 'carbonio-files-ui';
export const LOGIN_V3_CONFIG_PATH = '/zx/login/v3/config';

export const ERROR = {
	accessCodeRequired: 'ACCESS_CODE_REQUIRED',
	wrongAccessCode: 'WRONG_ACCESS_CODE',
	linkNotFound: 'LINK_NOT_FOUND'
} as const;
