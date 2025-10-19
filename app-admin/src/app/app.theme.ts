import { definePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';
import Material from '@primeuix/themes/material';

const primary = '#192045';
const secondary = '#08833f';

const colors = {
	primary,
	secondary,
	surface: '#FFF',
	surfaceHover: '#DDD',
	text: '#192045',
	error: 'red',
	warning: 'yellow',
	success: 'green',
};

const surfaceColors = {
	root: {
		background: '{semantic.surface}',
		color: '{semantic.text}',
	},
}

export const PlatypusTheme = definePreset(Material, {
	semantic: {
		colorScheme: {
			light: {
				semantic: colors,
			},
			dark: {
				semantic: colors,
			},
		},
	},
	components: {
		inputtext: {
			root: {
				background: '{semantic.surface}',
				color: '{semantic.primary}',
			},
		},
		checkbox: {
			root: {
				background: '{semantic.surface}',
				checkedBackground: '{semantic.secondary}',
			}
		},
		button: {
			text: {
				secondary: {
					hoverBackground: '{semantic.secondary}',
				}
			}
		},
		panel: {
			root: surfaceColors.root,
			header: {
				color: '{semantic.primary}',
			},
		},
		dialog: surfaceColors,
		confirmpopup: surfaceColors,
		menu: {
			root: {
				background: '{semantic.surface}',
				color: '{semantic.text}',
			},
			item: {
				color: '{semantic.text}',
				focusBackground: '{semantic.primary}',
				icon: {
					focusColor: '{semantic.secondary}',
				}
			}
		}
	},
});
