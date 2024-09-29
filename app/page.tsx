'use client'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import DiveGraph from "@/src/components/DiveGraph"
import { DiveData, parseFile } from "@/src/parseFile"
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



export default function Home() {

  const [diveData, setDiveData] = useState<DiveData | undefined>(undefined)

  const onChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const json = await readJsonFile(event.target.files[0]) as string;
      const textEncoder = new TextEncoder();
      if (textEncoder.encode(json).length < 5000000) {
        localStorage.setItem('diveData', json);
      }
      setDiveData(parseFile(json))
      toast("Loaded dive data from file");
    }
  }

  useEffect(() => {
    const json = localStorage.getItem('diveData');
    if (json != null) {
      setDiveData(parseFile(json));
      toast("Loaded dive data from local storage");
    }
  }, [])

  return (
    <div className="grid items-center justify-items-center min-h-screen gap-8 py-8">
      <h1 className="text-4xl font-bold">Cressi Dive Visualiser</h1>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="picture">Dives File</Label>
        <Input type="file" accept=".json,application/json" onChange={onChange} />
      </div>
      {diveData &&
        <Accordion type="single" collapsible className="w-full max-w-3xl">
          {diveData.ScubaDive.map(dive => {
            const points = diveData.ScubaProfilePoint.filter(p => p.ID_ScubaDive === dive.ID);
            const maxDepth = Math.max(...points.map(p => Number.parseFloat(p.Depth)));
            const averageDepth = points.reduce((acc, p) => acc + Number.parseFloat(p.Depth), 0) / points.length;
            return (<AccordionItem value={dive.ID} key={dive.ID}>
              <AccordionTrigger>{dive.ID}. {dive.DiveStart} - {(parseInt(dive.TotalElapsedSeconds) / 60).toFixed(0)} mins</AccordionTrigger>
              <AccordionContent>
                Dive Time: {Math.round(Number.parseInt(dive.TotalElapsedSeconds) / 60)} minutes<br />
                Max Depth: {maxDepth}m<br />
                Average Depth: {averageDepth.toFixed(1)}m<br />
                <DiveGraph diveData={diveData} diveID={dive.ID} />
              </AccordionContent>
            </AccordionItem>)
          })}
        </Accordion>
      }
    </div>
  );
}
