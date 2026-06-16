import { Setup } from '@app/../tests-setup'

import { Observable } from "rxjs/Rx";

import { Helper } from "./helper.service";

describe("Testing Helper", () => {

	let service: Helper;
	var setup = new Setup();

	beforeEach(() => {
		setup.addProviders(Helper).start();
		service = setup.provider(Helper);
	});

	it('should generate random string', () => {
		let str = service.RandomString();
		expect(str.length).toBeGreaterThan(0);
		let str2 = service.RandomString(10);
		expect(str2.length).toEqual(10);
	});

});
