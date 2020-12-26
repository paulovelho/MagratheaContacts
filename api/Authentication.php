<?php

	use \Firebase\JWT\JWT;

	class AuthenticationApi extends MagratheaApiControl {
		public function Tokenize() {
			$source_id = @$_POST["source"];
			$password = @$_POST["sec_hash"];

			if(empty($source_id) || empty($password)) {
				throw new MagratheaApiException("missing data for tokenizer", 401);
				return;
			}

			$source = new Source($source_id);
			if($password != $source->sec_hash) {
				throw new MagratheaApiException("incorrect password", 401);
				return;
			}

			return $this->GenerateToken($source);
		}

		public function GenerateToken($source) {
			$key = MagratheaConfig::Instance()->GetFromDefault("jwt_key");
			$payload = array(
				"id" => $source->id,
				"name" => $source->name,
				"mail_from" => $source->mail_from,
			);
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
