# Angular Users List App

This project is an Angular application that lists users fetched from [jsonplaceholder.typicode.com/users](https://jsonplaceholder.typicode.com/users). It features a debounced search, Bootstrap styling, and a dark mode theme.

## Features
- Fetches users from a public API using RxJS and HttpClient
- Debounced search input (2 seconds, minimum 2 characters)
- Responsive, modern UI with Bootstrap 5
- Dark mode enabled by default

## Prerequisites
- [Node.js](https://nodejs.org/) (v16 or later recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)

## Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd angular-app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm start
   # or
   ng serve
   ```
   The app will be available at [http://localhost:4200](http://localhost:4200).

## Usage
- Navigate to `/users` to see the users list.
- Use the search box to filter users by name, username, or email. The search triggers after 2 seconds and at least 2 characters.

## Customization
- UI is styled with Bootstrap 5 and custom dark mode styles in `src/styles.scss`.
- You can further customize the look by editing `src/styles.scss` or using more Bootstrap components.

## Troubleshooting
- If you encounter dependency issues, ensure your Node.js and npm versions are up to date.
- For Bootstrap or Angular errors, try deleting `node_modules` and running `npm install` again.

## License
This project is for educational/demo purposes.
