<?php

namespace Magrathea2\Authorization;
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
			$user = $control->Login($data["email"], $data["password"]);
			return $this->ResponseLogin($user);
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
