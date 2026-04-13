/* eslint-disable import/order */
import Account from "@/database/account.model";
import handleError from "@/lib/handlers/error";
import { ForbiddenError } from "@/lib/http-errors";
import dbConnect from "@/lib/mongoose";
import { AccountSchema } from "@/lib/validations";

import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();
    const accounts = await Account.find();

    return NextResponse.json(
      { success: true, data: accounts },
      { status: 200 }
    );
  } catch (error) {
    return handleError(error, "api") as APIErrorResponse;
  }
}
// Create User

export async function POST(request: Request) {
  try {
    await dbConnect(); // ✅ Fixed: added parentheses and await
    const body = await request.json();

    const validatedData = AccountSchema.parse(body);

    // ✅ Fixed: Check both in one query to avoid race condition

    const existingAccount = await Account.findOne({
      $or: [
        {
          provider: validatedData.provider,
          providerAccountId: validatedData.providerAccountId,
        },
      ],
    });

    if (existingAccount) {
      throw new ForbiddenError(
        "An account with the same provider already exists"
      );
    }

    const newAccount = await Account.create(validatedData);
    return NextResponse.json(
      { success: true, data: newAccount },
      { status: 201 }
    );
  } catch (error) {
    return handleError(error, "api") as APIErrorResponse;
  }
}
