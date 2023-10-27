import React from "react";
import {NodeType} from "../types/graphql/types.ts";
import {Avatar, Row, Text, useTheme} from "@zextras/carbonio-design-system";
import {ICON_BY_NODE_TYPE, ICON_COLOR_BY_NODE_TYPE} from "../utils/constants.ts";
import {humanFileSize} from "../utils/utils.ts";

interface ListItemProps {
    name: string;
    type: NodeType;
    mimeType?: string;
    lastModified: number;
    size?: number;
    extension?: string;

}

export const ListItem: React.FC<ListItemProps> = ({name, type, mimeType, lastModified, size, extension}) => {
    const theme = useTheme();
    return (
            <li>
                <Row>
                    <Avatar label={''} icon={ICON_BY_NODE_TYPE[type](mimeType)} color={ICON_COLOR_BY_NODE_TYPE[type](theme, mimeType)} />
                    <Text>{name}</Text>
                    <Text>{Intl.DateTimeFormat(undefined, {day: "2-digit", minute: "2-digit", hour: "2-digit", month: "2-digit", year: "numeric"}).format(new Date(lastModified))}</Text>
                    <Text>{size !== undefined ? humanFileSize(size) : '-'}</Text>
                    {extension && <Text>{extension}</Text>}
                </Row>
            </li>
    );
};
