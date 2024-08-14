import { PrismaClient } from '@prisma/client'
import { $ } from 'bun'

const prisma = new PrismaClient()

async function main() {
    let cuccok = await prisma.data.findMany()
    for(const cucc of cuccok){
        let darab = cucc.kep.split(".")
        let name:string[] = []
        for (let i = 0; i < darab.length; i++) {
            if(i !== darab.length-1){
                name.push(darab[i])
            }
            
        }
        let filename = name.toString().replaceAll(",",".")
        await $`ffmpeg -i ${Bun.env.dir}/${cucc.kep} ${Bun.env.dir}/${filename}.avif`
    }
}
main()