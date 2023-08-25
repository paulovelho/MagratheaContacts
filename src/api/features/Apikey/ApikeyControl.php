<?php
namespace MagratheaContacts\Apikey;

use Magrathea2\DB\Database;
use Magrathea2\DB\Query;
use Magrathea2\MagratheaModelControl;

class ApikeyControl extends ApikeyControlBase {

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

}
