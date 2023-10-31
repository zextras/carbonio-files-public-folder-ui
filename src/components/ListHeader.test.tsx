import {expect, it} from "vitest";
import {render, screen} from "@testing-library/react";
import {ListHeader} from './ListHeader.tsx'
import {ThemeProvider} from "@zextras/carbonio-design-system";

it('should show name, last modified, extension and size as list header fields', () => {
    render(<ThemeProvider><ListHeader /></ThemeProvider>)
    expect(screen.getByText('Name')).toBeVisible()
    expect(screen.getByText('Last modified')).toBeVisible()
    expect(screen.getByText('Extension')).toBeVisible()
    expect(screen.getByText('Size')).toBeVisible()
});