// import { PrismaClient, User } from '@prisma/client';

// interface PrismaClientExtended extends PrismaClient {
//   users: {
//     findManyAndCount<T extends User>(args: {
//       select?: { [P in keyof T]?: true };
//       where?: any;
//       orderBy?: any;
//       skip?: number;
//       take?: number;
//       cursor?: any;
//       distinct?: any;
//     }): Promise<[T[], number]>;
//   };
// }

// declare const prisma: PrismaClientExtended;

// export default prisma;