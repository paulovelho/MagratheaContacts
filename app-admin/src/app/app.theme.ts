import { definePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';
import Material from '@primeuix/themes/material';

const panelColors = {
	background: 'var(--surface-card)',
	color: 'var(--text-color)',
	border: '1px solid var(--surface-border)',
};

const primaryColors = {
	primary: {
		background: 'var(--primary)',
		color: 'var(--primary-contrast-color)',
	}
};

export const PlatypusTheme = definePreset(Aura, {
	semantic: {
		primary: {
			50: 'var(--primary)',
			100: 'var(--primary)',
			200: 'var(--primary)',
			300: 'var(--primary)',
			400: 'var(--primary)',
			500: 'var(--primary)',
			600: 'var(--primary)',
			700: 'var(--primary)',
			800: 'var(--primary)',
			900: 'var(--primary)',
			950: 'var(--primary)',
		},
		focus: {
			shadow: '0 0 0 2px var(--surface-card), 0 0 0 4px var(--primary), 0 1px 2px 0 black'
		},
	},
	components: {
		input: {
			background: 'var(--surface-card)',
			borderColor: 'var(--surface-border)',
			color: 'var(--text-color)',
			placeholderColor: 'var(--text-color-secondary)',
			hover: {
				borderColor: 'var(--primary)'
			},
			focus: {
				borderColor: 'var(--primary)',
				shadow: '0 0 0 1px var(--primary)'
			}
		},
		button: {
			colorScheme: {
				light: { root: primaryColors },
				dark: { root: primaryColors },
			}
		},
		menu: {
			root: panelColors,
			item: {
				...panelColors,
				focusBackground: 'var(--secondary)',
				icon: {
					color: 'var(--primary-contrast-color)',
					focusColor: 'var(--secondary)',
				}
			},
		},
		panel: {
			root: panelColors,
			header: panelColors,
		},
		card: {
			root: panelColors,
		},
		dialog: {
			root: panelColors,
		},
		sidebar: {
			root: panelColors,
		},
		paginator: {
			root: panelColors,
		},
		table: {
			root: panelColors,
			header: {
				background: 'var(--surface-card)',
				borderColor: 'var(--surface-border)',
				color: 'var(--text-color)',
			},
			headerCell: {
				background: 'var(--surface-card)',
				borderColor: 'var(--surface-border)',
				color: 'var(--text-color)',
			},
			bodyCell: {
				background: 'var(--surface-card)',
				borderColor: 'var(--surface-border)',
				color: 'var(--text-color)',
			},
			row: {
				background: 'var(--surface-card)',
				color: 'var(--text-color)',
				hover: {
					background: 'var(--surface-hover)',
					color: 'var(--text-color)',
				}
			}
		},
		dropdown: {
			root: {
				borderColor: 'var(--surface-border)',
				color: 'var(--text-color)'
			},
			list: {
				background: 'var(--surface-card)',
				borderColor: 'var(--surface-border)',
				color: 'var(--text-color)',
			},
			item: {
				color: 'var(--text-color)',
				hover: {
					background: 'var(--surface-hover)',
					color: 'var(--text-color)',
				},
				selected: {
					background: 'var(--primary)',
					color: 'var(--primary-contrast-color)',
				}
			}
		},
		badge: {
			colorScheme: {
				light: primaryColors,
				dark: primaryColors,
			}
		}
	}
});
