import path from 'path';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import AWSS3Client from '../databases/s3.database';
import FileUtils from '../utils/common/file.util';

class S3Service {
  static async uploadFileS3(file: Express.Multer.File) {
    if (!file) {
      throw new Error('No file provided');
    }

    const fileExtension = path.extname(file.originalname) || '.png';
    const fileName = `${FileUtils.generateS3FileName()}${fileExtension}`;
    const client = AWSS3Client.getS3Client();
    const bucketName = process.env.S3_INPUT_BUCKET_PROFILE_PICTURES as string;

    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: fileName,
      Body: file.buffer,
      ContentType: file.mimetype,
    });

    await client.send(command);

    const imageUrl = `https://${bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;
    return imageUrl;
  }
}

export default S3Service;
