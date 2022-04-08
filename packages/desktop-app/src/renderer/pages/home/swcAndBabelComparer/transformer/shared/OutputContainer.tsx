import { Box } from '@chakra-ui/react';
import { FC, Suspense } from 'react';

export const OutputContainer: FC = ({ children }) => (
	<Box
		width="full"
		height="calc(100% - 56px)"
		borderWidth="1px"
		position="relative"
	>
		<Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
	</Box>
);
