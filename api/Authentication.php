<?php

	use \Firebase\JWT\JWT;

	class AuthenticationApi extends MagratheaApiControl {
		public function Tokenize() {
			$source_id = @$_POST["source"];
			$password = @$_POST["sec_hash"];

			if(empty($password)) {
				throw new MagratheaApiException("missing data for tokenizer", 401);
				return;
			}

			if(empty($source_id)) {
				$auth_key = MagratheaConfig::Instance()->GetFromDefault("admin_password");
				if($auth_key == $password) {
					$mail_from = MagratheaConfig::Instance()->GetFromDefault("admin_email");
					return $this->GenerateToken(array(
						"id" => -1,
						"name" => "admin",
						"mail_from" => $mail_from,
					));
				} else {
					throw new MagratheaApiException("Admin User Incorrect", 401);
					
				}
			}

			$source = new Source($source_id);
			if($password != $source->sec_hash) {
				throw new MagratheaApiException("incorrect password", 401);
				return;
			}

			return $this->GenerateToken($this->GeneratePayloadFromSource($source));
		}

		public function GeneratePayloadFromSource($source) {
			return array(
				"id" => $source->id,
				"name" => $source->name,
				"mail_from" => $source->mail_from,
			);
		}

		public function GenerateToken($payload) {
			$key = MagratheaConfig::Instance()->GetFromDefault("jwt_key");
			$token = $jwt = JWT::encode($payload, $key);
			return array('source' => $payload, 'token' => $token);
		}

		public function Token() {
			$token = $this->GetAuthorizationBearer();

			$key = MagratheaConfig::Instance()->GetFromDefault("jwt_key");
			$data = $jwt = JWT::decode($token, $key, array('HS256'));
			return $data;
		}

	}

?>
