import Image from 'next/image'
import backupButton from './cressi-backup-button.png';

const FileGuide = () => {
	return <div className="max-w-xl">
		<h1 className="font-bold text-xl">Loading your data</h1>
		This tool uses the data exported from the Cressi UCI desktop software.
		To export your data, open the Cressi UCI software and click the "Backup" button.
		<Image src={backupButton} alt="Cressi Backup Button" className="w-30" />
	</div >;
}

export default FileGuide;
