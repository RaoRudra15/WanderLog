import dotenv from 'dotenv';
 
// import dns from "node:dns/promises";
 
dotenv.config();
 
// if ((process.env.NODE_ENV === "development")) {
//   dns.setServers(["1.1.1.1", "8.8.8.8"]);
// }
 
export const ENV={
    DB_URL:process.env.DB_URL,
    NODE_ENV:process.env.NODE_ENV
}