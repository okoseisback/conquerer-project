# Conquerer Backend
Editing has been provided only for the development environment; additional adjustments have not been made for the production environment. You can set up the installation for the development environment by following the steps below.

## Installation
The first step is to install npm packages with the following command.

```bash
npm i
```

Install sequelize-cli;
```bash
npm install --save-dev sequelize-cli
```

## Environment
Edit the file named `.env.example` as `.env`. *The db does not need to be defined in Postgresql, it will be created automatically with the following commands.

```env
PORT=3001

DB_HOST=localhost

DB_DATABASE_DEV=conquerer-db
DB_USERNAME_DEV=postgres
DB_PASSWORD_DEV=conquerer1234
DB_DIALECT_DEV=postgres

JWT_SECRET=secretjwtffgf
JWT_ACCESS_EXPIRATION_MINUTES=60
JWT_REFRESH_EXPIRATION_DAYS=10
```

## Define Database
Postgres must be installed and running before this process. It allows you to automatically create the database and load the relevant tables with the following commands.

Database Creation;
```bash
npm run dev:db:create
```

Database Migration;
```bash
dev:db:migrate
```

## Run
You can serve the frontend part with the following command. However, remember that the backend part must be run before this.

```bash
npm run dev
```