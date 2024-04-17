const { verifyIAMRolePolicy } = require('../verifyIAMRolePolicy.js');

describe('verifyIAMRolePolicy', () => {
    {
        test('returns false if the statement Resource is exactly "* in the example JSNO"', () => {
            const inputJSON = JSON.stringify({
                "PolicyName": "root",
                "PolicyDocument": {
                "Version": "2012-10-17",
                "Statement": [
                    {
                        "Sid": "IamListAccess",
                        "Effect": "Allow",
                        "Action": [
                            "iam:ListRoles",
                            "iam:ListUsers"
                        ],
                        "Resource": "*"
                    }
                ]
            }});

            expect(verifyIAMRolePolicy(inputJSON)).toBe(false);

        });

    test('returns false if any statement Resource is exactly "*"', () => {
        const inputJSON = JSON.stringify({
            PolicyDocument: {
                Statement: [
                    { Resource: "arn:aws:iam::123456789012:user/*" },
                    { Resource: "*" },
                    { Resource: "*" }
                ]
            }
        });
        expect(verifyIAMRolePolicy(inputJSON)).toBe(false);
    });

    test('returns true if no statement Resource is exactly "*"', () => {
        const inputJSON = JSON.stringify({
            PolicyDocument: {
                Statement: [
                    { Resource: "arn:aws:iam::123456789012:user/*" },
                    { Resource: "arn:aws:iam::123456789012:user2/*"}
                ]
            }
        });
        expect(verifyIAMRolePolicy(inputJSON)).toBe(true);
    });

    test('throws an error for malformed JSON', () => {
        const inputJSON = `{"PolicyDocument": "oops"`;
        expect(() => verifyIAMRolePolicy(inputJSON)).toThrow("Error parsing JSON or invalid structure");
    });

    test('throws an error when JSON is missing PolicyDocument or Statement', () => {
        const inputJSON = JSON.stringify({ SomeOtherDocument: {} });
        expect(() => verifyIAMRolePolicy(inputJSON)).toThrow("Invalid input: Missing required PolicyDocument or Statement fields.");
    });

    test('returns true when Resource is an array not containing a single "*"', () => {
        const inputJSON = JSON.stringify({
            PolicyDocument: {
                Statement: [
                    { Resource: ["arn:aws:iam::123456789012:user/*", "arn:aws:iam::*123"] }
                ]
            }
        });
        expect(verifyIAMRolePolicy(inputJSON)).toBe(true);
    });
    }
});