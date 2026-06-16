export interface iStore {
	set(key: string, value: any): Promise<any>;
	get(key: string): Promise<any>;
	remove(key: string): Promise<any>;
	clean(): Promise<any> | void;

	setToken(token: string): any;
	getToken(): Promise<any | string>;
	setExpiration(expire: number): Promise<any> | void;
	isExpired(): Promise<boolean>;
}


export interface iStoreUser {
	email: string,
	name: string,
	role: number,
	roleName: string,
	id: string,
	avatar_id: string,
};

