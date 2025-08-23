import { NextResponse } from "next/server";

import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { v4 as uuidv4 } from "uuid";

import { env } from "@/lib/env";
import { S3 } from "@/lib/s3Client";
import { fileUploadSchema } from "@/lib/zodSchemas";

export async function POST(request: Request) {
  try {
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
