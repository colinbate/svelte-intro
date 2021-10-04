import path from 'path';

export async function get() {
	const paths = import.meta.glob(`./**/*.svx`);

	const pages = await Promise.all(
		Object.entries(paths).map(async ([file, page], index) => {
			const { metadata } = await page();
			return {
				...metadata,
				href: path.parse(file).dir.substr(1),
				index
			};
		})
	);

	return {
		status: 200,
		body: pages
	};
}
