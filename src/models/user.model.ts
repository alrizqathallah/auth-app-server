import mongoose, { Schema, Document, Model } from "mongoose";

import { IUser } from "../interfaces/user.interface";

class UserSchema {
  private readonly schema: Schema;

  public constructor() {
    this.schema = new Schema<IUser & Document>(
      {
        name: {
          type: String,
          required: [true, "Name is required"],
          trim: true,
        },
        email: {
          type: String,
          required: [true, "Email is required"],
          unique: true,
          lowercase: true,
        },
        password: {
          type: String,
          required: [true, "Password is required"],
          minlength: 6,
          select: false,
        },
        role: {
          type: String,
          enum: ["user", "admin"],
          default: "user",
        },
      },
      {
        timestamps: true,
      }
    );
  }

  public get model(): Model<IUser & Document> {
    return (
      mongoose.models.user ||
      mongoose.model<IUser & Document>("user", this.schema)
    );
  }
}

export default new UserSchema().model;
