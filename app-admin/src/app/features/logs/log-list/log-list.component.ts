import { Component, OnInit } from '@angular/core';
import { LogsService } from '../logs.service';
import { LogsApi } from '../logs.api';
import { SharedModule } from '@app/shared/shared.module';
import { iLog } from '../logs.interface';

import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-log-list',
  standalone: true,
  imports: [ SharedModule, TableModule, ],
	providers: [ LogsService, LogsApi ],
  templateUrl: './log-list.component.html',
  styleUrl: './log-list.component.scss'
})
export class LogListComponent implements OnInit {
	public loading: boolean = false;
	public showLoadMore: boolean = false;
	public nextPage = 0;
	public logs: iLog[] = [];

	constructor(
		private service: LogsService,
	) { }

	ngOnInit(): void {
		this.loadLogs();
	}

	private loadLogs() {
		this.loading = true;
		this.service.getLogs(this.nextPage)
			.subscribe((rs) => {
				this.showLoadMore = rs.has_more;
				this.nextPage++;
				this.logs = this.logs.concat(rs.data);
				this.loading = false;
			});
	}

	public loadMore() {
		this.showLoadMore = false;
		this.loadLogs();
	}

	rowClick(data: any): void {
		console.info("clicked ", data);
	}

}
