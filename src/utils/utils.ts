import {DefaultTheme} from 'styled-components';
import {NodeType} from "../types/graphql/types.ts";

/**
 * Given a file type returns the DS icon name
 */
export function getIconByFileType(
    type: NodeType,
    subType?: string | null,
    options?: { outline?: boolean }
): keyof DefaultTheme['icons'] {
    function getIcon(): keyof DefaultTheme['icons'] {
        switch (type) {
            case NodeType.Folder:
                return 'Folder';
            case NodeType.Text:
                return subType === 'application/pdf' ? 'FilePdf' : 'FileText';
            case NodeType.Video:
                return 'Video';
            case NodeType.Audio:
                return 'Music';
            case NodeType.Image:
                return 'Image';
            case NodeType.Message:
                return 'Email';
            case NodeType.Presentation:
                return 'FilePresentation';
            case NodeType.Spreadsheet:
                return 'FileCalc';
            case NodeType.Application:
                return 'Code';
            default:
                return 'File';
        }
    }
    const icon = getIcon();
    return options?.outline ? `${icon}Outline` : icon;
};

export function getIconColorByFileType(
    type: NodeType,
    subType: string | undefined,
    theme: DefaultTheme
): string {
    switch (type) {
        case NodeType.Folder:
            return theme.palette.secondary.regular;
        case NodeType.Text:
            return subType === 'application/pdf'
                ? theme.palette.error.regular
                : theme.palette.primary.regular;
        case NodeType.Video:
            return theme.palette.error.regular;
        case NodeType.Audio:
            return theme.palette.gray0.regular;
        case NodeType.Image:
            return theme.palette.error.regular;
        case NodeType.Message:
            return theme.palette.primary.regular;
        case NodeType.Presentation:
            return theme.avatarColors.avatar_47;
        case NodeType.Spreadsheet:
            return theme.palette.success.regular;
        case NodeType.Application:
            return theme.palette.gray0.regular;
        default:
            return theme.palette.primary.regular;
    }
};