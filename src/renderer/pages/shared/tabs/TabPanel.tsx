import { FC } from 'react';
import { Box, useColorModeValue } from '@chakra-ui/react';

export const TabPanel: FC<unknown> = ({ children }) => {
	const bg = useColorModeValue('gray.100', 'gray.700');

	return (
		<Box
			background={bg}
			width="full"
			flexGrow={1}
			padding="20px"
			maxHeight="calc(100% - 40px)"
		>
			{children}
		</Box>
	);
};
