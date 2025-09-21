export interface IObjectKeys {
  [key: string]: string|number|boolean|Date|null|undefined|IObjectKeys[]|string[]|number[];
}

export interface iObject extends IObjectKeys {
	id: string;
	created_at?: Date|string;
	updated_at?: Date|string;
}
