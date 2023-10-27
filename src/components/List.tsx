import React from "react";
import {ListV2} from "@zextras/carbonio-design-system";

interface ListProps {
    listItems: Array<React.JSX.Element>
}
export const List: React.FC<ListProps> = ({listItems}) => {

    return (
        <ListV2>
            {listItems}
        </ListV2>
    );
};
