import { from } from "rxjs";
import { filter, map, mergeMap, toArray } from "rxjs/operators";

let persons = [
	{ id: 1, name: "Jan Kowalski" },
	{ id: 2, name: "John Doe" },
	{ id: 3, name: "Jarek Kaczka" },
];

let ages = [
	{ person: 1, age: 18 },
	{ person: 2, age: 24 },
	{ person: 3, age: 666 },
];

let locations = [
	{ person: 1, country: "Poland" },
	{ person: 3, country: "Poland" },
	{ person: 1, country: "USA" },
];

from(locations)
	.pipe(
		filter((location) => location.country === "Poland"),
		map((location) => location.person),
		toArray(),
		map((persons) => Array.from(new Set(persons))),
		mergeMap((uniquePersons) =>
			from(ages).pipe(
				filter((age) => uniquePersons.includes(age.person)),
				map((age) => age.age),
				toArray(),
				map((ages) => {
					if (ages.length === 0) return 0;
					return ages.reduce((acc, age) => acc + age, 0) / ages.length;
				})
			)
		)
	)
	.subscribe((avgAge) => {
		console.log(`Average age of people living in Poland: ${avgAge}`);
	});
