// To generate images, run `bun generate:renameImages` at the root of the repo
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import movesJson from "../../assets/datasets/posa/strength.json" with { type: "json" };
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


movesJson.map((move, index) => {
    const num = index + 1 < 10 ? `00${String(index + 1)}` : index + 1 < 100 ? `0${String(index + 1)}` : String(index + 1);
    const oldFilePath = join(__dirname, `../../assets/images/moves/posa/strength/strength_move_${num}.png`);
    const newFilePath = join(__dirname, `../../assets/images/moves/posa/strength/${move.name.toLowerCase().replace(/\s+/g, '_').replace(/[()[\]{}]/g, '')}.png`);
    console.log(`Replace ${oldFilePath.replace('../../assets/images/moves/posa/', '')}`);
    console.log(`with ${newFilePath.replace('../../assets/images/moves/posa/', '')}`);

    fs.rename(oldFilePath, newFilePath, (err) => {
    if (err) throw err;
    console.log('File renamed successfully!');
    });
})
