import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, UseGuards, UseInterceptors } from '@nestjs/common';
import { CreateUserDTO } from './dto/createUser.dto';
import { UserService } from './user.service';
import { UpdatePutUserDTO } from './dto/updatePutUser.dto';
import { UpdatePatchUserDTO } from './dto/updatePatchUserDTO.dto';
import { LogInterceptor } from 'src/interceptors/log.interceptor';

@Controller('users')
export class UserController {
    constructor( private readonly userService: UserService){}
    
    @UseInterceptors(LogInterceptor)
    @Post()
    async createUser(@Body() data: CreateUserDTO) {
        return this.userService.create(data)
    }

    @Get()
    async allUsers() {
        return this.userService.listUsers()
    }

    @Get(':id')
    async findUser(@Param('id', ParseIntPipe) id: number){
        return this.userService.findUser(id)
    }

    @Put(':id')
    async updateUserPut(@Body() data: UpdatePutUserDTO, @Param('id', ParseIntPipe) id: number){
        return  this.userService.updatePutUser(id, data)
    }

    @Patch(':id')
    async updateUserPartial(@Body() data: UpdatePatchUserDTO, @Param('id', ParseIntPipe) id: number){
        return this.userService.updatePartial(id, data)
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe)id: number){
        return this.userService.deleteUser(id)
    }
}
