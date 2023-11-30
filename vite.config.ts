/*
 * SPDX-FileCopyrightText: 2023 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

/// <reference types="vitest" />
import react from '@vitejs/plugin-react-swc';
import { defineConfig, loadEnv, splitVendorChunkPlugin, UserConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';

import pkg from './package.json';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), '');
	const basePath = mode === 'production' || env.HOST ? '/files/public/link/access' : '';
	const pkgRel = mode === 'development' ? Date.now() : 1;
	const proxy: UserConfig['preview']['proxy'] = {};
	if (mode !== 'production' && env.HOST) {
		proxy['/static/iris'] = {
			target: env.HOST,
			secure: false,
			changeOrigin: true
		};
		proxy['/services/files'] = {
			target: env.HOST,
			secure: false,
			changeOrigin: true
		};
	}
	return {
		plugins: [
			react(),
			splitVendorChunkPlugin(),
			viteStaticCopy({
				targets: [
					{
						src: 'package/PKGBUILD.template',
						dest: 'package/package',
						transform(content): string {
							return content
								.replace('{{name}}', pkg.name)
								.replace('{{version}}', pkg.version)
								.replace('{{rel}}', `${pkgRel}`)
								.replace('{{description}}', pkg.description);
						},
						rename(filename, fileExt): string {
							if (fileExt === 'template') {
								return filename;
							}
							return `${filename}.${fileExt}`;
						}
					},
					{
						src: 'package/*',
						dest: 'package',
						transform(content): string {
							return content
								.replace('{{name}}', pkg.name)
								.replace('{{version}}', pkg.version)
								.replace('{{rel}}', `${pkgRel}`)
								.replace('{{description}}', pkg.description);
						},
						rename(filename, fileExt): string {
							if (fileExt === 'template') {
								return filename;
							}
							return `${filename}.${fileExt}`;
						}
					},
					{
						src: 'package/yap.json.template',
						dest: '.',
						transform(content): string {
							return content
								.replace('{{name}}', pkg.name)
								.replace('{{version}}', pkg.version)
								.replace('{{rel}}', `${pkgRel}`)
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
		base: basePath,
		build: {
			copyPublicDir: mode !== 'production' && (env.HOST ?? '').length === 0
		},
		preview: {
			proxy
		},
		test: {
			globals: true,
			environment: 'jsdom',
			restoreMocks: true,
			setupFiles: ['./src/test/setup.ts'],
			retry: 1,
			server: {
				deps: {
					fallbackCJS: true
				}
			},
			coverage: {
				enabled: true,
				provider: 'v8',
				all: true,
				clean: true,
				include: [
					'src/**',
					'!src/mocks/*', // exclude msw handlers
					'!src/@types/*', // exclude types
					'!src/test/*', // exclude test folder
					'!src/graphql/**', // exclude graphql folder
					'!src/**/type*' // exclude type utils
				],
				reporter: ['text', 'cobertura', 'lcov'],
				branches: 75,
				functions: 75,
				lines: 75,
				statements: 75
			}
		}
	} satisfies UserConfig;
});
