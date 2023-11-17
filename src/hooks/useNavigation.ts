/*
 * SPDX-FileCopyrightText: 2023 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import { useState } from 'react';

type UseNavigationRetunType = {
	currentId: string | undefined;
	navigateTo: (id: string) => void;
};

export const useNavigation = (): UseNavigationRetunType => {
	const [currentId, setCurrentId] = useState<string | undefined>();

	return { currentId, navigateTo: setCurrentId };
};
