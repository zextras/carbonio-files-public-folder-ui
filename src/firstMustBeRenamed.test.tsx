import {expect, it} from 'vitest'
import {render, screen, within} from "@testing-library/react";
import {ListItem} from "./components/ListItem.tsx";
import {NodeType} from "./types/graphql/types.ts";
import {ThemeProvider} from "@zextras/carbonio-design-system";
import React from "react";
import {faker} from "@faker-js/faker";
import {ICONS} from "./test/constants.ts";
import {ICON_BY_NODE_TYPE} from "./utils/constants.ts";

type ListItemProps = React.ComponentPropsWithoutRef<typeof ListItem>
function listItemPropsBuilder(props?: Partial<ListItemProps>): ListItemProps {
    return {
        name: faker.system.fileName({ extensionCount: 0 }),
        type: faker.helpers.arrayElement(Object.values(NodeType)),
        ...props
    }
}

it('should show the content of the folder', () => {
    render(<PublicFolderView />);
    expect(screen.getByText('Folder name')).toBeVisible();
    expect(screen.getByText('Name')).toBeVisible();
    expect(screen.getByText('Last modified')).toBeVisible();
    expect(screen.getByText('Type')).toBeVisible();
    expect(screen.getByText('Size')).toBeVisible();
    expect(screen.getByRole('list')).toBeVisible();
    expect(screen.getByRole('listitem', { name: 'Name of the subfolder' })).toBeVisible();
    expect(screen.getByRole('listitem', { name: 'Name of file 1' })).toBeVisible();
    expect(screen.getByRole('listitem', { name: 'Name of file 2' })).toBeVisible();
});

it('should render an accessible list item', () => {
    const props = listItemPropsBuilder();
    render(<ThemeProvider><ListItem {...props} /></ThemeProvider>);
    expect(screen.getByRole('listitem')).toBeVisible();
});

it('should show the name of list item', () => {
    const props = listItemPropsBuilder();
    render(<ListItem {...props} />);
    expect(within(screen.getByRole('listitem')).getByText(props.name)).toBeVisible();
});

it('should show the type icon', () => {
    const props = listItemPropsBuilder({ type: NodeType.Text });
    render(<ThemeProvider><ListItem {...props} /></ThemeProvider>);
    expect(within(screen.getByRole('listitem')).getByTestId(`icon: ${ICON_BY_NODE_TYPE[props.type]()}`)).toBeVisible();
});



