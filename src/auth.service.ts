import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { User, Prisma } from '@prisma/client';
import bcrypt from 'bcrypt';
const age = 1000 * 60 * 60 * 24 * 7;
@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async signup(userData: Prisma.UserCreateInput): Promise<User> {
    const existingUser = await this.prisma.user.findUnique({ where: { email: userData.email } });
    const hash = bcrypt.hashSync(userData.password, 5);
    if (existingUser) {
      throw new UnauthorizedException('User already exists');
    }
    userData.password = hash;
    return this.prisma.user.create({ data: userData });
  }

  async login(credentials: { email: string; password: string }): Promise<User> {
    const { email, password } = credentials;
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const passwordMatch = bcrypt.compareSync(password, credentials.password);
    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return user;
  }

  async getUserById(userId: number): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async updateUser(userId: number, userData: Prisma.UserUpdateInput): Promise<User> {
    const existingUser = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!existingUser) {
      throw new NotFoundException('User not found');
    }
    return this.prisma.user.update({ where: { id: userId }, data: userData });
  }

  async deleteUser(userId: number): Promise<User> {
    const user = await this.prisma.user.delete({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}
