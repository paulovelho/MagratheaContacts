<?php
namespace MagratheaContacts\Apikey;

use Magrathea2\DB\Database;
use Magrathea2\DB\Query;
use Magrathea2\Exceptions\MagratheaModelException;
use MagratheaContacts\Source\Source;
use MagratheaContacts\Source\SourceControl;

class ApikeyControl extends \MagratheaContacts\Apikey\Base\ApikeyControlBase {

	public function throwEx(string $message) {
		return new MagratheaModelException($message);
	}

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

	public static function GetByKey($key): Apikey|null {
		$q = Query::Select()
			->Obj(new Apikey())
			->Where(["val" => $key]);
		return self::RunRow($q);
	}

	public static function GetKeysBySource($sourceId): array {
		$q = Query::Select()
			->Obj(new Apikey())
			->Where(["source_id" => $sourceId]);
		return self::Run($q);
	}

	public function IncreaseUse($key) {
		$query = Query::Update();
		$query->Table("apikey");
		$query->SetRaw('uses = uses + 1')
			->Where(['val' => $key]);
		return $this->Run($query);
	}

	public function ValidateKey(string|null $k): Apikey {
		if(empty($k)) {
			throw $this->throwEx("Key is empty!");
		}
		$key = $this->GetByKey($k);
		if(!$key || !$key->id) {
			throw $this->throwEx("Invalid key: [".$k."]");
		}
		$valid = $key->ValidateKey();
		if(!$valid["ok"]) {
			throw $this->throwEx("Key invalid [".$k."]: ".@$valid["data"]);
		}
		$key->Source = new Source($key->source_id);
		if(empty($key->Source->mail_from)) {
			throw $this->throwEx("invalid source [source_id: ".$key->source_id."]");
		}
		return $key;
	}

}
