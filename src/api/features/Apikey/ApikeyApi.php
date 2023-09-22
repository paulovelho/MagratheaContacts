<?php

namespace MagratheaContacts\Apikey;

use Magrathea2\MagratheaApiControl;
use MagratheaContacts\Apikey\Apikey;

class ApikeyApi extends MagratheaApiControl {

	public function __construct() {
		$this->model = get_class(new Apikey());
		$this->service = new ApikeyControl();
	}

	public function GetByKey($params) {
		$val = $params["key"];
		$key = $this->service->GetByKey($val);
		if($key && $key->source_id) {
			$key->Source = new \MagratheaContacts\Source\Source($key->source_id);
		}
		return $key;
	}

	public function GetKeysBySource($params) {
		$source = $params["source"];
		$keys = $this->service->GetKeysBySource($source);
		return $keys;
	}

	public function GetAll($params) {
		return $this->service->GetAll();
	}

}
