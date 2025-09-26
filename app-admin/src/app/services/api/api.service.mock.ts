import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class ApiServiceMock {

  constructor(
  ) {}

  public data: any = [];

  private apiResponse: Observable<any> = Observable.create(observer => {
    observer.next(this.data);
    observer.complete();
  });

  public getApi(key: string, params?: any): Observable<any | null> {
    return this.apiResponse;
  }

  public postApi(key: string, payload: any): Observable<any | null> {
    return this.apiResponse;
  }

  public putApi(key: string, payload: any): Observable<any | null> {
    return this.apiResponse;
  }

  public deleteApi(key: string): Observable<any | null> {
    return this.apiResponse;
  }
}
