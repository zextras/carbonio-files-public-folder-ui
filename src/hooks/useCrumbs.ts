/*
 * SPDX-FileCopyrightText: 2023 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import { useEffect, useState } from 'react';

import { Crumb } from '@zextras/carbonio-design-system';

import { Location } from '../model/Node';

type UseCrumbsReturnType = {
	crumbs: Array<Crumb>;
};

export const useCrumbs = (
	currentLocation: Location | undefined,
	onCrumbClick: (location: Location) => void
): UseCrumbsReturnType => {
	const [crumbs, setCrumbs] = useState<Array<Crumb>>([]);

	useEffect(() => {
		if (currentLocation) {
			setCrumbs((prevState) => {
				const idx = prevState.findIndex((crumb) => crumb.id === currentLocation.id);
				if (idx > -1) {
					return prevState.slice(0, idx + 1);
				}
				return [
					...prevState,
					{
						id: currentLocation?.id,
						label: currentLocation?.name,
						onClick: (): void => {
							onCrumbClick(currentLocation);
						}
					}
				];
			});
		}
	}, [currentLocation, onCrumbClick]);

	return { crumbs };
};
