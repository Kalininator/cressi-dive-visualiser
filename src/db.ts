import Dexie, { type EntityTable } from 'dexie';

interface ScubaDive {
	ID: number; // This prop will be used as primary key (see below)
	ProgressiveNumber: number;
	DiveStart: string;
}

interface ScubaProfilePoint {
	ID: number;
	ID_ScubaDive: number;
	Depth: number;
	Temperature: number;
	ElapsedSeconds: number;
}

const db = new Dexie('DiveDatabase') as Dexie & {
	scubaDives: EntityTable<ScubaDive, 'ID'>,
	scubaProfilePoints: EntityTable<ScubaProfilePoint, 'ID'>
};

// Schema declaration:
db.version(1).stores({
	scubaDives: 'ID', // primary key "id" (for the runtime!)
	scubaProfilePoints: 'ID,ID_ScubaDive' // primary key "id" (for the runtime!)
});

export type { ScubaDive, ScubaProfilePoint }
export { db };
