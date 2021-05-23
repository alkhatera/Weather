export type WeatherCondition = {
	color: string;
	title: string;
	subtitle: string;
	icon: string;
};

export enum Weather {
	Rain,
	Clear,
	Thunderstorm,
	Clouds,
	Snow,
	Drizzle,
	Haze,
	Mist,
}

export const weatherConditions: { [weatherName: string]: WeatherCondition } = {
	Rain: {
		color: '#005BEA',
		title: 'Raining',
		subtitle: 'Get a cup of coffee',
		icon: 'weather-rainy',
	},
	Clear: {
		color: '#f7b733',
		title: 'So Sunny',
		subtitle: 'It is hurting my eyes',
		icon: 'weather-sunny',
	},
	Thunderstorm: {
		color: '#616161',
		title: 'A storm is coming',
		subtitle: 'Because Atletico won the league',
		icon: 'weather-lightning',
	},
	Clouds: {
		color: '#1F1C2C',
		title: 'Clouds',
		subtitle: 'Everywhere',
		icon: 'weather-cloudy',
	},
	Snow: {
		color: '#00d2ff',
		title: 'Snow',
		subtitle: 'Build a snowman',
		icon: 'weather-snowy',
	},
	Drizzle: {
		color: '#076585',
		title: 'Drizzle',
		subtitle: 'Partially raining',
		icon: 'weather-hail',
	},
	Haze: {
		color: '#66A6FF',
		title: 'Haze',
		subtitle: 'Another name for partially raining',
		icon: 'weather-hail',
	},
	Mist: {
		color: '#3CD3AD',
		title: 'Mist',
		subtitle: "Don't roam in the forests!",
		icon: 'weather-fog',
	},
};
