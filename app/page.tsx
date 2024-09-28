'use client'

import { DiveData, parseFile } from "@/src/parseFile"
import { useEffect, useState } from "react"

const readJsonFile = (file: Blob) =>
  new Promise((resolve, reject) => {
    const fileReader = new FileReader()

    fileReader.onload = event => {
      if (event.target) {
        resolve(event.target.result as string)
      }
    }

    fileReader.onerror = error => reject(error)
    fileReader.readAsText(file)
  })



export default function Home() {

  const [diveData, setDiveData] = useState<DiveData | undefined>(undefined)

  const onChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const json = await readJsonFile(event.target.files[0]) as string;
      localStorage.setItem('diveData', json);
      setDiveData(parseFile(json))
    }
  }

  useEffect(() => {
    const json = localStorage.getItem('diveData');
    if (json != null) {
      setDiveData(parseFile(json));
    }
  })

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start"></main>
      <h1 className="text-4xl font-bold">Cressi Dive Visualiser</h1>
      {diveData &&
        <>
          <h2>Dives: {diveData.ScubaDive.length}</h2>
          <ul>
            {diveData.ScubaDive.map(dive => (
              <li key={dive.ID}>{dive.DiveStart}</li>
            ))}
          </ul>
        </>
      }
      <input type="file" accept=".json,application/json" onChange={onChange} />
    </div>
  );
}
