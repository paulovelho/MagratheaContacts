<?php
namespace MagratheaContacts\Apikey;

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
}
