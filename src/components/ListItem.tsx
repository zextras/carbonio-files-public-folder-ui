import React from "react";
import {NodeType} from "../types/graphql/types.ts";
import {Avatar, useTheme} from "@zextras/carbonio-design-system";
import {ICON_BY_NODE_TYPE, ICON_COLOR_BY_NODE_TYPE} from "../utils/constants.ts";

interface ListItemProps {
    name: string;
    type: NodeType;
}

export const ListItem: React.FC<ListItemProps> = ({name, type}) => {
    const theme = useTheme();
    return (
            <li>
                <Avatar label={''} icon={ICON_BY_NODE_TYPE[type]()} color={ICON_COLOR_BY_NODE_TYPE[type](theme)} />
                {name}
            </li>
    );
};
