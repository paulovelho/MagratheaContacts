<?php

namespace MagratheaContacts\Email;

enum EnumSentStatus: int {
	use \Magrathea2\Magrathea_Enum;
	case NotProcessed = 0;
	case Sent = 1;
	case Error = 2;
	case Test = 3;
	case Simulated = 4;
	case Aborted = 5;
}

