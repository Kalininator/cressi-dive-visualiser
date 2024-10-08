'use client'

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { db } from "@/src/db"
import { DiveData, parseFile } from "@/src/parseFile"
import { useLiveQuery } from "dexie-react-hooks"
import { toast } from "sonner"
import FileGuide from "../src/components/FileGuide"
import Link from "next/link"

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

async function saveDivesToDb(diveData: DiveData) {
  await db.scubaDives.clear();
  await db.scubaDives.bulkAdd(diveData.ScubaDive.map(dive => {
    return {
      ID: parseInt(dive.ID),
      ProgressiveNumber: parseInt(dive.ProgressiveNumber),
      DiveStart: dive.DiveStart,
    }
  }))
  await db.scubaProfilePoints.clear();
  await db.scubaProfilePoints.bulkAdd(diveData.ScubaProfilePoint.map(point => {
    return {
      ID: parseInt(point.ID),
      ID_ScubaDive: parseInt(point.ID_ScubaDive),
      ElapsedSeconds: parseInt(point.ElapsedSeconds),
      Depth: parseFloat(point.Depth),
      Temperature: parseFloat(point.Temperature),
    }
  }));
  return;
}


export default function Home() {

  const dives = useLiveQuery(() => db.scubaDives.toArray());

  const onChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const json = await readJsonFile(event.target.files[0]) as string;
      await saveDivesToDb(parseFile(json));
      toast("Loaded dive data from file");
    }
  }

  return (
    <div className="grid items-center justify-items-center gap-8 py-8 max-w-xl mx-auto">
      <h1 className="text-4xl font-bold">Cressi Dive Visualiser</h1>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="picture">Dives File</Label>
        <Input type="file" accept=".json,application/json" onChange={onChange} />
      </div>
      {(dives && dives.length) ?
        <ul className="w-full gap-4 flex flex-col items-start">
          {dives.toReversed().map(dive => (
            <li key={dive.ID}>
              <Link href={`/dive/${dive.ID}`}>Dive {dive.ProgressiveNumber} - {dive.DiveStart}</Link>
            </li>
          ))}
        </ul> : <FileGuide />
      }
    </div>
  );
}
