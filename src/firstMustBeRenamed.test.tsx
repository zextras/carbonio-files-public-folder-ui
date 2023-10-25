import { expect, it } from 'vitest'
import {render, screen, within} from "@testing-library/react";
import {ListItem} from "./components/ListItem.tsx";

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
    render(<ListItem name={''} />);
    expect(screen.getByRole('listitem')).toBeVisible();
});

it('should show the name of list item', () => {
    const name = 'Name of file 1';
    render(<ListItem name={name} />);
    expect(within(screen.getByRole('listitem')).getByText(name)).toBeVisible();
});



it('should show the type icon', () => {
    render(<ListItem name={name}/>);
    expect(screen.getByRole('listitem', { name: 'Name of file 1' })).toBeVisible();
}); 