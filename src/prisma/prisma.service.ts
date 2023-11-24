import { Injectable, OnModuleInit } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {

  async onModuleInit() {    
    await this.$connect();
    console.log("[+] Database connected!");
  }

  extension(){
    return this.$extends({
      model: {
        $allModels: {
          findManyAndCount<Model, Args>(
            this: Model,
            args: Prisma.Exact<Args, Prisma.Args<Model, 'findMany'>>
          ): Promise<[Prisma.Result<Model, Args, 'findMany'>, number]> {
            return Promise.all([
              (this as any).findMany(args),
              (this as any).count({ where: (args as any).where })
            ]) as any;
          }
        }
      }
    });
  }
}