'use client'

import { useState } from "react"

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



export default function Home() {

  const [diveCount, setDiveCount] = useState(0)

  const onChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const parsedData = await readJsonFile(event.target.files[0]) as any
      setDiveCount(parsedData.ScubaDive.length)
      console.log(parsedData)
    }
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start"></main>
      <h1 className="text-4xl font-bold">Cressi Dive Visualiser</h1>
      <h2>Dives: {diveCount}</h2>
      <input type="file" accept=".json,application/json" onChange={onChange} />
    </div>
  );
}
