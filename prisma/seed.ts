import posaStaticMoves from '@/assets/datasets/posa/static.json';
import posaStrengthMoves from '@/assets/datasets/posa/strength.json';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

async function seedMoves() {
    // POSA Static moves
    console.log("🗿 POSA Static Moves loaded:", posaStaticMoves.length);
    for (const move of posaStaticMoves) {
        const moveWithSamePosaCode = await prisma.move.findFirst({
            where: {
                posaCode: move.posaCode
            }
        })
        if (moveWithSamePosaCode) {
            console.log(`❌ Move ${move.posaCode} already exists: skipping...`)
            continue
        }

        await prisma.move.create({
            data: {
                names: move.names,
                namesSearch: move.names.join(" "),
                posaCode: move.posaCode,
                imageUrl: move.imageUrl,
                posaTechValue: move.posaTechValue,
                styles: ['STATIC', 'STATICSPIN']
            }
        })
    }
    console.log("🚀 Static Moves created");
    

    // POSA Strength moves
    console.log("💪 POSA Strength Moves loaded:", posaStrengthMoves.length);
    for (const move of posaStrengthMoves) {
        const moveWithSamePosaCode = await prisma.move.findFirst({
            where: {
                posaCode: move.posaCode
            }
        })
        if (moveWithSamePosaCode) {
            console.log(`❌ Move ${move.posaCode} already exists: skipping...`)
            continue
        }

        await prisma.move.create({
            data: {
                names: move.names,
                namesSearch: move.names.join(" "),
                posaCode: move.posaCode,
                imageUrl: move.imageUrl,
                posaTechValue: move.posaTechValue,
                styles: ['STRENGTH', 'STATIC', 'SPIN']
            }
        })
    }
    console.log("🚀 Strength Moves created");
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
            { comboId: 1, moveId: 1, rank: 0 },
            { comboId: 1, moveId: 2, rank: 1 },
            { comboId: 1, moveId: 3, rank: 2 },
            { comboId: 2, moveId: 7, rank: 0 },
            { comboId: 2, moveId: 4, rank: 1 },
            { comboId: 2, moveId: 6, rank: 2 },
            { comboId: 2, moveId: 8, rank: 3 },
            { comboId: 3, moveId: 10, rank: 0 },
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