# Verify IAM Role Policy JSON

This project includes an implementation to verify IAM role policies based on predefined criteria.
The verification logic is implemented in TypeScript and can be executed in a web browser environment.

# How to run the method

### Step 1: Clone the Repository

Clone this repository to your local machine using:\
`git clone https://github.com/tomgasper/verifyIAMRolePolicy.git`\
`cd verifyIAMRolePolicy`

### Step 2: Install Dependencies

`npm install`

### Step 3: Build the Project

`npm run build`\
This command compiles the TypeScript files to JavaScript and places them in the `dist` directory.

### Step 4: Run the Example

Open the `index.html` file in your web browser.
Open the Web Console and you will see the result of the example verification.

### Step 5: Run the Tests

`npm run test`

### Explanation of the Example Script

The script `exampleVerification.js` included in the HTML file performs the following actions:
- Fetches a JSON file containing an example IAM role policy from `./example/examplePolicy.json`.
- Uses the `verifyIAMRolePolicy` function to check whether the JSON content meets the specified conditions.
- Logs the verification result to the console.

The verification result will be printed in the browser's console. To view this, right-click on the page, select 'Inspect', and navigate to the 'Console' tab.

## Viewing the JSON File

If you want to view or modify the JSON file used in the example (`examplePolicy.json`), it can be found in the `example` directory within the project folder.
