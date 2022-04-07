import { Box, Spinner } from '@chakra-ui/react';

type TransformStatusProps = {
	isLoading: boolean;
};

export const TransformStatus = ({ isLoading }: TransformStatusProps) => (
	<Box
		position="absolute"
		right="32px"
		top="16px"
		zIndex={1}
		padding="4px 8px"
		bg="orange.200"
		color="gray.800"
		borderRadius="4px"
		fontSize="10px"
		fontWeight="bold"
	>
		{isLoading ? <Spinner size="sm" /> : 'Done!'}
	</Box>
);
