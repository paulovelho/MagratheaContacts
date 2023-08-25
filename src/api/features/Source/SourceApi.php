<?php

namespace MagratheaContacts\Source;

use Magrathea2\MagratheaApiControl;

use function Magrathea2\getClassNameOfClass;

class SourceApi extends MagratheaApiControl {

	public function __construct() {
		$this->model = get_class(new Source());
		$this->service = new SourceControl();
	}

}
