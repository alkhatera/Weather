import firebase from 'firebase';
import { City } from './Cities';

export async function fetchFavoriteCities(userId: string): Promise<City[]> {
	if (!userId) return [];

	try {
		const snapshot = await firebase
			.database()
			.ref('users/' + userId + '/favoriteCities')
			.get();

		if (snapshot.exists()) return snapshot.val();
		else return [];
	} catch (error) {
		throw error;
	}
}

export async function saveFavoriteCities(userId: string, cities: City[]): Promise<boolean> {
	if (!userId) return false;

	try {
		await firebase
			.database()
			.ref('users/' + userId + '/favoriteCities')
			.set([...cities]);

		return true;
	} catch (error) {
		return false;
	}
}
