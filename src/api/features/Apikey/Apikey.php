<?php
namespace MagratheaContacts\Apikey;

use function Magrathea2\now;

class Apikey extends ApikeyBase {
	
	function __construct($id=null) {
		parent::__construct($id);
	}

	public function InitializeKey() {
		if( empty($this->val) ) {
			$control = new ApikeyControl();
			$key = $control->createKey(4);
			$this->val = $key;
		}
	}

	public function Normalize(): Apikey {
		if(!$this->uses) $this->uses = 0;
		if(!$this->usage_limit) $this->usage_limit = 0;
		if(empty($this->expiration)) $this->expiration = null;
		return $this;
	}

	public function ValidateKey(): array {
		$error = null;
		if($this->usage_limit > 0 && $this->uses == $this->usage_limit) $error = "usage limit reached";
		if($this->expiration != null && $this->expiration > now()) $error = "key expired";
		if(!$this->active) $error = "key not active";
		return [
			"ok" => ($error == null),
			"data" => $error
		];
	}


}
