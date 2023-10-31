import { DefaultTheme } from 'styled-components';

import { NodeType } from '../types/graphql/types';

export const MIME_TYPE = {
	'application/pdf': 'application/pdf',
	'text/plain': 'text/plain'
};

export const ICON_BY_NODE_TYPE = {
	[NodeType.Application]: (): keyof DefaultTheme['icons'] => 'Code',
	[NodeType.Audio]: (): keyof DefaultTheme['icons'] => 'Music',
	[NodeType.Folder]: (): keyof DefaultTheme['icons'] => 'Folder',
	[NodeType.Image]: (): keyof DefaultTheme['icons'] => 'Image',
	[NodeType.Message]: (): keyof DefaultTheme['icons'] => 'Email',
	[NodeType.Other]: (): keyof DefaultTheme['icons'] => 'File',
	[NodeType.Presentation]: (): keyof DefaultTheme['icons'] => 'FilePresentation',
	[NodeType.Spreadsheet]: (): keyof DefaultTheme['icons'] => 'FileCalc',
	[NodeType.Text]: (mimeType?: string): keyof DefaultTheme['icons'] =>
		mimeType === MIME_TYPE['application/pdf'] ? 'FilePdf' : 'FileText',
	[NodeType.Video]: (): keyof DefaultTheme['icons'] => 'Video'
} satisfies Record<NodeType, () => keyof DefaultTheme['icons']>;

export const ICON_COLOR_BY_NODE_TYPE = {
	[NodeType.Application]: (theme?: DefaultTheme): string => theme?.palette.gray0.regular ?? '#414141',
	[NodeType.Audio]: (theme?: DefaultTheme): string => theme?.palette.gray0.regular ?? '#414141',
	[NodeType.Folder]: (theme?: DefaultTheme): string => theme?.palette.secondary.regular ?? '#828282',
	[NodeType.Image]: (theme?: DefaultTheme): string => theme?.palette.error.regular ?? '#d74942',
	[NodeType.Message]: (theme?: DefaultTheme): string => theme?.palette.primary.regular ?? '#2b73d2',
	[NodeType.Other]: (theme?: DefaultTheme): string => theme?.palette.primary.regular ?? '#2b73d2',
	[NodeType.Presentation]: (theme?: DefaultTheme): string => theme?.avatarColors.avatar_47 ?? '#FFA726',
	[NodeType.Spreadsheet]: (theme?: DefaultTheme): string => theme?.palette.success.regular ?? '#8bc34a',
	[NodeType.Text]: (theme?: DefaultTheme, mimeType?: string): string =>
		mimeType === MIME_TYPE['application/pdf']
			? theme?.palette.error.regular ?? '#d74942'
			: theme?.palette.primary.regular ?? '#2b73d2',
	[NodeType.Video]: (theme?: DefaultTheme): string => theme?.palette.error.regular ?? '#d74942'
} satisfies Record<NodeType, (theme?: DefaultTheme) => string>;
