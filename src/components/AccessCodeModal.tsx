/*
 * SPDX-FileCopyrightText: 2024 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import React, { useCallback, useState } from 'react';

import type { InputProps } from '@zextras/carbonio-design-system';
import { Button, Container, Input, Modal, Text } from '@zextras/carbonio-design-system';
import { useTranslation } from 'react-i18next';

interface AccessCodeModalProps {
	queryWithAccessCode: (accessCode: string) => void;
	wrongAccessCode: boolean;
}

export const AccessCodeModal = ({
	wrongAccessCode,
	queryWithAccessCode
}: AccessCodeModalProps): React.JSX.Element => {
	const [t] = useTranslation();

	const [accessCode, setAccessCode] = useState('');
	const [isAccessCodeShown, setIsAccessCodeShown] = useState(false);

	const toggleShowAccessCode = useCallback(() => {
		setIsAccessCodeShown((prevState) => !prevState);
	}, []);

	const CustomElement = useCallback<NonNullable<InputProps['CustomIcon']>>(
		({ hasError }) => (
			<Button
				type={'ghost'}
				color={hasError ? 'error' : 'text'}
				size={'large'}
				icon={isAccessCodeShown ? 'EyeOutline' : 'EyeOffOutline'}
				onClick={toggleShowAccessCode}
			/>
		),
		[isAccessCodeShown, toggleShowAccessCode]
	);

	const inputOnChange = useCallback<NonNullable<InputProps['onChange']>>((e) => {
		setAccessCode(e.target.value);
	}, []);

	const onConfirm = useCallback(() => {
		queryWithAccessCode(accessCode);
	}, [accessCode, queryWithAccessCode]);

	const confirmDisabled = accessCode.trim().length === 0;

	return (
		<Modal
			showCloseIcon={false}
			title={t(
				'carbonio-public-folder-ui.accessCode.modal.title',
				'The link is secured by an access code'
			)}
			open
			confirmLabel={t('carbonio-public-folder-ui.accessCode.modal.button.confirm', 'Done')}
			onConfirm={onConfirm}
			confirmDisabled={confirmDisabled}
		>
			<Container gap={'1rem'} crossAlignment={'flex-start'}>
				<Text>
					{t(
						'carbonio-public-folder-ui.accessCode.modal.description',
						'Please, insert the access code to proceed'
					)}
				</Text>
				<Input
					onEnter={confirmDisabled ? undefined : onConfirm}
					type={isAccessCodeShown ? 'text' : 'password'}
					label={t('publicLink.accessCode.input.label', 'Access code')}
					value={accessCode}
					onChange={inputOnChange}
					CustomIcon={CustomElement}
					hasError={wrongAccessCode}
					description={
						wrongAccessCode
							? t(
									'carbonio-public-folder-ui.accessCode.modal.wrongAccessCode',
									'Wrong access code, try again'
								)
							: undefined
					}
				/>
			</Container>
		</Modal>
	);
};
