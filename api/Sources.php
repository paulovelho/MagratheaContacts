<?php

	class SourcesApi extends AuthenticationApi {

		private $server;
		public function __construct() { 
			$this->model = new Source();
			$this->service = new SourceControl();
		}

		public function List() {
			try {
				$source = $this->Token();
				if($source->id != -1) {
					throw new MagratheaApiException("Only available for super admins", 401);
				}
				return $this->service->GetAll();
			} catch(Exception $ex) {
				throw $ex;
			}
		}

		private function CanAccess($id) {
			$source = $this->Token();
			return ($source->id == -1 || $source->id == $id);
		}

		public function Read($params=false) {
			try {
			if(!$params) return $this->List();
				$id = @$params["id"];
				if($this->CanAccess($id))
					return parent::Read($params);
				throw new MagratheaApiException("Only available for super admins", 401);
			} catch(Exception $ex) {
				throw $ex;
			}
		}

		public function Update($params=false) {
			try {
				$id = @$params["id"];
				if($this->CanAccess($id))
					return parent::Update($params);
				throw new MagratheaApiException("Only available for super admins", 401);
			} catch(Exception $ex) {
				throw $ex;
			}
		}

	}

?>
