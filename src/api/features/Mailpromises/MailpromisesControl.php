<?php
namespace MagratheaContacts\Mailpromises;

use Magrathea2\DB\Query;

class MailpromisesControl extends \MagratheaContacts\Mailpromises\Base\MailpromisesControlBase {

	const DEFAULT_BATCH = 10;
	const MAX_BATCH = 50;

	public function IsOn(): bool {
		return \Magrathea2\ConfigApp::Instance()->GetBool("promises_active", true);
	}

	public function GetUnprocessed(int $limit) {
		$q = Query::Select()
			->Obj(new Mailpromises())
			->Where(["processed" => 0])
			->OrderBy("priority DESC, created_at ASC")
			->Limit($limit);
		return $this->Run($q);
	}

	/**
	 * Processes a batch of unprocessed promises, turning each one into a mail row.
	 * Batch size is capped so a cron run always finishes quickly.
	 * @return array	summary with one result entry per promise
	 */
	public function ProcessBatch(int $limit=self::DEFAULT_BATCH): array {
		if($limit < 1) $limit = 1;
		if($limit > self::MAX_BATCH) $limit = self::MAX_BATCH;
		$promises = $this->GetUnprocessed($limit);
		$results = [];
		foreach($promises as $promise) {
			array_push($results, $promise->Process());
		}
		return [
			"success" => true,
			"processed" => count($results),
			"results" => $results,
		];
	}

	public function GetFromSource(int $sourceId, $limit=30, $page=0) {
		$q = Query::Select()
			->Obj(new Mailpromises())
			->Where(["source_id" => $sourceId])
			->OrderBy("created_at DESC")
			->Limit($limit);
		if($page) $q->Page($page);
		return $this->Run($q);
	}

	public function GetFromTemplate(int $templateId, $limit=30, $page=0) {
		$q = Query::Select()
			->Obj(new Mailpromises())
			->Where(["template_id" => $templateId])
			->OrderBy("created_at DESC")
			->Limit($limit);
		if($page) $q->Page($page);
		return $this->Run($q);
	}

}
