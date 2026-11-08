## Template feature

This change will add a new feature to this app.
Templates will allow to create e-mail templates. Templates will be HTML code that will be sent instead of the plain `message text`. The temaplate will also have some placeholders that can be replaced by information that will also be sent when the mail is added.

Therefore, we will need a new database `templates` and for every e-mail, a new row in a new database `template_info`, that will store those placeholders in a json format.

This will require as well a change on the `mail` table, that will allow (or not) a link relation with a `template` and with a `template_info`.

## variable map

I am not sure how to create this relation between a template, and it's placeholders and a map of variables.
Ideally, the HTML should allow the placeholders to be typed inside the template.
For example, on the following template:

```html
<div class="something">
	Olá, {{first_name}}!
	<span class="other-class">Bem vindo ao {{new_project}}!</span>
	<img src="https://images.site.com/welcome" />
	<hr/>
	<img src="{{image_url}}" />
</div>
```

should be processed somehow and allow the creation of three variables on the variable map: `first_name`, `new_project`, and `image_url`. Each variable would also accept a default value in case nothing exists.

## template processing

The execution of e-mail sending is still being planned on my head, but you can help me build it properly.
The idea is to add new `EnumSentStatus`, something as `TemplateRequired`. When an e-mail is added that needs a template, it can be created with a null `message` text. Then another processor would check which e-mails are in the `TemplateRequired` status, process the template replacing the variable map, paste the result in the `mail`'s `message` column, and set it status to `NotProcessed`, this way, when the queue of sending e-mail is ran, it will send the e-mail.

I'm open for a different approach, we can discuss this together.

## database

Create the new databases, edit the `contacts.sql` file with the new structure, and also create a migration sql to work with some legacy projects, adding the new planned structure.

I'm not sure how to edit the database to add the new tables for `template`, `template_info`, and `variable mapping`. I am accepting your suggestions on this issue.

## admin

We will need to edit `app-admin` as well.
There will be a new area: Templates, where user will be able to add a new template. When the template is pasted, it will be processed, and the variable map will be created. Then, it will be possible for the admin to add the default values for each variable.
There should also be a preview for the given template, running in a pristine div (admin classes should not interfere on this, we would see the template as it arrives to the client).

## build instructions
- Follow the current code convention.
- If questions are raised, ask before acting.
- Use tabs instead of spaces for identation.
- Priorize existing MagratheaPHP functions when possible.
- Update `SKILL.md` file after changing something that requires a new skill update.
- Update `src/openapi.yml` when updating the API


## wrapping everything:
After everything is done, we need to update changelog.md and set the new version to 2.5


