export interface IObjectKeys {
  [key: string]: string|number|boolean|Date|IObjectKeys|IObjectKeys[]|null|undefined;
}

export interface iObject extends IObjectKeys {
	id?: number;
	created_at?: Date|string;
	updated_at?: Date|string;
}
