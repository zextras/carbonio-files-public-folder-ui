import { DefaultTheme } from 'styled-components';

import { NodeType } from '../types/graphql/types.ts';

export const ICON_BY_NODE_TYPE = {
	[NodeType.Application]: () => 'Code',
	[NodeType.Audio]: () => 'Music',
	[NodeType.Folder]: () => 'Folder',
	[NodeType.Image]: () => 'Image',
	[NodeType.Message]: () => 'Email',
	[NodeType.Other]: () => 'File',
	[NodeType.Presentation]: () => 'FilePresentation',
	[NodeType.Spreadsheet]: () => 'FileCalc',
	[NodeType.Text]: (mimeType?: string) =>
		mimeType === MIME_TYPE['application/pdf'] ? 'FilePdf' : 'FileText',
	[NodeType.Video]: () => 'Video'
} satisfies Record<NodeType, () => keyof DefaultTheme['icons']>;

export const ICON_COLOR_BY_NODE_TYPE = {
	[NodeType.Application]: (theme?: DefaultTheme) => theme?.palette.gray0.regular ?? '#414141',
	[NodeType.Audio]: (theme?: DefaultTheme) => theme?.palette.gray0.regular ?? '#414141',
	[NodeType.Folder]: (theme?: DefaultTheme) => theme?.palette.secondary.regular ?? '#828282',
	[NodeType.Image]: (theme?: DefaultTheme) => theme?.palette.error.regular ?? '#d74942',
	[NodeType.Message]: (theme?: DefaultTheme) => theme?.palette.primary.regular ?? '#2b73d2',
	[NodeType.Other]: (theme?: DefaultTheme) => theme?.palette.primary.regular ?? '#2b73d2',
	[NodeType.Presentation]: (theme?: DefaultTheme) => theme?.avatarColors.avatar_47 ?? '#FFA726',
	[NodeType.Spreadsheet]: (theme?: DefaultTheme) => theme?.palette.success.regular ?? '#8bc34a',
	[NodeType.Text]: (theme?: DefaultTheme, mimeType?: string) =>
		mimeType === MIME_TYPE['application/pdf']
			? theme?.palette.error.regular ?? '#d74942'
			: theme?.palette.primary.regular ?? '#2b73d2',
	[NodeType.Video]: (theme?: DefaultTheme) => theme?.palette.error.regular ?? '#d74942'
} satisfies Record<NodeType, (theme?: DefaultTheme) => string>;

export const MIME_TYPE = {
	'application/pdf': 'application/pdf',
	'text/plain': 'text/plain'
};
