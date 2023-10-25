import React from "react";

interface ListItemProps {
    name: string;
}

export const ListItem: React.FC<ListItemProps> = ({name}) => {
    return (
        <ul>
            <li>
                {name}
            </li>
        </ul>
    );
};