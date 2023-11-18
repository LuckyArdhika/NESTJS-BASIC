import { Injectable, ArgumentMetadata, BadRequestException, PipeTransform } from '@nestjs/common';
import { z, ZodError, ZodObject, ZodSchema } from 'zod';

// abstract class ZodDtoClass<T extends ZodSchema> {
//   static schema: ZodSchema;
//   data: z.infer<T>;
// }

// @Injectable()
// export class ZodValidationPipe {
//   transform(value: Record<string, unknown>, metadata: ArgumentMetadata) {
//     const schemaClass: typeof ZodDtoClass = metadata.metatype! as unknown as typeof ZodDtoClass;
    
//     console.log("Zod Hit ", schemaClass.schema);

//     if (!schemaClass.schema) return value;

//     const result = schemaClass.schema.safeParse(value);
//     if (!result.success) {
//       // @ts-ignore
//       throw new BadRequestException(result.error.flatten());
//     }

//     return { data: result.data };
//   }
// }

@Injectable()
export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodObject<any>){}

  transform(value: any, metadata: ArgumentMetadata) {
    try {
      this.schema.parse(value);
    } catch (err) {
      throw new BadRequestException(JSON.parse(err));
    }
    return value;
  }
}