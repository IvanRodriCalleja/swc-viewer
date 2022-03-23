import { FC, ReactNode } from 'react';
import { Box } from '@chakra-ui/react';

type TabListProps = {
	fixedRightActions?: ReactNode;
};

export const TabList: FC<TabListProps> = ({
	children,
	fixedRightActions = null,
}) => (
	<Box width="full" display="flex" alignItems="end">
		<Box
			height="40px"
			display="inline-flex"
			marginLeft="90px"
			marginRight={fixedRightActions ? '48px' : '0px'}
			alignItems="end"
			overflow="auto"
			maxWidth="calc(100% - 138px)"
		>
			{children}
		</Box>
		{fixedRightActions}
	</Box>
);
