
export class Helper {

	public static RandomString(size:number=20): string {
		let outString: string = '';
		let inOptions: string = 'abcdefghijklmnopqrstuvwxyz0123456789';
		for (let i = 0; i < size; i++) {
			outString += inOptions.charAt(Math.floor(Math.random() * inOptions.length));
		}
		return outString;
	}

	public static formatBytes(bytes: number, decimals = 2) {
		if (!+bytes) return '0 Bytes'
		const k = 1024
		const dm = decimals < 0 ? 0 : decimals
		const sizes = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
		const i = Math.floor(Math.log(bytes) / Math.log(k))
		return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
	}
}
