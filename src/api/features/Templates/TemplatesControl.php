<?php
namespace MagratheaContacts\Templates;

use Magrathea2\DB\Query;

class TemplatesControl extends \MagratheaContacts\Templates\Base\TemplatesControlBase {

	public function GetBySource(int $sourceId, bool $onlyActive=false) {
		$q = Query::Select()
			->Obj(new Templates())
			->Where(["source_id" => $sourceId])
			->OrderBy("name ASC");
		if($onlyActive) $q->Where(["active" => 1]);
		return $this->Run($q);
	}

	/**
	 * Finds an active template by name, within a source or global (source_id = NULL);
	 * a template of the source wins over a global one with the same name
	 */
	public function GetByName(string $name, int $sourceId): Templates|null {
		$q = Query::Select()
			->Obj(new Templates())
			->Where(["name" => Query::Clean($name), "active" => 1])
			->Where("(source_id = ".intval($sourceId)." OR source_id IS NULL)")
			->OrderBy("source_id DESC")
			->Limit(1);
		return $this->RunRow($q);
	}

}
