import crypto from "crypto";
export function createAddressToken(){return crypto.randomBytes(32).toString("base64url");}
export function hashAddressToken(token:string){return crypto.createHash("sha256").update(token).digest("hex");}
