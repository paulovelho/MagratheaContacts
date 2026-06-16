<?php
namespace MagratheaContacts\Cronlogs;

use Magrathea2\Singleton;

use function Magrathea2\now;

class CronLog extends Singleton {

	protected array $data = [];
	protected Cronlogs $log;

	public function Initialize(){
		$this->log = new Cronlogs();
	}

	public function Start(): CronLog {
		$this->log = new Cronlogs();
		$this->log->timestart = now();
		$this->log->status = "running";
		$this->data = [];
		return $this;
	}

	public function Add($l): CronLog {
		array_push($this->data, $l);
		return $this;
	}

	public function Result(string $rs): CronLog {
		$this->log->result = $rs;
		return $this->Add($rs);
	}

	public function Error(
		string $result,
		string $data,
	): CronLog {
		$this->Add($data);
		$this->log->status = "error";
		$this->log->result = $result;
		return $this;
	}

	public function End(): CronLog {
		$this->log->status = "done";
		$this->log->timeend = now();
		return $this;
	}

	public function Done() {
		$this->End()->Save();		
	}

	public function Save() {
		$this->log->log = json_encode($this->data);
		$this->log->Insert();
		return $this->log;
	}

}
