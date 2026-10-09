import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ _id: false })
export class PhotoHash {
  @Prop({ required: true })
  url: string;

  @Prop({ required: true })
  hash: string;
}

export const PhotoHashSchema =
  SchemaFactory.createForClass(PhotoHash);