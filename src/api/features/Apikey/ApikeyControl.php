<?php
namespace MagratheaContacts\Apikey;

use Magrathea2\DB\Database;
use Magrathea2\DB\Query;
use MagratheaContacts\Source\SourceControl;

class ApikeyControl extends \MagratheaContacts\Apikey\Base\ApikeyControlBase {

	public static function GetSelect(): array {
		$sources = [];
		$selectKey = [];
		$keys = ApikeyControl::GetAll();
		foreach(SourceControl::GetAll() as $s) {
			$sources[$s->id] = $s;
		}
		foreach($keys as $k) {
			$s = @$sources[$k->source_id];
			$sourceName = (@$s->id ? $s->name : "unknown");
			array_push($selectKey, [
				"id" => $k->val."=".$k->source_id,
				"name" =>  $sourceName." => [".$k->val."]"
			]);
		}
		return $selectKey;
	}

	public function createKey($tries=0): string {
		$length = 20;
		$key = $this->createRandomStr($length);
		if(!$this->assertKeyNotInUse($key)) {
			$tries = $tries + 1;
			if($tries > 5) return "incorrect key creation (after ".$tries." tries)";
			return $this->createKey($tries);
		}
		return $key;
	}

	public function createRandomStr($length): string {
		$characters = '0123456789abcdefghijklmnopqrstuvwxyz';
		$randomKey = "";
		for ($i = 0; $i < $length; $i++) {
				$randomKey .= $characters[random_int(0, strlen($characters) - 1)];
		}
		return $randomKey;
	}

	public function assertKeyNotInUse($key): bool {
		$q = Query::Select("COUNT(1) as ok")
			->Table("apikey")
			->Where(["val" => $key]);
		$rs = Database::Instance()->QueryOne($q);
		return ($rs == 0);
	}

	public function GetByKey($key): Apikey|null {
		$q = Query::Select()
			->Obj(new Apikey())
			->Where(["val" => $key]);
		return $this->RunRow($q);
	}

	public function GetKeysBySource($sourceId): array {
		$q = Query::Select()
			->Obj(new Apikey())
			->Where(["source_id" => $sourceId]);
		return $this->Run($q);
	}

}
