import { model, models, Schema, Types } from "mongoose";
import { string } from "zod";

export interface IAccount {
  userId: Types.ObjectId;
  name: string;
  image?: string;
  password?: string;
  provider: string;
  provideAccountId: string;
}
const AccountSchema = new Schema<IAccount>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    image: { type: String },
    password: { type: String },
    provider: { type: String, required: true },
    provideAccountId: { type: String, required: true },
  },
  { timestamps: true }
);

const Account = models?.Account || model<IAccount>("Account", AccountSchema);

export default Account;
