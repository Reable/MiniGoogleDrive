import { DataSource } from "typeorm";

export const myDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "root",
  database: "googleDrive",
  logging: true,
  synchronize: true,
  entities: [`src/Entity/**/*.ts`],
  migrations: ["src/Migration/**/*.ts"],
});
