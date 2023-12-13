<?php

namespace MagratheaContacts\Source;

class SourceApi extends \Magrathea2\MagratheaApiControl {

	public function __construct() {
		$this->model = get_class(new Source());
		$this->service = new SourceControl();
	}

}
