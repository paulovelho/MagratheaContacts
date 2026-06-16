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
		try {
			return $this->GetTokenInfo();
		} catch(Exception $ex) {
			throw new MagratheaApiException("Authentication error", 500);
		}
	}

	public function Login() {
		$data = $this->GetPost();
		return $this->AdminUserLogin($data["email"], $data["password"]);
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
