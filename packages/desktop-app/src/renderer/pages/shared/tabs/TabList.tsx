import { FC, ReactNode } from 'react';
import { Box } from '@chakra-ui/react';

type TabListProps = {
	fixedRightActions?: ReactNode;
};

export const TabList: FC<TabListProps> = ({
	children,
	fixedRightActions = null,
}) => (
	<Box
		width="full"
		display="flex"
		alignItems="end"
		css={{
			'&::-webkit-scrollbar': {
				display: 'none',
			},
		}}
	>
		<Box
			height="40px"
			display="flex"
			marginLeft="90px"
			marginRight={fixedRightActions ? '48px' : '0px'}
			alignItems="end"
			overflow="auto"
			maxWidth="calc(100% - 138px)"
			css={{
				'&::-webkit-scrollbar': {
					display: 'none',
				},
			}}
		>
			{children}
		</Box>
		{fixedRightActions}
	</Box>
);
