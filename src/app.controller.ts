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
    return this.walletService.getWalletById(id); 
  }

  @Get('wallets')
  async getPublishedPosts(): Promise<WalletModel[]> {
    return this.walletService.getWallets();
  }

  @Post('wallet/:id')
async createWallet(
  @Param('id') userId: number,
  @Body() walletData: { address: string; name: string; balance: number },
): Promise<WalletModel> {
  const { address, name, balance } = walletData;
  return this.walletService.createWallet({ address, name, balance });
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
    return this.userService.updateUser(id, { ...userData });
  }

  @Delete('user/:id')
  async deleteUser(@Param('id') id: number): Promise<UserModel> {
    return this.userService.deleteUser(id);
  }
}