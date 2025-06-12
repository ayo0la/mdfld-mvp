import { S3Client } from '@aws-sdk/client-s3';

class AWSS3Client {
  static s3: S3Client;
  static init() {
    if (!this.s3) {
      this.s3 = new S3Client({
        region: process.env.AWS_REGION,
        credentials: {
          accessKeyId: process.env.AWS_ACCESS_KEY ?? '',
          secretAccessKey: process.env.AWS_SECRET_KEY ?? '',
        },
      });
    }
  }

  static getS3Client() {
    if (!this.s3) {
      throw new Error('Missing S3 Client Object');
    }
    return this.s3;
  }
}

export default AWSS3Client;
