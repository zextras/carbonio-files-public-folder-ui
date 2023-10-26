import React from "react";
import {NodeType} from "../types/graphql/types.ts";
import {Avatar, useTheme} from "@zextras/carbonio-design-system";
import {ICON_BY_NODE_TYPE, ICON_COLOR_BY_NODE_TYPE} from "../utils/constants.ts";

interface ListItemProps {
    name: string;
    type: NodeType;
    mimeType?: string;
}

export const ListItem: React.FC<ListItemProps> = ({name, type, mimeType}) => {
    const theme = useTheme();
    return (
            <li>
                <Avatar label={''} icon={ICON_BY_NODE_TYPE[type](mimeType)} color={ICON_COLOR_BY_NODE_TYPE[type](theme, mimeType)} />
                {name}
            </li>
    );
};
