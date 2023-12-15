<?php
## FILE GENERATED BY MAGRATHEA.
## This file was automatically generated and changes can be overwritten through the admin
## -- date of creation: [2023-12-04 05:15:41]

namespace MagratheaContacts\Smtp\Base;

use Magrathea2\iMagratheaModel;
use Magrathea2\MagratheaModel;

class SmtpBase extends MagratheaModel implements iMagratheaModel {

	public $id, $description, $host, $port, $user, $password, $tls_encrypt;
	public $created_at, $updated_at;
	protected $autoload = null;

	public function __construct(  $id=0  ){ 
		$this->MagratheaStart();
		if( !empty($id) ){
			$pk = $this->dbPk;
			$this->$pk = $id;
			$this->GetById($id);
		}
	}
	public function MagratheaStart(){
		$this->dbTable = "smtp";
		$this->dbPk = "id";
		$this->dbValues["id"] = "int";
		$this->dbValues["description"] = "string";
		$this->dbValues["host"] = "string";
		$this->dbValues["port"] = "string";
		$this->dbValues["user"] = "string";
		$this->dbValues["password"] = "string";
		$this->dbValues["tls_encrypt"] = "boolean";
		$this->dbValues["created_at"] =  "datetime";
		$this->dbValues["updated_at"] =  "datetime";

		$this->relations["properties"]["Sources"] = null;
		$this->relations["methods"]["Sources"] = "GetSources";
		$this->relations["lazyload"]["Sources"] = "true";

	}

	public function GetControl() {
		return new \MagratheaContacts\Smtp\Base\SmtpControlBase();
	}

	// >>> relations:
	public function GetSources(){
		if($this->relations["properties"]["Sources"] != null) return $this->relations["properties"]["Sources"];
		$pk = $this->dbPk;
		$this->relations["properties"]["Sources"] = \MagratheaContacts\Source\Base\SourceControlBase::GetWhere(array("smtp_id" => $this->$pk));
		return $this->relations["properties"]["Sources"];
	}

}