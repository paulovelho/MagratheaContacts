<?php

include(__DIR__."/Base/AdminBase.php");

class Admin extends AdminBase {

}

class AdminControl extends AdminControlBase {
	public static function getByEmailAndPassword($e, $p){
		$q = MagratheaQuery::Select()->Table("admin")->Where(array("email"=>$e, "password"=>$p));
		return self::Run($q);
	}
}

?>
