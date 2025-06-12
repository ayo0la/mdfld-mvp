import { nanoid } from "nanoid";
import { v4 } from "uuid";

class StringUtils {
  static getUrlLastPath(url: string) {
    const pathParts = url.split("/");
    const lastParts = pathParts?.pop()?.split("?");
    return lastParts?.[0];
  }

  static getEmailFirstComponent(email: string): string | "user" {
    return email?.substring(0, email?.indexOf("@")) ?? "user";
  }

  static generateUniqueCode(size?: number) {
    return size ? nanoid(size) : nanoid();
  }
}
export default StringUtils;
