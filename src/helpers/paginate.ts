// @ts-nocheck
export default function paginate({ perPage, total }) {
	const totalPages = Math.ceil(total / perPage);
	const arr = Array(total)
		.fill(0)
		.map(({}, index) => index + 1);

	const pagesAsArray = [];

	for (let i = 0; i < arr.length; i += perPage) {
		pagesAsArray.push(arr.slice(i, i + perPage));
	}

	return { pagesAsArray, totalPages };
}

/*
  не копипаста, для памятку оставил
  const res = paginate({
    perPage: 3,
    total: 10,
  }); ->
  [
   [ 1, 2, 3 ],
   [ 4, 5, 6 ],
   [ 7, 8, 9 ],
   [ 10 ]
  ]
 */
