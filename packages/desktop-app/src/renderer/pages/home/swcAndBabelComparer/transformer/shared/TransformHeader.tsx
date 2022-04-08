import { SettingsIcon } from '@chakra-ui/icons';
import {
	Box,
	Button,
	IconButton,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	useDisclosure,
} from '@chakra-ui/react';
import { ReactNode } from 'react';

type ChildrenProps = {
	onClose: () => void;
};

type TransformProps = {
	modalTitle: string;
	logo: ReactNode;
	children: (props: ChildrenProps) => ReactNode;
};

export const TransformHeader = (props: TransformProps) => {
	const { logo, modalTitle, children } = props;
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<Box
			display="flex"
			flexDirection="row"
			alignItems="center"
			justifyContent="space-between"
			width="full"
			height="40px"
			marginBottom="16px"
		>
			{logo}

			<IconButton
				aria-label="config"
				icon={<SettingsIcon />}
				onClick={onOpen}
			/>

			<Modal isOpen={isOpen} onClose={onClose} size="6xl">
				<ModalOverlay />
				<ModalContent height="calc(100% - 7.5rem)">
					<ModalHeader>{modalTitle}</ModalHeader>
					<ModalCloseButton />
					<ModalBody flex="auto">{children({ onClose })}</ModalBody>
					<ModalFooter>
						<Button onClick={onClose} mr={3}>
							Cancel
						</Button>
						<Button type="submit" form="config-form" colorScheme="orange">
							Apply
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</Box>
	);
};
