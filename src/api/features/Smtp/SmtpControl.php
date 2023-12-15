<?php
namespace MagratheaContacts\Smtp;

class SmtpControl extends \MagratheaContacts\Smtp\Base\SmtpControlBase {

	public static function GetSelectArray() {
		$arr = parent::GetSelectArray();
		$arr[0] = "none";
		return $arr;
	}

}
