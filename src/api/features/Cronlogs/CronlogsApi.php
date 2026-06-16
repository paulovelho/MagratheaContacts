<?php
namespace MagratheaContacts\Cronlogs;

class CronlogsApi extends \Magrathea2\MagratheaApiControl {
	public function __construct() {
		$this->model = get_class(new Cronlogs());
		$this->service = new CronlogsControl();
	}

}
