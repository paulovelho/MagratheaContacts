import { Injectable, EventEmitter } from '@angular/core'

// STATES:
// - filter-updated
// - filter-refresh

@Injectable({
	providedIn: 'root',
})
export class AppState {

	private debugOn: boolean = true;

	private _states: any = {};
	private _events: any = {};

	constructor() {
		console.info("state created");
	}

	private debug(str: string, data?: any): void {
		if (!this.debugOn) return;
		console.info('app.state: ' + str, data);
	}

	public toggle(event: string): void {
		if (!this._states[event]) {
			this._states[event] = true;
		} else {
			this._states[event] = !this._states[event];
		}
		this.emit(event, this._states[event]);
	}

	public emit(event: string, value: any): void {
		this.createState(event);
		this._states[event] = value;
		if (this._events[event]) {
			this.debug('emitting to ' + event, value);
			(<EventEmitter<any>>this._events[event]).emit(value);
		}
	}

	public subscribe(event: string, callback: Function, defaultValue?: any): void {
		this.debug('subscribing to ' + event);
		if (!this.createState(event, defaultValue)) {
			if (this._states[event]) callback(this._states[event]);
		}
		this._events[event].subscribe(callback);
		if (defaultValue) {
			this.emit(event, defaultValue);
		}
	}

	public createState(event: string, defaultValue?: any) {
		if (!this._events[event]) {
			this.debug('creating event ' + event);
			this._events[event] = new EventEmitter<any>();
			this._states[event] = defaultValue;
			return true;
		}
		return false;
	}

	public getEvents() {
		return this._events;
	}
	public getEvent(evt: string): EventEmitter<any> {
		if (!this._events[evt]) this.createState(evt, null);
		return this._events[evt];
	}
	public getState(event: string): any {
		return this._states[event];
	}
	public getStates() {
		return this._states;
	}


}
