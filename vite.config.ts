/*
 * SPDX-FileCopyrightText: 2023 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

/// <reference types="vitest" />
import react from '@vitejs/plugin-react-swc';
import { defineConfig, splitVendorChunkPlugin } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';

import pkg from './package.json';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		splitVendorChunkPlugin(),
		viteStaticCopy({
			targets: [
				{
					src: 'package/*',
					dest: '.',
					transform(content): string {
						return content
							.replace('{{name}}', pkg.name)
							.replace('{{version}}', pkg.version)
							.replace('{{rel}}', '1')
							.replace('{{description}}', pkg.description);
					},
					rename(filename, fileExt): string {
						if (fileExt === 'template') {
							return filename;
						}
						return `${filename}.${fileExt}`;
					}
				}
			]
		})
	],
	base: '/files/public/link/access',
	test: {
		globals: true,
		environment: 'jsdom',
		setupFiles: ['./src/test/setup.ts'],
		server: {
			deps: {
				fallbackCJS: true
			}
		}
	}
});
