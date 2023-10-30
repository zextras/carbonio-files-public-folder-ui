import React from "react";
import {NodeType} from "../types/graphql/types.ts";
import {Avatar, Padding, Text, useTheme} from "@zextras/carbonio-design-system";
import {ICON_BY_NODE_TYPE, ICON_COLOR_BY_NODE_TYPE} from "../utils/constants.ts";
import {humanFileSize} from "../utils/utils.ts";
import styled from "styled-components";

interface ListItemProps {
    name: string;
    type: NodeType;
    mimeType?: string;
    lastModified: number;
    size?: number;
    extension?: string;

}

const CustomAvatar = styled(Avatar)`
  & svg {
    min-width: 1.5rem;
    min-height: 1.5rem;
    max-width: 1.5rem;
    max-height: 1.5rem;
  }
`;


export const ListItem: React.FC<ListItemProps> = ({name, type, mimeType, lastModified, size, extension}) => {
    const theme = useTheme();
    return (
        <>
            <Padding left={'1.5rem'}>
                <CustomAvatar label={''} icon={ICON_BY_NODE_TYPE[type](mimeType)} color={ICON_COLOR_BY_NODE_TYPE[type](theme, mimeType)} background={'gray3'} shape={'square'} size={'large'}/>
            </Padding>
            <Text>{name}</Text>
            <Text>{Intl.DateTimeFormat(undefined, {day: "2-digit", minute: "2-digit", hour: "2-digit", month: "2-digit", year: "numeric"}).format(new Date(lastModified))}</Text>
            <Text>{extension ?? ''}</Text>
            <Padding right={'1.5rem'}>
                <Text>{size !== undefined ? humanFileSize(size) : '-'}</Text>
            </Padding>
        </>
    );
};
