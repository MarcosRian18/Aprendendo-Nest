import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDTO } from './dto/createUser.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdatePutUserDTO } from './dto/updatePutUser.dto';
import { UpdatePatchUserDTO } from './dto/updatePatchUserDTO.dto';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UserService {

    constructor(private readonly prisma: PrismaService) { }

    async create(data: CreateUserDTO) {
        const salt = await bcrypt.genSalt()
        data.password = await bcrypt.hash(data.password, salt)

        return this.prisma.user.create({
            data: data
        })
    }

    async listUsers(){
        return this.prisma.user.findMany()
    }

    async findUser(id: number){
        return this.prisma.user.findUnique({
            where: {
                id
            }
        })
    }

    async updatePutUser(id: number, {name, email, password}: UpdatePutUserDTO){
        const salt = await bcrypt.genSalt()
        password = await bcrypt.hash(password, salt)
        return this.prisma.user.update({
            data: {name, email, password},
            where: {
                id
            }
        })
    }

    async updatePartial(id: number, {name, email, password}: UpdatePatchUserDTO){
        const salt = await bcrypt.genSalt()
        password = await bcrypt.hash(password, salt)

        
        return this.prisma.user.update({
            data:  {name, email, password},
            where: {
                id
            }
        })
    }

    async deleteUser(id: number){
        if(!(await this.findUser(id))){
            throw new  NotFoundException(`O usuário ${id} não existe`)
        }
        return this.prisma.user.delete({
            where: {
                id
            }
        })
    }
}
