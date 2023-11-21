/*
 * SPDX-FileCopyrightText: 2023 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import React from 'react';

import ReactDOM from 'react-dom/client';

import App from './App';
import './index.css';
import { WorkerStartReturnType } from './mocks/browser';

async function deferRender(): WorkerStartReturnType {
	if (process.env.NODE_ENV !== 'development') {
		return Promise.resolve(undefined);
	}

	const { worker } = await import('./mocks/browser');

	// `worker.start()` returns a Promise that resolves
	// once the Service Worker is up and ready to intercept requests.
	return worker.start();
}

deferRender().then(() => {
	ReactDOM.createRoot(document.getElementById('root')!).render(
		<React.StrictMode>
			<App />
		</React.StrictMode>
	);
});
