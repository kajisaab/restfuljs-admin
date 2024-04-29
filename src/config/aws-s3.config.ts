import { S3Client } from '@aws-sdk/client-s3';
import config from '.';

const s3Client = new S3Client({
  region: 'ap-south-1',
  credentials: {
    accessKeyId: config.accessKeyId,
    secretAccessKey: config.secretAccessKey
  }
});

export default s3Client;
