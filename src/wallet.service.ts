import { Injectable,NotFoundException } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Wallet, Prisma } from '@prisma/client';

@Injectable()
export class WalletService {
  constructor(private prisma: PrismaService) {}

  async createWallet(walletData: Prisma.WalletCreateInput): Promise<Wallet> {
        return this.prisma.wallet.create({ data: walletData });
  }

  async getWalletById(walletId: number): Promise<Wallet> {
    const wallet = await this.prisma.wallet.findUnique({ where: { id: walletId } });
    if (!wallet) {
      throw new NotFoundException('Wallet not found');
    }
    return wallet;
  }

    async updateWallet(walletId: number, walletData: Prisma.WalletUpdateInput): Promise<Wallet> {
        const existingWallet = await this.prisma.wallet.findUnique({ where: { id: walletId } });
        if (!existingWallet) {
        throw new NotFoundException('Wallet not found');
        }
        return this.prisma.wallet.update({ where: { id: walletId }, data: walletData });
    }

    async deleteWallet(walletId: number): Promise<Wallet> {
        const wallet = await this.prisma.wallet.delete({ where: { id: walletId } });
        if (!wallet) {
        throw new NotFoundException('Wallet not found');
        }
        return wallet;
    }

    async getWallets(): Promise<Wallet[]> {
        return this.prisma.wallet.findMany();
    }
}