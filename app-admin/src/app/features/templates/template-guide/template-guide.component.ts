import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { SharedModule } from '@app/shared/shared.module';
import { Toaster } from '@app/services/toaster/toaster.service';

@Component({
	selector: 'app-template-guide',
	imports: [
		SharedModule,
	],
	providers: [
		Toaster,
	],
	templateUrl: './template-guide.component.html',
	styleUrl: './template-guide.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TemplateGuideComponent {
	private toaster = inject(Toaster);

	public promptSample: string =
`Create an HTML e-mail template for [describe the purpose: welcome message, password reset, order confirmation...].

Requirements:
- Return a single block of HTML for the e-mail BODY (no <html>, <head> or <body> tags needed).
- Use a table-based layout, max width 600px, centered, with a background fallback color. E-mail clients do not support flexbox or grid.
- All CSS must be inline (style="..." attributes). No <style> blocks, no external stylesheets, no JavaScript.
- Use {{placeholder}} variables (double curly braces, e.g. {{first_name}}, {{cta_url}}) for every piece of dynamic content, and list the placeholders you used at the end.
- IMPORTANT: all images must be referenced by absolute, publicly hosted HTTPS URLs — this will be sent as an e-mail, so local paths, relative URLs and embedded/inline SVG will not work. Do not use base64-embedded images either; many clients block them. If I did not provide image URLs, use a {{placeholder}} for the src.
- Every <img> must have explicit width, height and alt text.
- Keep it compatible with Gmail, Outlook and Apple Mail: web-safe fonts (Arial, Helvetica, Georgia...), no web fonts, buttons built as table cells with background-color and padding.
- Provide a text version of the main call-to-action link near the footer, since some clients block styled buttons.`;

	public copyPrompt() {
		navigator.clipboard.writeText(this.promptSample)
			.then(() => this.toaster.success("Prompt copied to the clipboard."))
			.catch(() => this.toaster.error("Could not copy the prompt."));
	}
}
