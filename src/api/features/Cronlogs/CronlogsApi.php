<?php
namespace MagratheaContacts\Cronlogs;

use Magrathea2\Exceptions\MagratheaApiException;
use Magrathea2\MagratheaPagination;

class CronlogsApi extends \Magrathea2\MagratheaApiControl {
	public function __construct() {
		$this->model = get_class(new Cronlogs());
		$this->service = new CronlogsControl();
	}

	public function GetLast($params = []): MagratheaPagination {
		$query = $_GET;
		$page = (int)(@$query["page"] ?? 0);
		return $this->service->GetLastPaginated($page);
	}

	public function DeleteOlderThan($params = []): array {
		$query = $_GET;
		$before = @$query["before"] ?? null;
		if (empty($before) || strtotime($before) === false) {
			throw new MagratheaApiException("A valid 'before' date is required", 400);
		}
		$deleted = $this->service->DeleteOlderThan($before);
		return ["deleted" => $deleted];
	}

}
