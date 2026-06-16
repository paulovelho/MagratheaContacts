<?php

namespace MagratheaContacts\Smtp;

class SmtpApi extends \Magrathea2\MagratheaApiControl {

	public function __construct() {
		$this->model = get_class(new Smtp());
		$this->service = new SmtpControl();
	}

}
