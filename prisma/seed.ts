import posaStaticMoves from '@/assets/datasets/posa/static.json';
import posaStrengthMoves from '@/assets/datasets/posa/strength.json';
import { supabase } from '@/src/services/supabaseServer';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

const USER_EMAIL = 'contact@pole-cards.com'

async function seedUser() {
    // Create user via Supabase Admin API
  const { data, error } = await supabase.auth.admin.createUser({
    email: USER_EMAIL,
    password: process.env.USER_PASSWORD,
    email_confirm: true,
  })

  if (error) throw error

  console.log('Created Supabase user:', data.user.email)

  // Create user row in your own database using Prisma
  await prisma.user.create({
    data: {
      id: data.user.id,        // match Supabase auth user id
      email: data.user.email!,
      // other fields...
    }
  })
}

async function seedMoves() {
    // POSA Static moves
    console.log("🗿 POSA Static Moves loaded:", posaStaticMoves.length);
    for (const moveData of posaStaticMoves) {
        const moveWithSamePosaCode = await prisma.move.findFirst({
            where: {
                posaCode: moveData.posaCode
            }
        })

        if (moveWithSamePosaCode) {
            console.log(`❌ Move ${moveData.posaCode} already exists: skipping...`)
            continue
        }

        // Create Move
        const level = moveData.posaTechValue < 0.3 ? 'BEGINNER' :
            moveData.posaTechValue < 0.6 ? 'INTERMEDIATE' : "ADVANCED";

        const move = await prisma.move.create({
            data: {
                posaCode: moveData.posaCode,
                imageUrl: moveData.imageUrl,
                posaTechValue: moveData.posaTechValue,
                styles: ['STATIC', 'STATICSPIN'],
                level: level,
            }
        })


        // Create Move Names
        try {
            await prisma.moveName.createMany({
                data: moveData.names.map((name) => ({
                    name: name,
                    moveId: move.id
                })),
            })
         } catch(error) {
            console.error(`Could not create move for names ${moveData.names}`)
         }
    }
    console.log("🚀 Static Moves created");
    

    // POSA Strength moves
    console.log("💪 POSA Strength Moves loaded:", posaStrengthMoves.length);
    for (const moveData of posaStrengthMoves) {
        const moveWithSamePosaCode = await prisma.move.findFirst({
            where: {
                posaCode: moveData.posaCode
            }
        })
        if (moveWithSamePosaCode) {
            console.log(`❌ Move ${moveData.posaCode} already exists: skipping...`)
            continue
        }

        // Create Move
        const level = moveData.posaTechValue < 0.3 ? 'BEGINNER' :
            moveData.posaTechValue < 0.6 ? 'INTERMEDIATE' : "ADVANCED";

        const move = await prisma.move.create({
            data: {
                posaCode: moveData.posaCode,
                imageUrl: moveData.imageUrl,
                posaTechValue: moveData.posaTechValue,
                styles: ['STRENGTH', 'STATIC', 'SPIN'],
                level: level,
            }
        })

        // Create Move Names
        try {
            await prisma.moveName.createMany({
                data: moveData.names.map((name) => ({
                    name: name,
                    moveId: move.id
                })),
            })
         } catch(error) {
            console.error(`Could not create move for names ${moveData.names}`)
         }

    }
    console.log("🚀 Strength Moves created");
}


async function seedCombos() {
    const user = await prisma.user.findUnique({
        where: { email: USER_EMAIL }
    })
    await prisma.combo.createMany({
        data: [
            {
                createdByUserId: user?.id!,
                name: "Static spin",
                level: "BEGINNER",
                styles: ["STATIC"]
            },
            {
                createdByUserId: user?.id!,
                name: "Spinning combo",
                level: "INTERMEDIATE",
                styles: ["SPIN"]
            },
            {
                createdByUserId: user?.id!,
                name: "Choreography - IPSF",
                level: "ADVANCED",
                styles: ["STATIC", "SPIN", "STRENGTH"],
            },
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
    await seedUser()
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