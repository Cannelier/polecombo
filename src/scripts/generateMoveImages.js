// To generate images, run `bun generate:moveImages` at the root of the repo
import movesJson from "../../assets/datasets/moves.json" with { type: "json" };

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outputFile = path.join(__dirname, '../../assets/datasets', 'movesImageDataset.ts');
const movesImagesRequires= movesJson.map((move) =>
    `'${move.code_no}': require('${move.image_url}'),`
);

const output = `
export const movesImagesDataset = {
    ${movesImagesRequires.join('\n    ')}
};
`;


fs.writeFileSync(outputFile, output, 'utf-8');
console.log('✅ imageMap.ts generated with', movesImagesRequires.length, 'images');