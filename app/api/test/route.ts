// import { NextResponse } from "next/server";
// import dbConnect from "@/lib/mongoose";

// export async function GET() {
//   try {
//     // Connect to MongoDB
//     await dbConnect();

//     // Return success response
//     return NextResponse.json({
//       success: true,
//       message: "✅ Successfully connected to MongoDB Atlas!",
//       timestamp: new Date().toISOString(),
//     });
//   } catch (error: any) {
//     console.error("MongoDB connection error:", error);

//     // Return error response
//     return NextResponse.json(
//       {
//         success: false,
//         error: error.message,
//         type: error.name || "ConnectionError",
//       },
//       { status: 500 }
//     );
//   }
// }
