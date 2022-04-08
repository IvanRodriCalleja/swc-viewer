import { AddIcon } from '@chakra-ui/icons';
import { Box } from '@chakra-ui/react';

type AddTabButtonProps = {
	onAddTab: () => void;
};

export const AddTabButton = ({ onAddTab }: AddTabButtonProps) => (
	<Box
		data-testid="add-button-tab"
		display="flex"
		alignItems="center"
		justifyContent="center"
		zIndex={0}
		height="24px"
		width="24px"
		borderRadius="50%"
		marginBottom="4px"
		marginLeft="-38px"
		_hover={{
			background: '#ffffff2b',
		}}
		onClick={onAddTab}
	>
		<AddIcon h="12px" width="12px" color="white.300" cursor="pointer" />
	</Box>
);
