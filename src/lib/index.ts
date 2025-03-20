// place files you want to import through the `$lib` alias in this folder.
export function isValidImage(file: File) {
	return ['image/png', 'image/jpeg', 'image/gif'].includes(file.type);
}
