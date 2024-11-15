/*
 * SPDX-FileCopyrightText: 2024 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { act } from '@testing-library/react';
import { expect, it, vi, describe } from 'vitest';

import { AccessCodeModal } from './AccessCodeModal';
import { ICONS, TIMERS } from '../test/constants';
import { setup, screen } from '../test/utils';

describe('AccessCodeModal', () => {
	it('should display modal title, a description and a confirmation button', async () => {
		setup(<AccessCodeModal wrongAccessCode={false} queryWithAccessCode={vi.fn()} />);

		await act(async () => {
			await vi.advanceTimersByTimeAsync(TIMERS.modalDelay);
		});

		expect(screen.getByText('The link is secured by an access code')).toBeVisible();
		expect(screen.getByText('Please, insert the access code to view the folder')).toBeVisible();
		expect(screen.getByRole('button', { name: 'Done' })).toBeVisible();
	});

	it('should display access code input with an icon', async () => {
		setup(<AccessCodeModal wrongAccessCode={false} queryWithAccessCode={vi.fn()} />);

		await act(async () => {
			await vi.advanceTimersByTimeAsync(TIMERS.modalDelay);
		});

		expect(screen.getByLabelText(/access code/i)).toBeVisible();
		expect(screen.getByRoleWithIcon('button', { icon: ICONS.eyeOff })).toBeVisible();
	});

	it('should change the input type from password to text when the user clicks on the eye icon of the input', async () => {
		const { user } = setup(
			<AccessCodeModal wrongAccessCode={false} queryWithAccessCode={vi.fn()} />
		);

		await act(async () => {
			await vi.advanceTimersByTimeAsync(TIMERS.modalDelay);
		});

		const eyeOffIcon = screen.getByRoleWithIcon('button', { icon: ICONS.eyeOff });
		const accessCodeInput = screen.getByLabelText<HTMLInputElement>(/access code/i);

		expect(accessCodeInput.type).toBe('password');
		await user.click(eyeOffIcon);
		expect(accessCodeInput.type).toBe('text');
		const eye = screen.getByRoleWithIcon('button', { icon: ICONS.eye });
		expect(eye).toBeVisible();

		await user.click(eye);
		expect(accessCodeInput.type).toBe('password');
		expect(screen.getByRoleWithIcon('button', { icon: ICONS.eyeOff })).toBeVisible();
	});

	it('should call queryWithAccessCode with the access code when the user clicks on the confirm button', async () => {
		const queryWithAccessCode = vi.fn();
		const { user } = setup(
			<AccessCodeModal wrongAccessCode={false} queryWithAccessCode={queryWithAccessCode} />
		);

		await act(async () => {
			await vi.advanceTimersByTimeAsync(TIMERS.modalDelay);
		});

		const accessCodeInput = screen.getByLabelText<HTMLInputElement>(/access code/i);
		await user.type(accessCodeInput, 'access-code');
		await user.click(screen.getByRole('button', { name: 'Done' }));
		expect(queryWithAccessCode).toHaveBeenCalledWith('access-code');
	});

	it('should display an error message when wrongAccessCode is true', async () => {
		setup(<AccessCodeModal wrongAccessCode queryWithAccessCode={vi.fn()} />);

		await act(async () => {
			await vi.advanceTimersByTimeAsync(TIMERS.modalDelay);
		});

		expect(screen.getByText('Wrong access code, try again')).toBeVisible();
	});

	it('should disable done button when access code is empty and enabled when is not empty', async () => {
		const { user } = setup(
			<AccessCodeModal wrongAccessCode={false} queryWithAccessCode={vi.fn()} />
		);

		await act(async () => {
			await vi.advanceTimersByTimeAsync(TIMERS.modalDelay);
		});

		expect(screen.getByRole('button', { name: 'Done' })).toBeDisabled();
		const accessCodeInput = screen.getByLabelText<HTMLInputElement>(/access code/i);
		await user.type(accessCodeInput, 'access-code');
		expect(screen.getByRole('button', { name: 'Done' })).toBeEnabled();
	});
});
