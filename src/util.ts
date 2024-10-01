export function secondsToTime(seconds: number): string {
	const hours = Math.floor(seconds / 3600);
	const minutes = Math.floor(seconds / 60) % 60;
	return [hours, minutes]
		.map(v => v < 10 ? "0" + v : v)
		.join(":");
}
