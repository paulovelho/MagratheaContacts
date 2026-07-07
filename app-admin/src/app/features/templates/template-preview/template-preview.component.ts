import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import { renderTemplate } from '../template.service';

/**
 * Renders the template as a mail client would, inside a sandboxed iframe
 * so the admin's global styles never bleed into the preview (and vice versa).
 */
@Component({
	selector: 'app-template-preview',
	imports: [],
	templateUrl: './template-preview.component.html',
	styleUrl: './template-preview.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TemplatePreviewComponent {
	private sanitizer = inject(DomSanitizer);

	public subject = input<string>("");
	public content = input<string>("");
	public values = input<{ [name: string]: string }>({});

	public renderedSubject = computed<string>(() => renderTemplate(this.subject(), this.values()));
	public renderedContent = computed<SafeHtml>(() =>
		this.sanitizer.bypassSecurityTrustHtml(renderTemplate(this.content(), this.values()))
	);
}
