import { PrismaClient } from '@prisma/client'
import { $ } from 'bun'

let supportedExt = ["png","jpg","jpeg"]

const prisma = new PrismaClient()

async function main() {
    let cuccok = await prisma.data.findMany()
    for(const cucc of cuccok){
        let darab = cucc.kep.split(".")
        let name:string[] = []
        let ext = ""
        for (let i = 0; i < darab.length; i++) {
            if(i !== darab.length-1){
                name.push(darab[i])
            }else{
                ext = darab[i]
            }
            
        }
        if(!supportedExt.includes(ext)) break;
        let filename = name.toString().replaceAll(",",".")
        await $`ffmpeg -i ${Bun.env.dir}/${cucc.kep} ${Bun.env.dir}/${filename}.avif`
        await prisma.data.update({
            where: {
                id: cucc.id
            },
            select: {
                kep: true
            },
            data: {
                kep: `${filename}.avif`
            }
        })
    }
}
main()