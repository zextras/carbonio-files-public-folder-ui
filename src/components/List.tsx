import React from "react";
import {ListV2} from "@zextras/carbonio-design-system";
import {ListItem} from './ListItem.tsx'

interface ListProps {
    listItems: Array<ListItem>
}
export const List: React.FC<ListProps> = ({listItems}) => {

    return (
        <ListV2>
            {listItems}
        </ListV2>
    );
};
