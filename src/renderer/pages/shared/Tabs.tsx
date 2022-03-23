import { FC } from 'react';
import { Box } from '@chakra-ui/react';

export const Tabs: FC<unknown> = ({ children }) => (
	<Box display="flex" height="full" flexDirection="column">
		{children}
	</Box>
);
