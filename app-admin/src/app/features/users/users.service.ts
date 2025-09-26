import { Injectable } from '@angular/core';
import { UsersApi } from './users.api';
import { iUser } from './user.interface';
import { iBet } from '../bets/bet.interface';
import { map, Observable } from 'rxjs';
import { iEnv } from '@environments/interface';
import { iRanking, iRankingDeath } from './ranking.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(
		private api: UsersApi
	) { }

	public getBets(i:any): any {
		return {
			id: +i['id'],
			year: +i['year'],
			name: i['name'],
			name_clean: i['name_clean'],
			points: +i['points'],
			death_id: +i['death_id'],
		}
	}
	public getUserFromData(i: any): iUser {
		let list = null;
		if(i['list']) {
			list = i['list'].map((i:any) => this.getBets(i));
		}
		return {
			id: +i['id'],
			name: i['name'],
			email: i['email'],
			year: i['year'],
			city: i['city'],
			state: i['state'],
			points: +i['points'],
			link: i['link'],
			created_at: i['created_at'],
			test: i['test'] || false,
			list
		};
	}

	public getRankingDeathsFromData(i: any): iRankingDeath {
		return {
			id: +i['id'],
			name: i['name'],
			points: +i['points'],
		};
	}
	public getRankingFromData(i: any): iRanking {
		let deaths = i.deaths.map((d: any) => this.getRankingDeathsFromData(d));
		return {
			id: +i['id'],
			position: +i['position'],
			points: +i['points'],
			user: i['user'],
			location: i['location'],
			sent_in: i['sent_in'],
			deaths,
		};
	}

	public getUser(userId:number): Observable<iUser> {
		return this.api.getUser(userId)
			.pipe( map(rs => this.getUserFromData(rs)) );
	}
	public deleteUser(userId:number): Observable<any> {
		return this.api.deleteTestUser(userId);
	}
	public getLists(): Observable<iUser[]> {
		return this.api.getLists()
			.pipe( map(rs => rs.map((u: any) => this.getUserFromData(u))) );
	}
	public getListsByYear(year:string|number): Observable<iUser[]> {
		return this.api.getListsByYear(year)
			.pipe( map(rs => rs.map((u: any) => this.getUserFromData(u))) );
	}
	public getRanking(): Observable<iRanking[]> {
		return this.api.getRanking()
			.pipe( map(rs => rs.map((u: any) => this.getRankingFromData(u))) );
	}
	public generateRanking(): Observable<any> {
		return this.api.generateRanking();
	}
	public cacheRanking(): Observable<any> {
		return this.api.getRanking();
	}
}
