import { Setup } from '@app/../tests-setup'

import { Observable } from 'rxjs';

import { BaseApi } from "./base.api";

describe("Testing AppConfig", () => {

	let apiService: BaseApi;
	var setup = new Setup();

	beforeEach(() => {
		setup.addProviders(BaseApi);
		setup.start();
		apiService = setup.provider(BaseApi);
	});

	it("should return api endpoints correctly", (done) => {
		apiService.setBase("baseapi.com");

		let singleEndpoint = apiService
			.url("/users")
			.get();
		expect(singleEndpoint).toEqual("baseapi.com/users");

		let compostEndpoint = apiService
			.url("/user/:id")
			.params({ id: 42 })
			.get();
		expect(compostEndpoint).toEqual("baseapi.com/user/42");

		let compostHardEndpoint = apiService
			.url("/user/:id/reset")
			.params({ id: 23 })
			.get();
		expect(compostHardEndpoint).toEqual("baseapi.com/user/23/reset");

		let queryParamsEndpoint = apiService
			.url("/get-users")
			.queryParams({ page: 3, active: true })
			.get();
		expect(queryParamsEndpoint).toEqual("baseapi.com/get-users?page=3&active=true");

		done();
	});

});
