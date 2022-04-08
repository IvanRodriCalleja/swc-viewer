import { FC } from 'react';
import { Box } from '@chakra-ui/react';

export const Tabs: FC<unknown> = ({ children }) => (
	<Box data-testid="tabs" display="flex" height="full" flexDirection="column">
		{children}
	</Box>
);
