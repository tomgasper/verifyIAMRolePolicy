function verifyIAMRolePolicy(inputJSON) {
    try {
        const policy = JSON.parse(inputJSON);

        // Verify that necessary fields exist
        if (!policy.PolicyDocument || !policy.PolicyDocument.Statement) {
            throw new Error("Invalid input: Missing required PolicyDocument or Statement fields.");
        }

        const statements = policy.PolicyDocument.Statement;

        for (const statement of statements) {
            // Handle edge case where Resource may be an array or a single value
            const resources = Array.isArray(statement.Resource) ? statement.Resource : [statement.Resource];

            for (const resource of resources) {
                if (resource === "*") {
                    return false;
                }
            }
        }

        return true;
        
    } catch (error) {
        // In case of parsing errors or invalid JSON structure we are throwing an error
        // This section block could be modified to handle the error more gently
        throw new Error(`Error parsing JSON or invalid structure: ${error.message}`);
    }
}

module.exports = { verifyIAMRolePolicy };