<?php
namespace MagratheaContacts\Templates;

/**
 * @property TemplatesControl $service
 */
class TemplatesApi extends \Magrathea2\MagratheaApiControl {
	public function __construct() {
		$this->model = get_class(new Templates());
		$this->service = new TemplatesControl();
	}

	/**
	 * Renders a template without saving it, for live preview in the admin.
	 * POST body: content, subject, vars (sample values: { "name": "value" })
	 * Returns the extracted var map and the rendered subject/message.
	 */
	public function Preview($params) {
		$data = $this->GetPost();
		$template = new Templates();
		$template->content = @$data["content"] ?? "";
		$template->msg_subject = @$data["subject"] ?? @$data["msg_subject"] ?? "";
		$template->SyncVars();

		$values = @$data["vars"] ?? [];
		if(is_string($values)) $values = json_decode($values, true) ?: [];
		foreach($values as $name => $v) {
			if(is_array($v) && isset($v["default"])) $values[$name] = $v["default"];
		}

		$rendered = $template->Render($values);
		return [
			"vars" => $template->GetVars(),
			"subject" => $rendered["subject"],
			"message" => $rendered["message"],
		];
	}

	public function GetBySource($params) {
		return $this->service->GetBySource(intval($params["source"]));
	}

}
