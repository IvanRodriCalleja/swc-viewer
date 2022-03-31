import {
	Icon,
	IconButton,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay,
	useDisclosure,
} from '@chakra-ui/react';
import { OutputEditor } from 'renderer/pages/shared/OutputEditor';
import { FileTransform } from '../../viewerContext/viewerContextReducer';

const EyeIcon = () => (
	<Icon viewBox="0 0 24 24">
		<path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
	</Icon>
);

type UploadedContentProps = {
	fileTransform: FileTransform;
};

export const UploadedContent = ({ fileTransform }: UploadedContentProps) => {
	const { isOpen, onOpen, onClose } = useDisclosure();

	const fileExtension = fileTransform.name.split('.').pop();
	const viewMode = ['tsx', 'ts'].some((ext) => ext === fileExtension)
		? 'typescript'
		: 'javascript';

	console.log({ viewMode });

	return (
		<>
			<IconButton
				aria-label="view raw source"
				title={`View ${fileTransform.name}`}
				onClick={onOpen}
				position="absolute"
				bottom="32px"
				right="32px"
				colorScheme="orange"
				icon={<EyeIcon />}
			/>

			<Modal isOpen={isOpen} onClose={onClose} size="6xl">
				<ModalOverlay />
				<ModalContent height="calc(100% - 7.5rem)">
					<ModalHeader>{fileTransform.path}</ModalHeader>
					<ModalCloseButton />
					<ModalBody flex="auto">
						<OutputEditor code={fileTransform.code} viewMode={viewMode} />
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	);
};
