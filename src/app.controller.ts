import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { UserService } from './auth.service';
import { WalletService } from './wallet.service';
import { User as UserModel, Wallet as WalletModel } from '@prisma/client';

@Controller()
export class AppController {
  constructor(
    private readonly userService: UserService,
    private readonly walletService: WalletService,
  ) {}

  @Get('wallet/:id')
  async getPostById(@Param('id') id: number): Promise<WalletModel> {
    return this.walletService.getWalletById(Number(id)); 
  }

  @Get('wallets')
  async getPublishedPosts(): Promise<WalletModel[]> {
    return this.walletService.getWallets();
  }

  @Post('wallet')
async createWallet(
  @Body() walletData: { address: string; name: string; balance: number, userId: number },
): Promise<WalletModel> {
  const { address, name, balance, userId } = walletData;
  return this.walletService.createWallet(walletData);
}

@Put('wallet/:id')
async updateWallet(
  @Param('id') id: number,
  @Body() walletData: { address: string; name: string; balance: number },
): Promise<WalletModel> {
  return this.walletService.updateWallet(id, { ...walletData });
}

@Delete('wallet/:id')
async deleteWallet(@Param('id') id: number): Promise<WalletModel> {
  return this.walletService.deleteWallet(Number(id));
}

  @Post('signup')
  async signupUser(
    @Body() userData: { name: string; email: string ,password: string},
  ): Promise<UserModel> {
    return this.userService.signup({...userData });
  }

  @Post('login')
  async loginUser(
    @Body() userData: { email: string ,password: string},
  ): Promise<UserModel> {
    return this.userService.login({...userData });
  }

  @Get('user/:id')
  async getUserById(@Param('id') id: number): Promise<UserModel> {
    return this.userService.getUserById(id);
  }

  @Put('user/:id')
  async updateUser(
    @Param('id') id: number,
    @Body() userData: { name: string; email: string },
  ): Promise<UserModel> {
    return this.userService.updateUser(Number(id), { ...userData });
  }

  @Delete('user/:id')
  async deleteUser(@Param('id') id: number): Promise<UserModel> {
    return this.userService.deleteUser(Number(id));
  }
}