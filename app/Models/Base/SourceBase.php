<?php

## FILE GENERATED BY MAGRATHEA.
## SHOULD NOT BE CHANGED MANUALLY

class SourceBase extends MagratheaModel implements iMagratheaModel {

	public $id, $name, $mail_from, $sec_hash;
	public $created_at, $updated_at;
	protected $autoload = null;

	public function __construct(  $id=0  ){ 
		$this->Start();
		if( !empty($id) ){
			$pk = $this->dbPk;
			$this->$pk = $id;
			$this->GetById($id);
		}
	}
	public function Start(){
		$this->dbTable = "source";
		$this->dbPk = "id";
		$this->dbValues["id"] = "int";
		$this->dbValues["name"] = "string";
		$this->dbValues["mail_from"] = "string";
		$this->dbValues["sec_hash"] = "string";
		$this->dbAlias["from"] = "mail_from";

		$this->dbAlias["created_at"] =  "datetime";
		$this->dbAlias["updated_at"] =  "datetime";
	}

	// >>> relations:

}

class SourceControlBase extends MagratheaModelControl {
	protected static $modelName = "Source";
	protected static $dbTable = "source";
}
?>