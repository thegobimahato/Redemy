import { NextResponse } from "next/server";

import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { v4 as uuidv4 } from "uuid";

import arcjet, { detectBot, fixedWindow } from "@/lib/arject";
import { env } from "@/lib/env";
import { S3 } from "@/lib/s3Client";
import { fileUploadSchema } from "@/lib/zodSchemas";
import { requireAdmin } from "@/data/admin/require-admin";

const aj = arcjet
  .withRule(
    detectBot({
      mode: "LIVE",
      allow: [],
    }),
  )
  .withRule(
    fixedWindow({
      mode: "LIVE",
      window: "1m",
      max: 5,
    }),
  );

export async function POST(request: Request) {
  // const session = await requireAdmin();

  try {
    // const decision = await aj.protect(request, {
    //   fingerprint: session?.user.id as string,
    // });

    // if (decision.isDenied()) {
    //   return NextResponse.json({ error: "You are blocked!" }, { status: 429 });
    // }

    const body = await request.json();

    console.log(body);

    const validation = fileUploadSchema.safeParse(body);

    if (!validation.success) {
      console.error("Invalid body", validation.error);
      return NextResponse.json(
        { error: "Invalid Request Body" },
        { status: 400 },
      );
    }

    const { fileName, contentType, size } = validation.data;

    const uniqueKey = `${uuidv4()}-${fileName}`;

    const command = new PutObjectCommand({
      Bucket: env.NEXT_PUBLIC_S3_BUCKET_NAME_IMAGES,
      ContentType: contentType,
      ContentLength: size,
      Key: uniqueKey,
    });

    const presignedUrl = await getSignedUrl(S3, command, {
      expiresIn: 360, // url expires in 6 minutes
    });

    const response = {
      presignedUrl,
      key: uniqueKey,
    };

    console.log(response);

    return NextResponse.json(response);
  } catch (error) {
    console.error("Failed to generated presignedURL", error);
    return NextResponse.json(
      { error: "Failed to generate upload URL" },
      { status: 500 },
    );
  }
}
