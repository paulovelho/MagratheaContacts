<?php

include(__DIR__."/Base/AdminBase.php");

class Admin extends AdminBase {
	public function SetPassword($p){
		$this->password = md5($p);
	}
}

class AdminControl extends AdminControlBase {
	public static function getByEmailAndPassword($e, $p){
		$q = MagratheaQuery::Select()->Table("admin")->Where(array("email"=>$e, "password"=>md5($p)));
		return self::Run($q);
	}
}

?>
