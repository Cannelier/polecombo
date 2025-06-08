// To convert name to names, run `bun generate:moveNameToNames` at the root of the repo
import fs from 'fs';
import staticMovesJson from "../../assets/datasets/posa/static.json" with { type: "json" };
import strengthMovesJson from "../../assets/datasets/posa/strength.json" with { type: "json" };


const newStrengthMovesJson = strengthMovesJson.map((move) => {
    return (
        {
            posaCode: move.posaCode,
            names: [move.name],
            imageUrl: move.imageUrl,
            posaTechValue: move.posaTechValue,
         }
    );
})

fs.writeFileSync('newStrength.json', JSON.stringify(newStrengthMovesJson, null, 2), 'utf-8');
console.log('✅ Transformed file saved as newStrength.json');



const newStaticMovesJson = staticMovesJson.map((move) => {
    return (
        {
            posaCode: move.posaCode,
            names: [move.name],
            imageUrl: move.imageUrl,
            posaTechValue: move.posaTechValue,
         }
    );
})

fs.writeFileSync('newStatic.json', JSON.stringify(newStaticMovesJson, null, 2), 'utf-8');
console.log('✅ Transformed file saved as newStatic.json');

