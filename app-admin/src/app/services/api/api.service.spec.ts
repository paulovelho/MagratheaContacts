import { Setup } from '@app/../tests-setup'

import { TestBed } from "@angular/core/testing";
import { MockBackend, MockConnection } from '@angular/http/testing';

import { ApiService } from "./api.service";
import { AppConfig } from "@app/app.config";

describe("Testing ApiService", () => {

  let service: ApiService;
  let backend: MockBackend;
  let token: string = "thisisthetokenyourelookingfor";
  var setup = new Setup();

  beforeEach(() => {
    setup.start();
    service = setup.provider(AppConfig);
  });

  afterEach(() => {
    backend.verifyNoPendingRequests();
  });
});
