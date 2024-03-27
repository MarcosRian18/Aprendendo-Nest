import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthRegisterDTO } from './dto/authRegister.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt'


@Injectable()
export class AuthService {
    private issue = 'login'
    private audience = 'users'
    constructor(
        private readonly JWTservice: JwtService, 
        private readonly prismaService: PrismaService,
        private readonly userService: UserService,
        ) { }

     createToken(user: User) {
        return {
            acessToken: this.JWTservice.sign({
                id: user.id,
                email: user.email,
                name: user.name
            }, {
                expiresIn: '7 days',
                subject: String(user.id),
                issuer: 'login',
                audience: 'users'
            })
        }
    }

     checkToken(token: string) {
        try {
            const data = this.JWTservice.verify(token, {
            audience: 'users', 
            issuer: 'login',
        })
        return data
        }catch (e){
            throw new BadRequestException(e)
        }
       
        
    }

     isValidToken(token: string){
        try{
            this.checkToken(token)
            return true
        }catch(e){
            return false
        }
    }

    async login(email: string, password: string) {

        const user = await this.prismaService.user.findFirst({
            where: {
                email
            }
        })
        if (!user) {
            throw new UnauthorizedException('Email ou senha incorretos.')
        }

        if(!await bcrypt.compare(password, user.password)){
            throw new UnauthorizedException('Email ou senha incorretos.')
        }
        return this.createToken(user);
    }
    async forget(email: string) {

      
        const user = await this.prismaService.user.findFirst({
            where: {
                email,
            }
        })
        if (!user) {
            throw new UnauthorizedException('Email está incorreto!')
        }
        const token = this.JWTservice.sign({
            id: user.id
        }, {
            expiresIn: '30 minutes',
            subject: String(user.id),
            issuer: 'forget',
            audience: 'users'
        })


        return true;
    }
    async reset(password: string, token: string) {
        //TO DO: validar o toekn...
        const id= 0
        const user = await this.prismaService.user.update({
            where: {
                id
            },
            data: {
                password
            }
        })
        return this.createToken(user)
    }

    async register(data: AuthRegisterDTO){
       const user = await this.userService.create(data)
        
    return this.createToken(user)
    }


}
