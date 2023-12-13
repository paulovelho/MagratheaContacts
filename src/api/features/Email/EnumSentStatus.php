<?php

namespace MagratheaContacts\Email;

enum EnumSentStatus: int {
	case NotSent = 0;
	case Sent = 1;
	case Error = 2;
	case Test = 3;
	case Simulated = 4;
}

