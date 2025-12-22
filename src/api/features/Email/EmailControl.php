<?php
namespace MagratheaContacts\Email;

use Magrathea2\DB\Query;
use Magrathea2\MagratheaModelControl;

class EmailControl extends \MagratheaContacts\Email\Base\EmailControlBase {

	public function GetQueryToSend() {
		return Query::Select()
			->Obj(new Email())
			->Where([ "sent_status" => 0 ])
			->Where("priority > 0")
			->OrderBy("priority DESC, add_date ASC");
	}

	public function GetNextToSend() {
		$query = $this->GetQueryToSend();
		$query->Limit(1);
		return $this->RunRow($query);
	}

	public function GetToSend($limit) {
		$query = $this->GetQueryToSend();
		$query->Limit($limit);
		return $this->Run($query);
	}

	public function GetBase($limit=20, $page=0) {
		$q = Query::Select()
			->Obj(new Email())
			->OrderBy("add_date DESC")
			->Limit($limit);
		if($page) {
			$q->Page($page);
		}
		return $q;
	}

	public function GetFromSource($sourceId=0, $limit=30, $page=0) {
		$q = $this->GetBase($limit, $page);
		if($sourceId) {
			$q->Where(["source_id" => $sourceId]);
		}
		return $this->Run($q);
	}

	public function GetFromKey($key, $limit=50, $page=0) {
		$q = $this->GetBase($limit, $page);
		$q->Where(["origin_key" => $key]);
		return $this->Run($q);
	}

	public function IsOn(): bool {
		return \Magrathea2\ConfigApp::Instance()->GetBool("cron_active", true);
	}

	public function GetFromStatus(EnumSentStatus $status, $limit=50, $page=0) {
		$q = $this->GetBase($limit, $page);
		$q->Where(["sent_status" => $status->value]);
		return $this->Run($q);
	}

	public function GetFromStatusId(int $st, $limit=50, $page=0) {
		$q = $this->GetBase($limit, $page);
		$q->Where(["sent_status" => $st]);
		return $this->Run($q);
	}

	/**
	 * Filters emails by any combination of parameters. All params are optional.
	 * @param int|null $sourceId
	 * @param string|null $emailTo
	 * @param string|null $emailFrom
	 * @param string|null $type
	 * @param int|null $status
	 * @param int $limit
	 * @param int $page
	 */
	public function Filter($sourceId, $emailTo = null, $emailFrom = null, $type = null, $status = null, $limit=50, $page=0) {
		$q = $this->GetBase($limit, $page);
		$where = [ "source_id" => $sourceId ];
		if (!is_null($type) && $type !== "") {
			$where["mail_type"] = $type;
		}
		if (!is_null($status)) {
			$where["sent_status"] = $status;
		}
		$q->Where($where);
		if (!is_null($emailTo) && $emailTo !== "") {
			$q->Where("email_to LIKE '%{$emailTo}%'");
		}
		if (!is_null($emailFrom) && $emailFrom !== "") {
			$q->Where("email_from LIKE %{$emailFrom}%");
		}
		// return $q->SQL();
		return $this->Run($q);

	}

}
