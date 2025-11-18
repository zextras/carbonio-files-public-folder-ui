/*
 * SPDX-FileCopyrightText: 2022 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import React from 'react';

import { css, keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import type { IconButtonProps, IconProps } from '@zextras/carbonio-design-system';
import { Icon, Button } from '@zextras/carbonio-design-system';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const StyledIconButton = styled(Button)`
	animation: ${rotate} 1s linear infinite;
`;

const StyledIcon = styled(Icon)<{ $size?: string }>`
	animation: ${rotate} 1s linear infinite;
	${({ $size }): undefined | string | ReturnType<typeof css> =>
		$size &&
		css`
			height: ${$size};
			width: ${$size};
		`}
`;

type LoadingIconButtonProps = Omit<
	IconButtonProps,
	'onClick' | 'type' | 'color' | 'backgroundColor' | 'labelColor'
>;

type LoadingIconIconProps = Omit<IconProps, 'size'> & { size?: string };

type LoadingIconProps =
	| ({ onClick: IconButtonProps['onClick'] } & LoadingIconButtonProps)
	| ({ onClick?: never } & LoadingIconIconProps);

export const LoadingIcon = React.forwardRef<HTMLDivElement, LoadingIconProps>(
	function LoadingIconFn(props, ref) {
		return props.onClick !== undefined ? (
			<StyledIconButton type={'ghost'} color={'text'} shape={'round'} {...props} ref={ref} />
		) : (
			<StyledIcon {...props} size={undefined} $size={props.size} />
		);
	}
);
