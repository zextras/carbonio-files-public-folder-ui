/*
 * SPDX-FileCopyrightText: 2023 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import { MakeRequiredNonNull } from './typeUtils';
import { File, Folder } from '../graphql/types';

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

export function isFile(
	node: ({ __typename?: string } & Record<string, unknown>) | null | undefined
): node is File & MakeRequiredNonNull<File, '__typename'> {
	return node?.__typename === 'File';
}

export function isFolder(
	node: ({ __typename?: string } & Record<string, unknown>) | null | undefined
): node is Folder & MakeRequiredNonNull<Folder, '__typename'> {
	return node?.__typename === 'Folder';
}
