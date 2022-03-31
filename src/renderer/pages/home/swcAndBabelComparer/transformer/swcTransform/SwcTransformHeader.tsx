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
import { TabState } from 'renderer/pages/home/viewerContext/viewerContextReducer';
import { SwcLogo } from 'renderer/pages/shared/SwcLogo';
import { SwcConfigForm } from './swcTransformHeader/SwcConfigForm';

type SwcTransformProps = {
	tab: TabState;
	packageName: string;
};

export const SwcTransformHeader = ({ tab, packageName }: SwcTransformProps) => {
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
			<SwcLogo />

			<IconButton
				aria-label="config"
				icon={<SettingsIcon />}
				onClick={onOpen}
			/>

			<Modal isOpen={isOpen} onClose={onClose} size="6xl">
				<ModalOverlay />
				<ModalContent height="calc(100% - 7.5rem)">
					<ModalHeader>SWC configuration (.swcrc)</ModalHeader>
					<ModalCloseButton />
					<ModalBody flex="auto">
						<SwcConfigForm
							tab={tab}
							packageName={packageName}
							onSubmit={onClose}
						/>
					</ModalBody>
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
