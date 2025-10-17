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
