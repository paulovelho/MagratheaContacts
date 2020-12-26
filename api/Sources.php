<?php

	class SourcesApi extends MagratheaApiControl {

		private $server;
		public function __construct() { 
			$this->model = new Source();
			$this->service = new SourceControl();
		}

	}

?>
