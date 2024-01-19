# Conquerer Frontend
Editing has been provided only for the development environment; additional adjustments have not been made for the production environment. You can set up the installation for the development environment by following the steps below.

## Installation
The first step is to install npm packages with the following command.

```bash
npm i
```

## Environment
Edit the file named `.env.example` as `.env` and, if you have made any modifications for `REACT_APP_BASE_URL`, update the relevant variable. If you haven't made any changes to the URL for the backend service, use it as it is in the `.example` file.

```env
REACT_APP_BASE_URL=http://localhost:3001/api/v1
```

## Run
You can serve the frontend part with the following command. However, remember that the backend part must be run before this.

```bash
npm run dev
```