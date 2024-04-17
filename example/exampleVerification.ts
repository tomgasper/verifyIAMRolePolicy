import { verifyIAMRolePolicy } from "../src/verifyIAMRolePolicy.js";

async function verifyExampleJson(path: string) {
    try {
        const response = await fetch(path);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const json = await response.json();

        // Here we verify the incoming JSON
        let result = verifyIAMRolePolicy(json);
        console.log("Verification status: " + result);
    } catch (error) {
        console.error('Error loading JSON:', error);
    }
}

verifyExampleJson("./example/examplePolicy.json");