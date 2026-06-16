export interface BaseModelValidationError {
	key: string;
	error: string;
}

export interface BaseModelValidation {
	ok: boolean;
	errors?: Array<BaseModelValidationError>;
}
