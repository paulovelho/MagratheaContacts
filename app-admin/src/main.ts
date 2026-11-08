/// <reference types="@angular/localize" />

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { ConfigError } from './app/services/config/config.service';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => {
    console.error(err);
    if (err instanceof ConfigError) {
      renderConfigError(err);
    }
  });

// Angular failed to bootstrap, so the error page is plain DOM.
function renderConfigError(err: ConfigError): void {
  const box = document.createElement('div');
  box.style.cssText = 'max-width:640px;margin:10vh auto;padding:24px;font-family:system-ui,sans-serif;'
    + 'border:1px solid #e0b4b4;border-radius:8px;background:#fff6f6;color:#5a1f1f;line-height:1.5';

  const title = document.createElement('h2');
  title.style.margin = '0 0 12px';
  title.textContent = 'Admin configuration error';

  const message = document.createElement('p');
  message.textContent = err.message;

  const hint = document.createElement('p');
  hint.append('Create it on the server with the API URL, e.g. ');
  const code = document.createElement('code');
  code.textContent = '{ "apiUrl": "https://your-api-domain" }';
  hint.append(code, ' (see config.json.sample).');

  box.append(title, message, hint);
  document.body.replaceChildren(box);
}
