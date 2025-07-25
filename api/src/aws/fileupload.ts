import { S3Client, GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";


interface S3Config {
  accessKeyId: string;
  secretAccessKey: string;
  region: string;
  Bucket: string;
}

const s3Config: S3Config = {
  accessKeyId: process.env.ACCESS_KEY_ID || "",
  secretAccessKey: process.env.SECRET_ACCESS_KEY || "",
  region: process.env.REGION || "",
  Bucket: process.env.BUCKET || "",
};


const s3Client = new S3Client({
  credentials: {
    accessKeyId: s3Config.accessKeyId,
    secretAccessKey: s3Config.secretAccessKey,
  },
  region: s3Config.region,
});


export async function getObjectURL(key: string, expiresIn: number = 3600): Promise<string> {
  const command = new GetObjectCommand({
    Bucket: s3Config.Bucket,
    Key: key,
  });
  const url = await getSignedUrl(s3Client, command, { expiresIn });
  return url;
}


export async function putObject(filename: string, contentType: string): Promise<string> {
  const command = new PutObjectCommand({
    Bucket: s3Config.Bucket,
    Key: `upload/image/${filename}`,
    ContentType: contentType,
  });
  const url = await getSignedUrl(s3Client, command);
  return url;
}
