import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthService } from './auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from './prisma/prisma.service';
import { AuthModule } from './auth/auth-module';


@Module({
  imports: [UserModule, AuthModule, JwtModule,
  ],
  controllers: [],
  providers: [AuthService, PrismaService],
  exports: [PrismaService]
})
export class AppModule { }
