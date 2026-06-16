<?php
namespace MagratheaContacts\Cronlogs;

use Magrathea2\DB\Query;

class CronlogsControl extends \MagratheaContacts\Cronlogs\Base\CronlogsControlBase {

	public function Log(
		string $status,
		string $result,
		string $data,
	) {
		$log = new Cronlogs();
		$log->timestart = time();
		$log->timeend = time();
		$log->status = $status;
		$log->result = $result;
		$log->log = $data;
		$log->Insert();
		return $log;
	}

	public function GetLast($limit=20, $page=0) {
		$q = Query::Select()
			->Obj(new Cronlogs())
			->OrderBy("id DESC")
			->Limit($limit)
			->Page($page);
		return $this->Run($q);
	}

}
