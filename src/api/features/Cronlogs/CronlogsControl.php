<?php
namespace MagratheaContacts\Cronlogs;

use Magrathea2\DB\Database;
use Magrathea2\DB\Query;
use Magrathea2\MagratheaPagination;

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

	public function GetLastPaginated(int $page = 0, int $limit = 50): MagratheaPagination {
		$q = Query::Select()
			->Obj(new Cronlogs())
			->OrderBy("id DESC");
		return self::GetPagination($q, $page, $limit);
	}

	public function DeleteOlderThan(string $before): int {
		$where = "created_at < '".Query::Clean($before)."'";
		$count = self::Count(Query::Select()->Obj(new Cronlogs())->Where($where));
		if ($count > 0) {
			Database::Instance()->Query(Query::Delete()->Table("cronlogs")->Where($where)->SQL());
		}
		return $count;
	}

}
