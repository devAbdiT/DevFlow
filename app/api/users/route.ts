/* eslint-disable import/order */
import User from "@/database/user.model";
import handleError from "@/lib/handlers/error";
import { ValidationError } from "@/lib/http-errors";
import dbConnect from "@/lib/mongoose";
import { UserSchema } from "@/lib/validations";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();
    const users = await User.find();

    return NextResponse.json({ success: true, data: users }, { status: 200 });
  } catch (error) {
    return handleError(error, "api") as APIErrorResponse;
  }
}
// Create User
// export async function POST(request: Request) {
//   try {
//     await dbConnect();
//     const body = await request.json();
//     const validatedData = UserSchema.safeParse(body);
//     if (!validatedData.success) {
//       throw new ValidationError(validatedData.error.flatten().fieldErrors);
//     }
//     const { email, username } = validatedData.data;
//     const existingUser = await User.findOne({ email });
//     if (existingUser) throw new Error("User already exist");

//     const existingUsername = await User.findOne({ username });
//     if (existingUsername) throw new Error("Username already exists");

//     const newUser = await User.create(validatedData.data);
//     return NextResponse.json({ success: true, data: newUser }, { status: 201 });
//   } catch (error) {
//     return handleError(error, "api") as APIErrorResponse;
//   }
// }

export async function POST(request: Request) {
  try {
    await dbConnect(); // ✅ Fixed: added parentheses and await
    const body = await request.json();

    const validatedData = UserSchema.safeParse(body);
    if (!validatedData.success) {
      throw new ValidationError(validatedData.error.flatten().fieldErrors);
    }

    const { email, username } = validatedData.data;

    // ✅ Fixed: Check both in one query to avoid race condition
    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      if (existingUser.email === email) {
        throw new Error("User already exist");
      }
      if (existingUser.username === username) {
        throw new Error("Username already exists");
      }
    }

    const newUser = await User.create(validatedData.data);
    return NextResponse.json({ success: true, data: newUser }, { status: 201 });
  } catch (error) {
    return handleError(error, "api") as APIErrorResponse;
  }
}
