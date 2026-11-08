import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ConfirmationService } from 'primeng/api';
import { ConfirmPopupModule } from 'primeng/confirmpopup';

import { SharedModule } from '@app/shared/shared.module';
import { ErrorHandler } from '@app/services/error-handler/error-handler.service';
import { Toaster } from '@app/services/toaster/toaster.service';

import { CronlogsApi } from '../cronlogs.api';
import { CronlogsService } from '../cronlogs.service';
import { iCronLog } from '../cronlogs.interface';

@Component({
	selector: 'app-cronlogs-home',
	imports: [
		SharedModule,
		TableModule,
		ConfirmPopupModule,
	],
	providers: [
		CronlogsApi,
		CronlogsService,
		ConfirmationService,
	],
	templateUrl: './cronlogs-home.component.html',
	styleUrl: './cronlogs-home.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CronlogsHomeComponent implements OnInit {
	private service = inject(CronlogsService);
	private errorManager = inject(ErrorHandler);
	private toaster = inject(Toaster);
	private confirmationService = inject(ConfirmationService);

	public logs = signal<iCronLog[]>([]);
	public loading = signal<boolean>(false);
	public deleting = signal<boolean>(false);
	public hasMore = signal<boolean>(false);
	public beforeDate = signal<string>(this.defaultBeforeDate());

	private page = 0;

	ngOnInit(): void {
		this.loadLogs();
	}

	public loadLogs(): void {
		this.page = 0;
		this.loading.set(true);
		this.service.getLogs(this.page).subscribe({
			next: (rs) => {
				this.logs.set(rs.items);
				this.hasMore.set(rs.hasMore);
				this.loading.set(false);
			},
			error: (err) => {
				this.loading.set(false);
				this.errorManager.exception(err);
			},
		});
	}

	public loadMore(): void {
		this.loading.set(true);
		this.service.getLogs(this.page + 1).subscribe({
			next: (rs) => {
				this.page = rs.page;
				this.logs.update(list => [...list, ...rs.items]);
				this.hasMore.set(rs.hasMore);
				this.loading.set(false);
			},
			error: (err) => {
				this.loading.set(false);
				this.errorManager.exception(err);
			},
		});
	}

	public onBeforeDateChange(value: any): void {
		this.beforeDate.set(value);
	}

	public statusType(log: iCronLog): "success" | "danger" | "warn" | "secondary" {
		switch (log.status) {
			case "done": return "success";
			case "error": return "danger";
			case "running": return "warn";
			default: return "secondary";
		}
	}

	public confirmDelete(event: Event): void {
		if (!this.beforeDate()) return;
		this.confirmationService.confirm({
			target: event.target as EventTarget,
			message: `Delete all logs before ${this.beforeDate()}?`,
			accept: () => this.deleteOlderThan(),
		});
	}

	private deleteOlderThan(): void {
		this.deleting.set(true);
		this.service.deleteOlderThan(this.beforeDate()).subscribe({
			next: (rs) => {
				this.deleting.set(false);
				this.toaster.success(`${rs.deleted} log(s) deleted.`);
				this.loadLogs();
			},
			error: (err) => {
				this.deleting.set(false);
				this.errorManager.exception(err);
			},
		});
	}

	private defaultBeforeDate(): string {
		const d = new Date();
		d.setDate(d.getDate() - 7);
		const pad = (n: number) => String(n).padStart(2, "0");
		return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
	}
}
