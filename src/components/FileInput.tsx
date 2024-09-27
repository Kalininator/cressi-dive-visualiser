'use client'
const readJsonFile = (file: Blob) =>
	new Promise((resolve, reject) => {
		const fileReader = new FileReader()

		fileReader.onload = event => {
			if (event.target) {
				resolve(JSON.parse(event.target.result as string))
			}
		}

		fileReader.onerror = error => reject(error)
		fileReader.readAsText(file)
	})

const FileInput = () => {
	const onChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files) {
			const parsedData = await readJsonFile(event.target.files[0])
			console.log(parsedData)
		}
	}

	return (
		<input type="file" accept=".json,application/json" onChange={onChange} />
	)
}

export default FileInput
