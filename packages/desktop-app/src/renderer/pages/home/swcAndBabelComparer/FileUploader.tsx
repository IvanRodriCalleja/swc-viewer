import {
	Heading,
	Icon,
	Input,
	Stack,
	useColorModeValue,
	useToast,
} from '@chakra-ui/react';
import { useState } from 'react';

const allowedFileTypes = ['.ts', '.tsx', '.js', '.jsx'];

export type FileUploaderProps = {
	onFileUpload: (event: ProgressEvent<FileReader>, file: File) => void;
};

export const FileUploader = ({ onFileUpload }: FileUploaderProps) => {
	const toast = useToast();
	const [isHover, setIsHover] = useState(false);
	const [dragStatus, setDragStatus] = useState(false);

	const mainColor = useColorModeValue('gray.400', 'gray.600');
	const colorHover = useColorModeValue('gray.300', 'gray.500');

	const color = isHover ? colorHover : mainColor;

	const onDragEnter = () => {
		setDragStatus(true);
	};

	const onDragLeave = () => setDragStatus(false);

	const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const files = event.target.files as FileList;
		const file = files[0];

		const fileExtension = `.${file.name.split('.').pop()}`;
		const isValidExtension = allowedFileTypes.some(
			(allowedType) => allowedType === fileExtension
		);

		if (isValidExtension) {
			const reader = new FileReader();
			reader.readAsText(file, 'UTF-8');
			reader.onload = (progressEvent) => {
				onFileUpload(progressEvent, file);
			};
			reader.onerror = (progressEvent) => {
				console.log('Error reading file', progressEvent);
			};
		} else {
			toast({
				title: 'Unsupported file type',
				description: `File with extension ${fileExtension} is not supported`,
				status: 'error',
				duration: 3000,
				isClosable: true,
				position: 'top-right',
			});
		}
		setDragStatus(false);
	};

	return (
		<Stack
			data-testid="file-uploader"
			as="div"
			position="relative"
			display="flex"
			flexDirection="column"
			alignItems="center"
			justifyContent="center"
			width="full"
			height="full"
			borderStyle="dashed"
			borderWidth="2px"
			background={dragStatus ? '#c5ffdb' : ''}
			borderColor={color}
		>
			<Input
				data-testid="upload-file"
				readOnly
				type="file"
				position="absolute"
				top="0"
				bottom="0"
				left="0"
				right="0"
				height="auto"
				cursor="pointer"
				accept={allowedFileTypes.join(', ')}
				opacity="0"
				onMouseEnter={() => setIsHover(true)}
				onMouseLeave={() => setIsHover(false)}
				onDragEnter={onDragEnter}
				onDragLeave={onDragLeave}
				onChange={onInputChange}
			/>
			<Icon viewBox="0 0 24 24" w="156px" h="auto" fill={color}>
				<path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z" />
			</Icon>
			<Heading size="sm" color={color}>
				Drag and drop an .ts, .tsx, .js or .jsx file
			</Heading>
		</Stack>
	);
};
