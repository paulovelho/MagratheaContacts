<?php
namespace MagratheaContacts\Templates;

class Templates extends \MagratheaContacts\Templates\Base\TemplatesBase {

	const VAR_PATTERN = '/\{\{\s*([A-Za-z0-9_]+)\s*\}\}/';

	public function __construct($id=0){
		parent::__construct($id);
		$this->dbAlias["subject"] = "msg_subject";
	}

	/**
	 * Extracts the placeholder names ({{name}}) present in content and subject
	 * @return array	unique placeholder names, in order of appearance
	 */
	public function ExtractVars(): array {
		$text = ($this->content ?? "")."\n".($this->msg_subject ?? "");
		preg_match_all(self::VAR_PATTERN, $text, $matches);
		return array_values(array_unique($matches[1]));
	}

	/**
	 * Gets the variable map stored in the vars JSON column
	 * @return array	[ "var_name" => [ "default" => "value" ], ... ]
	 */
	public function GetVars(): array {
		if(empty($this->vars)) return [];
		$decoded = json_decode($this->vars, true);
		return is_array($decoded) ? $decoded : [];
	}
	public function SetVars(array $vars): Templates {
		$this->Set("vars", json_encode($vars, JSON_FORCE_OBJECT));
		return $this;
	}

	/**
	 * Rebuilds the vars map from the current content/subject:
	 * keeps the defaults of vars that still exist, adds new ones, drops removed ones
	 */
	public function SyncVars(): Templates {
		$current = $this->GetVars();
		$map = [];
		foreach($this->ExtractVars() as $name) {
			$map[$name] = @$current[$name] ?? ["default" => ""];
		}
		return $this->SetVars($map);
	}

	/**
	 * Renders subject and message, replacing each {{placeholder}}:
	 * sent values win over defaults; no value and no default = empty string
	 * @param array $values		[ "var_name" => "value", ... ]
	 * @return array	[ "subject" => ..., "message" => ... ]
	 */
	public function Render(array $values=[]): array {
		$vars = $this->GetVars();
		$replaceFn = function($text) use ($vars, $values) {
			return preg_replace_callback(self::VAR_PATTERN, function($m) use ($vars, $values) {
				$name = $m[1];
				if(isset($values[$name]) && !is_array($values[$name])) return strval($values[$name]);
				return strval(@$vars[$name]["default"] ?? "");
			}, $text ?? "");
		};
		return [
			"subject" => $replaceFn($this->msg_subject),
			"message" => $replaceFn($this->content),
		];
	}

	public function Insert() {
		$this->SyncVars();
		return parent::Insert();
	}
	public function Update() {
		if(isset($this->content) || isset($this->msg_subject)) {
			$this->LoadMissingForSync();
			$this->SyncVars();
		}
		return parent::Update();
	}

	/**
	 * On partial updates (only content or only subject sent), loads the missing
	 * half from the database so SyncVars does not drop the other field's vars
	 */
	private function LoadMissingForSync() {
		if(isset($this->content) && isset($this->msg_subject)) return;
		if(empty($this->id)) return;
		$saved = new Templates($this->id);
		if(!isset($this->content)) $this->content = $saved->content;
		if(!isset($this->msg_subject)) $this->msg_subject = $saved->msg_subject;
		if(empty($this->vars)) $this->vars = $saved->vars;
	}

}
