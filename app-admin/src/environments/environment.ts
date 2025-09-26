import { iEnv } from "./interface";

export const environment: iEnv = {
	envName: "dev",
	dev: true,
	production: false,
	debug: false,
	// api: "https://dev.api.bolaopenacova.com",
	api: "http://localhost.com:8080",
	analytics_api: "http://localhost.com:8081",
	title: "Bolão Pé na Cova 3.0",
	web: "https://localhost:4200",
};
