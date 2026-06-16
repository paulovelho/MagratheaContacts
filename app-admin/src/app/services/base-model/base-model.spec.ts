
/* tslint:disable:no-unused-variable */
import { BaseRequestOptions, Response, RequestMethod, ResponseOptions, Http } from '@angular/http';

import { TestBed } from '@angular/core/testing';
import { BaseModel } from './base-model';

class newModel extends BaseModel {

  public name: string;
  public count: number;

  constructor() {
    super();
  }

  public validations: any = {
    "name": ["required"],
    "count": [function moreThanFive() {
      return this.count > 5;
    }.bind(this)]
  }
}

describe("Testing BaseModel", () => {

  beforeEach(() => {
  });

  afterEach(() => {
  });

  it("should create element with req.body", () => {
    var values = {
      name: "new object",
      count: 14
    };
    var req = {
      body: values
    };
    var model = new newModel();
    model.from(req.body);
    expect(model.name).toBe(values.name);
    expect(model.count).toBe(values.count);
  });

  it("should be valid if validations is empty", () => {
    class simpleModel extends BaseModel {
      public attr: string = "";
      constructor() {
        super();
      }
    }

    var m = new simpleModel();
    expect(m.validate()).toBeTruthy();

  });

  it("should validate model for required", () => {
    var values = {
      name: "",
      count: 7
    };
    var model = new newModel().from(values);
    let valid = model.validate();
    expect(valid.ok).not.toBeUndefined();
    expect(valid.errors).not.toBeUndefined();
    expect(valid.ok).toBeFalsy();
    let error = valid.errors[0];
    expect(error.key).toBe("name");
    expect(error.error).toBe("required");
    model.name = "valid name";
    valid = model.validate();
    expect(valid.ok).toBeTruthy();
  });

  it("should validate model for custom function", () => {
    var values = {
      name: "object ok",
      count: 2
    };
    var model = new newModel().from(values);
    let valid = model.validate();
    expect(valid.ok).toBeFalsy();
    let error = valid.errors[0];
    expect(error.key).toBe("count");
    expect(error.error).toBe("moreThanFive");
    model.count = 7;
    valid = model.validate();
    expect(valid.ok).toBeTruthy();
  });

});
