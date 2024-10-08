'use client'
import DiveGraph from "@/src/components/DiveGraph";
import { db } from "@/src/db";
import { useLiveQuery } from "dexie-react-hooks";

export default function Page({ params }: { params: { id: string } }) {
	const dive = useLiveQuery(() => db.scubaDives.get(parseInt(params.id)))

	if (!dive) return <div>Loading...</div>;


	return <div className="flex flex-col max-w-xl mx-auto items-center gap-4 mt-8">
		<h1 className="text-xl font-bold">Dive {dive.ProgressiveNumber} </h1>
		<p>{dive.DiveStart}</p>
		<DiveGraph diveID={dive.ID} />
	</div>
}
