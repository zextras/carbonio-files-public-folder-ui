/*
 * SPDX-FileCopyrightText: 2023 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React from 'react';

import { API_DOWNLOAD_ENDPOINT } from './constants';

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

export function preventTextSelectionOnDoubleClick(e: MouseEvent | React.MouseEvent): void {
	if (e.detail > 1) {
		e.preventDefault();
	}
}

export const downloadNode = (id: string): void => {
	if (id) {
		const url = `${API_DOWNLOAD_ENDPOINT}/${encodeURIComponent(id)}`;
		const a = document.createElement('a');
		if (a) {
			a.download = url;
			a.href = url;
			a.target = '_blank';
			a.type = 'hidden';
			a.click();
		}
	}
};
