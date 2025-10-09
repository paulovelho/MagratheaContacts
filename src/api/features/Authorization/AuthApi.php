<?php

namespace MagratheaContacts;
require("../vendor/autoload.php");

use Exception;
use Magrathea2\MagratheaApiAuth;
use MagratheaContacts\Users\UsersControl;
use \Firebase\JWT\JWT;
use \Firebase\JWT\Key;
use Magrathea2\Exceptions\MagratheaApiException;

class AuthApi extends MagratheaApiAuth {

	public function Token() {
		return $this->GetTokenInfo();
	}

	public function Login() {
		$data = $this->GetPost();
		$control = new UsersControl();
		try {
			$rs = $control->Login($data["email"], $data["password"]);
			// return $rs['user'];
			return $this->ResponseLogin($rs["user"]);
		} catch(Exception $ex) {
			throw $ex;
		}
	}

	public function IsAdmin() {
		if($this->IsLogged()) {
			return true;
//			throw new MagratheaApiException("user checked and reproved");
		} else {
			return false;
		}
	}

}
