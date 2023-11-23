/*
 * SPDX-FileCopyrightText: 2022 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import React from 'react';

import { Icon, IconButton, IconButtonProps, IconProps } from '@zextras/carbonio-design-system';
import styled, { css, keyframes, SimpleInterpolation } from 'styled-components';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const StyledIconButton = styled(IconButton)`
	animation: ${rotate} 1s linear infinite;
`;

const StyledIcon = styled(Icon)<{ $size?: string }>`
	animation: ${rotate} 1s linear infinite;
	${({ $size }): SimpleInterpolation =>
		$size &&
		css`
			height: ${$size};
			width: ${$size};
		`}
`;

type LoadingIconButtonProps = Omit<IconButtonProps, 'onClick'>;

type LoadingIconIconProps = Omit<IconProps, 'size'> & { size?: string };

type LoadingIconProps =
	| ({ onClick: IconButtonProps['onClick'] } & LoadingIconButtonProps)
	| ({ onClick?: undefined } & LoadingIconIconProps);

export const LoadingIcon = React.forwardRef<HTMLDivElement, LoadingIconProps>(
	function LoadingIconFn(props, ref) {
		return props.onClick !== undefined ? (
			<StyledIconButton type={'ghost'} shape={'round'} {...props} ref={ref} />
		) : (
			<StyledIcon {...props} size={undefined} $size={props.size} />
		);
	}
);
