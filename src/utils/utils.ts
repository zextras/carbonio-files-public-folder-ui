import {faker} from "@faker-js/faker";
import {NodeType} from "../types/graphql/types.ts";
import {BreadcrumbsProps, Crumb} from "@zextras/carbonio-design-system";
import {ListItem} from "../components/ListItem.tsx";

/**
 * Format a size in byte as human-readable
 */
export const humanFileSize = (inputSize: number): string => {
    if (inputSize === 0) {
        return '0 B';
    }
    const i = Math.floor(Math.log(inputSize) / Math.log(1024));
    const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    if (i >= units.length) {
        throw new Error('Unsupported inputSize');
    }
    return `${(inputSize / 1024 ** i).toFixed(2).toString()} ${units[i]}`;
};

type ListItemProps = React.ComponentPropsWithoutRef<typeof ListItem>
export function listItemPropsBuilder(props?: Partial<ListItemProps>): ListItemProps {
    return {
        name: faker.system.fileName({ extensionCount: 0 }),
        type: faker.helpers.arrayElement(Object.values(NodeType)),
        mimeType: faker.system.mimeType(),
        lastModified: faker.date.recent().valueOf(),
        size: faker.number.int(),
        extension: faker.system.fileExt(),
        ...props
    }
}

export function crumbsBuilder(count: number = 3): BreadcrumbsProps['crumbs'] {

    return [...Array(count)].map((_, index) => {
        const label2 = faker.system.fileName({extensionCount: 0});
        const crumb2: Crumb = {
            label: label2,
            id: `${index}`
        }

        return crumb2
    });

}