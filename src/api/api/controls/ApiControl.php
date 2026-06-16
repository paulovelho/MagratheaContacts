<?php

use Magrathea2\MagratheaApiControl;
use MagratheaContacts\Email\EnumSentStatus;

class ApiControl extends MagratheaApiControl {
	public function GetStatusEnums($params) {
		return EnumSentStatus::array();
	}
}
