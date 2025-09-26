import { Injectable, Output, EventEmitter } from "@angular/core";

import { iStore, iStoreUser } from './store.interface';

@Injectable()
export class Store implements iStore {

  @Output() newLogin = new EventEmitter<any>();
  private debug: boolean = false;

  constructor(
  ) {
    this.init();
  }

  private init(): void {
    this.loadUserFromStorage();
  }

  private debugStore(msg: string, data?: any) {
    if(!this.debug) return;
    console.info(msg, data);
  }

  public getType(data: any): string {
    return typeof(data);
  }

  public async set(key: string, value: any): Promise<any> {
    let type = this.getType(value);
    value = (type == 'string' ? value : JSON.stringify(value));
    let data = {
      type, value,
      time: Math.floor(Date.now() / 1000),
    }
    this.debugStore('store-set ['+key+']', data);
    return localStorage.setItem(key, JSON.stringify(data));
  }
  public async get(key: string): Promise<any> {
    let data: any = localStorage.getItem(key);
    data = JSON.parse(data);
    if(!data) return null;
    let value;
    if(data.type == "object") {
      value = JSON.parse(data.value);
    } else {
      value = data.value;
    }
    this.debugStore('store-get ['+key+']', value);
    return value || null;
  }
  public async remove(key: string): Promise<any> {
    this.debugStore('store-remove ['+key+']');
    return localStorage.removeItem(key);
  }
  public clean(): void {
    this.debugStore('store-clean');
    this.user = null;
    localStorage.clear();
  }

  public setToken(token: string): void {
    this.set("token", token);
  }
  public async getToken(): Promise<string> {
    return this.get("token");
  }

  public setExpiration(expire: number): void {
    this.set("expires", expire.toString());
  }
  public async isExpired(): Promise<boolean> {
    var ts = Math. round((new Date()). getTime() / 1000);
    let expires = await this.get("expires");
    if(!expires) return false;
    return (+expires <= ts);
  }

  /* USER STORE */
  private user: iStoreUser|null = null;
  public async loadUserFromStorage(): Promise<iStoreUser|null> {
    let localUser = await this.get("user");
    if(!localUser || localUser == "undefined") return null;
    this.user = localUser;
		return localUser;
  }
  private saveUserInStorage(user: iStoreUser): void {
    this.set("user", user);
    this.newLogin.emit(user);
  }
  public setLoggedUser(user: iStoreUser): void {
    this.user = user;
    this.saveUserInStorage(user);
  }
  public async getLoggedUser(): Promise<iStoreUser | null> {
    if (this.user == null) {
			return await this.loadUserFromStorage();
		}
		return this.user;
  }
  public async isLogged(): Promise<boolean> {
    let user = await this.getLoggedUser();
		if(user == null) return false;
    let token = await this.getToken();
    if(!user || !token) return false;
    return (user.email != null);
  }

}
