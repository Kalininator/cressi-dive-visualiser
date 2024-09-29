'use client'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import DiveGraph from "@/src/components/DiveGraph"
import { db } from "@/src/db"
import { DiveData, parseFile } from "@/src/parseFile"
import { useLiveQuery } from "dexie-react-hooks"
import { useEffect, useState } from "react"
import { toast } from "sonner"

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
  await Promise.all(diveData.ScubaDive.map(async dive => {
    db.scubaDives.add({
      ID: parseInt(dive.ID),
      ProgressiveNumber: parseInt(dive.ProgressiveNumber),
      DiveStart: dive.DiveStart,
    })
  }));
  await Promise.all(diveData.ScubaProfilePoint.map(async point => {
    db.scubaProfilePoints.add({
      ID: parseInt(point.ID),
      ID_ScubaDive: parseInt(point.ID_ScubaDive),
      ElapsedSeconds: parseInt(point.ElapsedSeconds),
      Depth: parseFloat(point.Depth),
      Temperature: parseFloat(point.Temperature),
    })
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
    <div className="grid items-center justify-items-center min-h-screen gap-8 py-8">
      <h1 className="text-4xl font-bold">Cressi Dive Visualiser</h1>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="picture">Dives File</Label>
        <Input type="file" accept=".json,application/json" onChange={onChange} />
      </div>
      {dives &&
        <Accordion type="single" collapsible className="w-full max-w-3xl">
          {dives.map(dive => {
            // const points = diveData.ScubaProfilePoint.filter(p => p.ID_ScubaDive === dive.ID);
            // const maxDepth = Math.max(...points.map(p => Number.parseFloat(p.Depth)));
            // const averageDepth = points.reduce((acc, p) => acc + Number.parseFloat(p.Depth), 0) / points.length;
            return (<AccordionItem value={dive.ID.toString()} key={dive.ID}>
              <AccordionTrigger>{dive.ID}. {dive.DiveStart}</AccordionTrigger>
              <AccordionContent>
                <DiveGraph diveID={dive.ID} />
              </AccordionContent>
            </AccordionItem>)
          })}
        </Accordion>
      }
    </div>
  );
}
