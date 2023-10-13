import { SqlServerConnectionOptions } from "typeorm/driver/sqlserver/SqlServerConnectionOptions";

const config: SqlServerConnectionOptions = {
    type: 'mssql',
    host: 'localhost',
    port: 1433,
    username: 'sa',
    password: '16aa3240E@',
    database: 'shiftsManagement',
    synchronize: true,
};

export default config;
