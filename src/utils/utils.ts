/*
 * SPDX-FileCopyrightText: 2023 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React from 'react';

import { API_DOWNLOAD_ENDPOINT } from './constants';
import i18n from '../i18n';

/**
 * Format a size in byte as human-readable
 */
export const humanFileSize = (inputSize: number): string => {
	const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
	if (inputSize === 0) {
		const unit = units[0];
		const unitTranslated = i18n.t('size.unitMeasure', { context: unit, defaultValue: unit });
		return `0 ${unitTranslated}`;
	}
	const i = Math.floor(Math.log(inputSize) / Math.log(1024));
	if (i >= units.length) {
		throw new Error('Unsupported inputSize');
	}
	const unit = units[i];
	const unitTranslated = i18n.t('size.unitMeasure', { context: unit, defaultValue: unit });
	const size = (inputSize / 1024 ** i).toFixed(2).toString();
	return `${size} ${unitTranslated}`;
};

export function preventTextSelectionOnDoubleClick(e: MouseEvent | React.MouseEvent): void {
	if (e.detail > 1) {
		e.preventDefault();
	}
}

export const downloadNode = (id: string, nodeLinkId: string): void => {
	if (id) {
		const url = `${API_DOWNLOAD_ENDPOINT}/${encodeURIComponent(id)}?node_link_id=${encodeURIComponent(nodeLinkId)}`;
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
