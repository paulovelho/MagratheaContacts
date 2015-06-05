<?php
class BaseControl extends MagratheaController {
	private $selectedMenu = "";
	public static function Go404(){
		self::GetSmarty()->display("help_pages/404.html");
		return;
	}
	public static function Form(){
		self::GetSmarty()->display("form.html");
	}
}
?>
