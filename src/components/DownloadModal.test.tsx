/*
 * SPDX-FileCopyrightText: 2025 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { act } from '@testing-library/react';
import { expect, it, describe, vi } from 'vitest';

import { DownloadModal } from './DownloadModal';
import { TIMERS } from '../test/constants';
import { setup, screen } from '../test/utils';
import * as utils from '../utils/utils';

describe('DownloadModal', () => {
	const mockProps = {
		nodeId: 'test-node-id',
		nodeLinkId: 'test-node-link-id',
		accessCode: 'test-access-code'
	};

	it('renders the modal with correct title and description', async () => {
		setup(<DownloadModal {...mockProps} />);
		await act(async () => {
			await vi.advanceTimersByTimeAsync(TIMERS.modalDelay);
		});
		expect(screen.getByText('The link is secured by an access code')).toBeVisible();
		expect(
			screen.getByText('Access code entered correctly. Now you can download the file.')
		).toBeVisible();
	});

	it('calls downloadNode and sets downloaded to true on confirm', async () => {
		const downloadNodeSpy = vi.spyOn(utils, 'downloadNode');

		const { user } = setup(<DownloadModal {...mockProps} />);
		await act(async () => {
			await vi.advanceTimersByTimeAsync(TIMERS.modalDelay);
		});
		const downloadButton = screen.getByRole('button', { name: 'Download' });
		await user.click(downloadButton);

		expect(downloadNodeSpy).toHaveBeenCalledWith(
			'test-node-id',
			'test-node-link-id',
			'test-access-code'
		);
		expect(screen.getByRole('button', { name: 'Download again' })).toBeVisible();
	});
});
