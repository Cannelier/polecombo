import { PrismaClient } from '@prisma/client';
import moves from '../assets/datasets/moves.json';

const prisma = new PrismaClient()

async function seedMoves() {
    console.log("Moves loaded:", moves.length);
    console.log("First move:", moves[0]);
    for (const move of moves) {
        await prisma.move.create({
            data: {
                code_no: move.code_no,
                name: move.name,
                image_url: move.image_url,
                tech_value: move.tech_value
            }
        })
    }
    console.log("🚀 Moves created");
}


async function seedCombos() {
    await prisma.combo.createMany({
        data: [
            { name: "Static spin - Beginner class" },
            { name: "Spinning - Inter class" },
            { name: "Choregraphy - IPSF" },
        ]
    })

    console.log("🚀 Combos created");
}


async function seedComboMoves() {
    await prisma.comboMove.createMany({
        data: [
            { comboId: 1, moveId: 1, rank: 1 },
            { comboId: 1, moveId: 2, rank: 2 },
            { comboId: 1, moveId: 3, rank: 3 },
            { comboId: 2, moveId: 7, rank: 1 },
            { comboId: 2, moveId: 4, rank: 2 },
            { comboId: 2, moveId: 6, rank: 3 },
            { comboId: 2, moveId: 8, rank: 3 },
            { comboId: 3, moveId: 10, rank: 1 },
        ]
    })

    console.log("🔗 Combos and moves linked");
}



async function main() {
    await seedMoves()
    await seedCombos()
    await seedComboMoves()
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })