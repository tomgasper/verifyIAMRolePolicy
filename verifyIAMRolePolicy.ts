export function verifyIAMRolePolicy(policy: any) : boolean {
    // Verify that the incoming object is in correct format
    if (!policy || Object.keys(policy).length !== 2) {
        throw new Error("Invalid input: Policy JSON object can't be undefined and must contain exactly 2 attributes.");
    }
    // Verify that necessary fields exist
    if (!policy.PolicyName || !policy.PolicyDocument || !policy.PolicyDocument.Statement) {
        throw new Error("Invalid input: Missing required PolicyName, PolicyDocument or PolicyDocument.Statement fields.");
    }
    // PolicyName attribute must be a string and PolicyDoucment attribute must be an object
    if (typeof policy.PolicyName !== 'string' || typeof policy.PolicyDocument !== 'object')
    {
        throw new Error("Invalid input: PolicyName attribute must be of type 'string' and PolicyDoucment must be of type 'object'.");
    }

    const statements = policy.PolicyDocument.Statement;
    for (const statement of statements) {
        if (!statement.Resource) throw new Error("Invalid input: Missing required PolicyDocument.Statement.Resource field.");

        // Handle edge case where Resource may be an array or a single value
        const resources = Array.isArray(statement.Resource) ? statement.Resource : [statement.Resource];

        for (const resource of resources) {
            if (resource === "*") {
                return false;
            }
        }
    }

    return true;
}