import { FC } from 'react';
import { Box, useColorModeValue, Text } from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';

type TabProps = {
	tabId: number;
	isActive: boolean;
	title: string;
	canDelete: boolean;
	onDeleteTab: (tabId: number) => void;
	onActivateTab: (tabId: number) => void;
};

export const Tab: FC<TabProps> = ({
	children,
	tabId,
	title,
	isActive,
	canDelete,
	onDeleteTab,
	onActivateTab,
}) => {
	const activeBg = useColorModeValue('gray.100', 'gray.700');
	const bg = 'transparent';

	return (
		<Box
			data-testid={`tab-${tabId}`}
			title={title}
			position={isActive ? 'sticky' : 'relative'}
			left={0}
			right={0}
			height="calc(100% - 8px)"
			display="flex"
			alignItems="center"
			padding="0 12px"
			background={isActive ? activeBg : bg}
			borderTopRadius="8px"
			zIndex={isActive ? 1 : 0}
			_hover={
				isActive
					? {}
					: {
							background: '#bfc3c994',
					  }
			}
			_before={
				isActive
					? {}
					: {
							content: '""',
							display: 'block',
							width: '1px',
							height: '16px',
							background: 'gray.700',
							position: 'absolute',
							right: '-1px',
					  }
			}
			onClick={() => onActivateTab(tabId)}
		>
			{isActive && (
				<Box
					data-testid="activated-outer-left-border-radius"
					className="mask-left"
					position="absolute"
					width="12px"
					height="12px"
					backgroundColor={activeBg}
					bottom={0}
					left="-12px"
					zIndex={isActive ? 1 : 0}
				/>
			)}
			<Text
				fontSize="sm"
				userSelect="none"
				maxWidth="196px"
				whiteSpace="nowrap"
				overflow="hidden"
				textOverflow="ellipsis"
			>
				{children}
			</Text>
			{isActive && (
				<Box
					data-testid="activated-outer-right-border-radius"
					className="mask-right"
					position="absolute"
					width="12px"
					height="12px"
					background={activeBg}
					bottom={0}
					right="-12px"
					_before={{
						content: '""',
						display: 'block',
						background: 'gray.900',
						height: '12px',
						width: '12px',
						borderBottomLeftRadius: '12px',
					}}
				/>
			)}
			{canDelete && (
				<Box
					data-testid="close-button-tab"
					width="24px"
					height="24px"
					display="flex"
					justifyContent="center"
					alignItems="center"
					marginLeft="8px"
					marginRight="-8px"
					onClick={() => onDeleteTab(tabId)}
				>
					<CloseIcon height="10px" width="10px" />
				</Box>
			)}
		</Box>
	);
};
