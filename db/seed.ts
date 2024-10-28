import { Clients, db } from 'astro:db';

// https://astro.build/db/seed
export default async function seed() {
	
	await db.insert(Clients).values([
		{ id: 1, name: "Kasim", age: 35, isActive: true },
		{ id: 2, name: "Fernando", age: 25, isActive: true },
		{ id: 3, name: "Carlos", age: 17, isActive: true },
		{ id: 4, name: "Melissa", age: 9, isActive: true },
		{ id: 5, name: "Eminem", age: 61, isActive: true },
	  ]);

	console.log('Seed executed!');
}