import { Box, Select, useColorModeValue } from '@chakra-ui/react';
import { useField } from 'formik';
import { useNpmPackageVersions } from 'renderer/server-resources/useNpmPackageVersions';

type SelectVersionProps = {
	packageName: string;
};

export const SelectVersion = ({ packageName }: SelectVersionProps) => {
	const { data: versions } = useNpmPackageVersions({ packageName });
	const headerBg = useColorModeValue('gray.300', 'gray.900');
	const selectBg = useColorModeValue('gray.300', 'gray.700');
	const bodyBg = useColorModeValue('gray.400', 'gray.600');
	const [field, meta] = useField({
		name: 'version',
		validate: (version) => (version ? undefined : 'Version is required'),
	});

	return (
		<Box borderBottomWidth="1px" borderColor={headerBg}>
			<Box bg={headerBg} padding="8px 16px">
				{packageName}
			</Box>
			<Box padding="16px" bg={bodyBg}>
				<Select bg={selectBg} {...field}>
					{versions?.map((v) => (
						<option key={v} value={v}>
							{v}
						</option>
					))}
				</Select>

				{meta.error && (
					<Box padding="0 8px" mt="8px" color="red.400">
						{meta.error}
					</Box>
				)}
			</Box>
		</Box>
	);
};
