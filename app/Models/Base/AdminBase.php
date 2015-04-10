<?php

## FILE GENERATED BY MAGRATHEA.
## SHOULD NOT BE CHANGED MANUALLY

class AdminBase extends MagratheaModel implements iMagratheaModel {

        public $id, $email, $password;
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
                $this->dbTable = "admin";
                $this->dbPk = "id";
                $this->dbValues["id"] = "int";
                $this->dbValues["email"] = "string";
                $this->dbValues["password"] = "string";


                $this->dbAlias["created_at"] =  "datetime";
                $this->dbAlias["updated_at"] =  "datetime";
        }

        // >>> relations:

}

class AdminControlBase extends MagratheaModelControl {
        protected static $modelName = "Admin";
        protected static $dbTable = "admin";
}
?>