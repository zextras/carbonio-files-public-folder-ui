/*
 * SPDX-FileCopyrightText: 2023 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import type React from 'react';

import {
	API_DOWNLOAD_ENDPOINT,
	API_DOWNLOAD_MULTIPLE_ENDPOINT,
	DOWNLOAD_PATH_CHECK
} from './constants';
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

export const downloadNode = async (
	id: string,
	nodeLinkId: string,
	accessCode?: string
): Promise<Response> => {
	const accessCodeParam = accessCode ? `&access_code=${encodeURIComponent(accessCode)}` : '';
	const urlCheck = `${API_DOWNLOAD_ENDPOINT}/${encodeURIComponent(id)}${DOWNLOAD_PATH_CHECK}?node_link_id=${encodeURIComponent(nodeLinkId)}${accessCodeParam}`;
	const response = await fetch(urlCheck);
	if (response.ok) {
		const url = `${API_DOWNLOAD_ENDPOINT}/${encodeURIComponent(id)}?node_link_id=${encodeURIComponent(nodeLinkId)}${accessCodeParam}`;
		const a = document.createElement('a');
		if (a) {
			a.download = url;
			a.href = url;
			a.target = '_blank';
			a.type = 'hidden';
			a.click();
		}
	}
	return response;
};

function createHiddenInput(name: string, value: string): HTMLInputElement {
	const input = document.createElement('input');
	input.type = 'hidden';
	input.name = name;
	input.value = value;
	return input;
}

function createDownloadForm(
	downloadId: string,
	nodeIds: string[],
	nodeLinkId: string,
	accessCode?: string
): HTMLFormElement {
	const form = document.createElement('form');

	form.method = 'POST';
	form.action = API_DOWNLOAD_MULTIPLE_ENDPOINT;
	form.target = `secureDownload_${downloadId}`;
	form.style.display = 'none';

	const nodeIdsInput = createHiddenInput('nodeIds', JSON.stringify(nodeIds));
	form.appendChild(nodeIdsInput);
	const nodeLinkIdInput = createHiddenInput('nodeLinkId', nodeLinkId);
	form.appendChild(nodeLinkIdInput);
	if (accessCode) {
		const accessCodeInput = createHiddenInput('accessCode', accessCode);
		form.appendChild(accessCodeInput);
	}
	return form;
}

function createSecureIframe(downloadId: string): HTMLIFrameElement {
	const iframe = document.createElement('iframe');

	iframe.style.display = 'none';
	iframe.name = `secureDownload_${downloadId}`;

	iframe.setAttribute('sandbox', 'allow-downloads allow-forms');

	return iframe;
}

function secureIframeDownload(nodeIds: string[], nodeLinkId: string, accessCode?: string): void {
	if (!nodeIds?.length) {
		throw new Error('nodeIds is required and cannot be empty');
	}

	const downloadId = `dl_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;

	const iframe = createSecureIframe(downloadId);

	const form = createDownloadForm(downloadId, nodeIds, nodeLinkId, accessCode);

	const cleanup = (): void => {
		try {
			iframe.remove();
		} catch (e) {
			// eslint-disable-next-line no-console
			console.warn('Error removing iframe:', e);
		}
	};

	iframe.addEventListener('load', () => {
		setTimeout(cleanup, 1000); // Small delay to ensure download started
	});

	iframe.addEventListener('error', cleanup);

	document.body.appendChild(iframe);
	document.body.appendChild(form);

	form.submit();
	form.remove();
}

export const downloadMultipleNodes = async (
	nodeIds: string[],
	nodeLinkId: string,
	accessCode?: string
): Promise<Response> => {
	const urlCheck = `${API_DOWNLOAD_MULTIPLE_ENDPOINT}${DOWNLOAD_PATH_CHECK}`;
	const response = await fetch(urlCheck, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ nodeIds, nodeLinkId, accessCode })
	});

	if (response.ok) {
		secureIframeDownload(nodeIds, nodeLinkId, accessCode);
	}
	return response;
};
