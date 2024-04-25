import { get } from "env-var"; 
import "dotenv/config";

export const envs = { 
    PORT: get("PORT").required().asPortNumber(),
    NODE_ENV: get("NODE_ENV").required().asString(),
    JWT_SECRET: get("JWT_SECRET").required().asString(),
}