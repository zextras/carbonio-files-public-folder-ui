import {NodeType} from "../types/graphql/types.ts";
import {DefaultTheme} from "styled-components";

export const ICON_BY_NODE_TYPE = {
    [NodeType.Application]: () =>  'Code',
    [NodeType.Audio]:() => 'Music',
    [NodeType.Folder]:() => 'Folder',
    [NodeType.Image]:() => 'Image',
    [NodeType.Message]:() => 'Email',
    [NodeType.Other]:() => 'File',
    [NodeType.Presentation]:() => 'FilePresentation',
    [NodeType.Spreadsheet]:() => 'FileCalc',
    [NodeType.Text]:(mimeType?: string) => mimeType === 'application/pdf' ? 'FilePdf' : 'FileText',
    [NodeType.Video]:() => 'Video',

} satisfies Record<NodeType, () => keyof DefaultTheme['icons']>;

export const ICON_COLOR_BY_NODE_TYPE = {
    [NodeType.Application]: (theme: DefaultTheme) => theme.palette.gray0.regular,
    [NodeType.Audio]: (theme: DefaultTheme) => theme.palette.gray0.regular,
    [NodeType.Folder]: (theme: DefaultTheme) => theme.palette.secondary.regular,
    [NodeType.Image]: (theme: DefaultTheme) => theme.palette.error.regular,
    [NodeType.Message]: (theme: DefaultTheme) => theme.palette.primary.regular,
    [NodeType.Other]: (theme: DefaultTheme) => theme.palette.primary.regular,
    [NodeType.Presentation]: (theme: DefaultTheme) => theme.avatarColors.avatar_47,
    [NodeType.Spreadsheet]: (theme: DefaultTheme) => theme.palette.success.regular,
    [NodeType.Text]: (theme: DefaultTheme, mimeType?: string) => mimeType === 'application/pdf' ? theme.palette.error.regular : theme.palette.primary.regular,
    [NodeType.Video]: (theme: DefaultTheme) => theme.palette.error.regular,

} satisfies Record<NodeType, (theme: DefaultTheme) => string>;
