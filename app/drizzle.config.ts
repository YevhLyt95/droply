import * as dotenv from "dotenv";


dotenv.config({path: ".env.local"});

if(!process.env.DATABASE_URL){
    throw new Error("Database url is not set in .env.loc");
}

export default {
  schema: "./lib/db/schema.ts",
  out: "./drizzle",
  dialect: 'postgresql',
  dbCredentials: {
  url: process.env.DATABASE_URL!,
  },
};