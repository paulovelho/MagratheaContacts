<?php
namespace MagratheaContacts\Templates;

class TemplatesApi extends \Magrathea2\MagratheaApiControl {
	public function __construct() {
		$this->model = get_class(new Templates());
		$this->service = new TemplatesControl();
	}

}
