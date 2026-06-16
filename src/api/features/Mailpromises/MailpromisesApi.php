<?php
namespace MagratheaContacts\Mailpromises;

class MailpromisesApi extends \Magrathea2\MagratheaApiControl {
	public function __construct() {
		$this->model = get_class(new Mailpromises());
		$this->service = new MailpromisesControl();
	}

}
