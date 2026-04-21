/*
 * SPDX-FileCopyrightText: 2023 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import '@testing-library/jest-dom/vitest';
import { matchers } from '@emotion/jest';
import { beforeAll, afterEach, afterAll, beforeEach, expect, vi } from 'vitest';

import { resetCache } from '../hooks/NodesCache';
import { server } from '../mocks/server';

declare global {
	// eslint-disable-next-line no-var,vars-on-top
	var jest: Record<string, unknown>;
}

expect.extend(matchers as unknown as Parameters<typeof expect.extend>[0]);
beforeEach(() => {
	vi.useFakeTimers();

	const IntersectionObserverMock = vi.fn(() => ({
		disconnect: vi.fn(),
		observe: vi.fn(),
		takeRecords: vi.fn(),
		unobserve: vi.fn()
	}));

	vi.stubGlobal('IntersectionObserver', IntersectionObserverMock);
	resetCache();
});

beforeAll(() => {
	server.listen();
	// https://github.com/testing-library/react-testing-library/issues/1197
	const _jest = globalThis.jest;

	globalThis.jest = {
		...globalThis.jest,
		advanceTimersByTime: vi.advanceTimersByTime.bind(vi)
	};

	return (): void => {
		globalThis.jest = _jest;
	};
});

afterEach(() => {
	vi.useRealTimers();
	server.resetHandlers();
});

afterAll(() => {
	server.close();
});

vi.mock(import('../i18n'));
