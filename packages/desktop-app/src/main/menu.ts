import { Menu } from 'electron';

const template = [
	{
		label: 'Edit',
		submenu: [
			{ label: 'Cut', accelerator: 'CmdOrCtrl+X', selector: 'cut:' },
			{ label: 'Copy', accelerator: 'CmdOrCtrl+C', selector: 'copy:' },
			{ label: 'Paste', accelerator: 'CmdOrCtrl+V', selector: 'paste:' },
			{
				label: 'Select All',
				accelerator: 'CmdOrCtrl+A',
				selector: 'selectAll:',
			},
		],
	},
];

export const buildMenu = () => {
	const menu = Menu.buildFromTemplate(template);
	Menu.setApplicationMenu(menu);
};
