import { v4 } from 'uuid';

class FileUtils {
  static generateS3FileName() {
    const uniqueKey = v4();
    // const folder = process.env.NODE_ENV === 'DEV' || process.env.NODE_ENV === 'SIT' ? 'dev' : 'prod';
    return uniqueKey;
  }
}
export default FileUtils;
