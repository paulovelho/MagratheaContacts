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

export const PlatypusTheme = definePreset(Material, {
	semantic: {
		colorScheme: {
			light: {
				semantic: {
					highlight: colors,
				},
			},
			dark: {
				semantic: {
					highlight: colors,
				},
			},
		},
	},
	components: {
		button: {
			text: {
				secondary: {
					hoverBackground: '{semantic.highlight.secondary}',
				}
			}
		},
		panel: {
			root: {
				background: '{semantic.highlight.surface}',
				color: '{semantic.highlight.text}',
			},
			header: {
				color: '{semantic.highlight.primary}',
			},
		},
		menu: {
			root: {
				background: '{semantic.highlight.surface}',
				color: '{semantic.highlight.text}',
			},
			item: {
				color: '{semantic.highlight.text}',
				focusBackground: '{semantic.highlight.primary}',
				icon: {
					focusColor: '{semantic.highlight.secondary}',
				}
			}
		}
	},
});
