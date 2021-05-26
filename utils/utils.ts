export function checkIfNightTime(weather: any): boolean {
	if (!weather?.current) return false;

	const currnetHour = new Date(weather.current.dt * 1000).getHours();
	const sunriseHour = new Date(weather.current.sunrise * 1000).getHours();
	const sunsetHour = new Date(weather.current.sunset * 1000).getHours();

	if (currnetHour < sunriseHour || currnetHour > sunsetHour) {
		return true;
	} else {
		return false;
	}
}

const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
export function extractDay(timeInMs: number) {
	return weekdays[new Date(timeInMs * 1000).getDay()];
}
