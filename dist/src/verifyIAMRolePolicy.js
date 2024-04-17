export function verifyIAMRolePolicy(policy) {
    // Verify that the incoming object is in correct format
    if (!policy || Object.keys(policy).length !== 2) {
        throw new Error("Invalid input: Policy JSON object can't be undefined and must contain exactly 2 attributes.");
    }
    // Verify that necessary fields exist
    if (!policy.PolicyName || !policy.PolicyDocument || !policy.PolicyDocument.Statement) {
        throw new Error("Invalid input: Missing required PolicyName, PolicyDocument or PolicyDocument.Statement fields.");
    }
    // PolicyName attribute must be a string and PolicyDoucment attribute must be an object
    if (typeof policy.PolicyName !== 'string' || typeof policy.PolicyDocument !== 'object') {
        throw new Error("Invalid input: PolicyName attribute must be of type 'string' and PolicyDoucment must be of type 'object'.");
    }
    var statements = policy.PolicyDocument.Statement;
    for (var _i = 0, statements_1 = statements; _i < statements_1.length; _i++) {
        var statement = statements_1[_i];
        if (!statement.Resource)
            throw new Error("Invalid input: Missing required PolicyDocument.Statement.Resource field.");
        // Handle edge case where Resource may be an array or a single value
        var resources = Array.isArray(statement.Resource) ? statement.Resource : [statement.Resource];
        for (var _a = 0, resources_1 = resources; _a < resources_1.length; _a++) {
            var resource = resources_1[_a];
            if (resource === "*") {
                return false;
            }
        }
    }
    return true;
}
