/*
 * SPDX-FileCopyrightText: 2023 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
library(
	identifier: 'zapp-jenkins-lib@support-other-bundlers',
	retriever: modernSCM([
		$class: 'GitSCMSource',
   		remote: 'git@github.com:zextras/jenkins-zapp-lib.git',
		credentialsId: 'jenkins-integration-with-github-account'
	])
)

zappPipeline(
	disableAutoTranslationsSync: true
)
