import pool from './connection.db';

pool.query(`DROP TABLE IF EXISTS users CASCADE;
        CREATE TABLE users(
            id SERIAL NOT NULL PRIMARY KEY,
            firstName VARCHAR(128),
            lastName VARCHAR(128),
            email VARCHAR(128) UNIQUE NOT NULL,
            password VARCHAR NOT NULL,
            type VARCHAR(10) DEFAULT 'clients',
            isAdmin BOOLEAN DEFAULT false,
            created_date TIMESTAMP NOT NULL DEFAULT NOW()
        );
        DROP TABLE IF EXISTS accounts CASCADE;
        CREATE TABLE accounts(
            id SERIAL NOT NULL PRIMARY KEY,
            accountNumber INTEGER UNIQUE NOT NULL,
            owner INTEGER REFERENCES users(id) ON DELETE CASCADE,
            type VARCHAR(10) NOT NULL,
            status VARCHAR(10) NOT NULL,
            balance NUMERIC(2) DEFAULT 0.00,
            created_date TIMESTAMP NOT NULL DEFAULT NOW()
        );
        DROP TABLE IF EXISTS transaction CASCADE;
        CREATE TABLE transaction(
            id SERIAL NOT NULL PRIMARY KEY,
            accountNumber INTEGER REFERENCES accounts(accountNumber) ON DELETE CASCADE,
            cashier INTEGER REFERENCES users(id) ON DELETE CASCADE,
            transactionType VARCHAR(10) NOT NULL,
            accountBalance NUMERIC(2) DEFAULT 0.00,
            created_date TIMESTAMP NOT NULL DEFAULT NOW()
        );
    `);
