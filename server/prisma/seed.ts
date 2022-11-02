
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()


async function main() {

    const user = await prisma.user.create({
        data: {
            name: "Johh Doe", 
            email: "john.doe@gmail.com",
            avatarUrl: 'http://github.com/otaviovitor.png'
        }
    })

    const pool = await prisma.pool.create({
        data: {
            title: 'Example Poll',
            code: 'BOL123',
            ownerId: user.id,

            participants: {
                create: {
                    userId: user.id
                }
            }
        }
    })

    await prisma.game.create({
        data:{
            date: '2022-11-02T12:00:00.201Z', 
            firstTeamCountryCode: 'DE',
            secoundTeamCountryCode: 'BR',
        }
    })

    await prisma.game.create({
        data:{
            date: '2022-11-03T12:00:00.201Z', 
            firstTeamCountryCode: 'AR',
            secoundTeamCountryCode: 'BR',

            guesses:{
                create:{
                    firstTeamPoints: 2,
                    secoundTeamPoints: 4,

                     participant: {
                        connect: {
                            userId_poolId: {
                                userId: user.id,
                                poolId: pool.id,
                            }
                        }
                     }

                    
                }
            }
        }
    })


}

main()