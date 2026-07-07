<?php
namespace MagratheaContacts\Mailpromises;

use Magrathea2\Exceptions\MagratheaApiException;
use Magrathea2\Exceptions\MagratheaModelException;
use Magrathea2\Logger;
use MagratheaContacts\Apikey\Apikey;
use MagratheaContacts\Apikey\ApikeyControl;
use MagratheaContacts\Cronlogs\CronLog;

/**
 * @property MailpromisesControl $service
 */
class MailpromisesApi extends \Magrathea2\MagratheaApiControl {
	public function __construct() {
		$this->model = get_class(new Mailpromises());
		$this->service = new MailpromisesControl();
	}

	private function ValidateKey(string|null $k): Apikey {
		$keyControl = new ApikeyControl();
		try {
			return $keyControl->ValidateKey($k);
		} catch(MagratheaModelException $modelEx) {
			throw new MagratheaApiException($modelEx->getMessage(), false, 400);
		}
	}

	/**
	 * Renders a batch of pending promises into mail rows.
	 * Optional body params: key (validation only), limit (batch size, capped)
	 */
	public function ProcessPromises($params) {
		$log = CronLog::Instance();
		$log->Add("Processing promises");
		$data = $this->GetPost();
		if(@$params["key"]) $k = $params["key"];
		else $k = @$data["key"];

		try {
			if($k) {
				$this->ValidateKey($k);
			}
			if(!$this->service->IsOn()) {
				Logger::Instance()->Log("Promise processing is not active!");
				$log->Result("Promise processing is not active!");
				throw new MagratheaApiException("service is off");
			}
			$limit = intval(@$data["limit"] ?? MailpromisesControl::DEFAULT_BATCH);
			$rs = $this->service->ProcessBatch($limit);
			if($rs["processed"] == 0) {
				$log->Result("no promise to process");
			} else {
				$log->Result("promises processed: ".$rs["processed"]);
			}
			$log->Done();
			return $rs;
		} catch(\Exception $ex) {
			throw $ex;
		}
	}

	public function GetBySource($params) {
		$source = intval($params["source"]);
		return $this->service->GetFromSource($source);
	}

	public function GetByTemplate($params) {
		$template = intval($params["template"]);
		return $this->service->GetFromTemplate($template);
	}

}
