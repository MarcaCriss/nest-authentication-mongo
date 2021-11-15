import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ required: false, default: '', maxlength: 255 })
  name: string;

  @Prop({ required: false, default: '', maxlength: 255 })
  last_name: string;

  @Prop({ required: true, maxlength: 255, unique: true })
  email: string;

  @Prop({ required: true, maxlength: 128 })
  password: string;

  @Prop({ required: true })
  role: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
