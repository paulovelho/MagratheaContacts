import { definePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';
import Material from '@primeuix/themes/material';
import { ButtonTokenSections } from '@primeuix/themes/types/button';

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
const buttonColors: ButtonTokenSections.Root = {
	primary: {
		...primaryColors.primary,
		hoverBackground: 'var(--primary-hover)',
		hoverColor: 'var(--primary-contrast-color)',
	},	
};
const inputColors = {
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
};
const tableColors = {

}

export const PlatypusTheme = definePreset(Material, {
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
		input: inputColors,
		inputtext: {
			root: {
				...inputColors,
				disabledBackground: 'var(--secondary)',
				disabledColor: 'var(--primary-contrast-color)',
			},
		},
		select: {
			root: {
				...inputColors,
				disabledBackground: 'var(--surface)',
				disabledColor: 'var(--primary)',
				placeholderColor: 'var(--primary)',
			},
			option: {
				...inputColors,
				selectedBackground: 'var(--surface-hover)',
				selectedColor: 'var(--primary)',
				selectedFocusBackground: 'var(--surface-hover)',
				selectedFocusColor: 'var(--primary)',
			},
			optionGroup: inputColors,
			overlay: inputColors,
		},
		button: {
			colorScheme: {
				light: { root: buttonColors },
				dark: { root: buttonColors },
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
		datatable: {
			// root: panelColors,
			header: panelColors,
			headerCell: panelColors,
			// bodyCell: {panelColors},
			row: {
				...panelColors,
				hoverBackground: 'var(--surface-hover)',
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

console.log("theme",
	PlatypusTheme.components?.datatable
);
