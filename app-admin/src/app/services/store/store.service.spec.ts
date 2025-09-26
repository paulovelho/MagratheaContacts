import { Setup } from '@app/../tests-setup'

import { Observable } from "rxjs/Rx";

import { Store } from "./store.service";

describe("Testing StoreService", () => {

  let service: Store;
  var setup = new Setup();

  beforeEach(() => {
    setup.start();
    this.service = setup.provider(Store);
  });

});
