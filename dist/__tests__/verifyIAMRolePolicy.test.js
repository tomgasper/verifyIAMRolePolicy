import { describe, it, expect } from 'vitest';
import { verifyIAMRolePolicy } from '../src/verifyIAMRolePolicy';
describe('verifyIAMRolePolicy', function () {
    it('returns false if the input object does not have exactly two attributes', function () {
        var inputJSON = {
            "ExtraPolicyAttribute": {},
            "PolicyName": "somePolicyName",
            "PolicyDocument": {
                "Statement": [
                    { Resource: "arn:aws:iam::123456789012:user/*" },
                    { Resource: "arn:aws:iam::123456789012:user2/*" }
                ]
            }
        };
        expect(function () { return verifyIAMRolePolicy(inputJSON); }).toThrow("Invalid input: Policy JSON object can't be undefined and must contain exactly 2 attributes.");
    });
    it('returns false if the PolicyName attribute is in an incorrect format', function () {
        var inputJSON = {
            "PolicyName": {},
            "PolicyDocument": {
                "Statement": [
                    { Resource: "arn:aws:iam::123456789012:user/*" },
                    { Resource: "arn:aws:iam::123456789012:user2/*" }
                ]
            }
        };
        expect(function () { return verifyIAMRolePolicy(inputJSON); }).toThrow("Invalid input: PolicyName attribute must be of type 'string' and PolicyDoucment must be of type 'object'.");
    });
    it('returns false if the statement Resource is exactly "*" in the example JSON', function () {
        var inputJSON = {
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
            }
        };
        expect(verifyIAMRolePolicy(inputJSON)).toBe(false);
    });
    it('returns false if any statement Resource is exactly "*"', function () {
        var inputJSON = {
            PolicyName: "somePolicyName",
            PolicyDocument: {
                Statement: [
                    { Resource: "arn:aws:iam::123456789012:user/*" },
                    { Resource: "*" },
                    { Resource: "*" }
                ]
            }
        };
        expect(verifyIAMRolePolicy(inputJSON)).toBe(false);
    });
    it('returns true if no statement Resource is exactly "*"', function () {
        var inputJSON = {
            PolicyName: "somePolicyName",
            PolicyDocument: {
                Statement: [
                    { Resource: "arn:aws:iam::123456789012:user/*" },
                    { Resource: "arn:aws:iam::123456789012:user2/*" }
                ]
            }
        };
        expect(verifyIAMRolePolicy(inputJSON)).toBe(true);
    });
    it('throws an error if the Resource field is missing in any of the statements', function () {
        var inputJSON = {
            PolicyName: "somePolicyName",
            PolicyDocument: {
                Statement: [
                    { "Sid": "IamListAccess",
                        "Effect": "Allow",
                        "Action": [
                            "iam:ListRoles",
                            "iam:ListUsers"
                        ] },
                    { "Resource": "arn:aws:iam::123456789012:user2/*" }
                ]
            }
        };
        expect(function () { return verifyIAMRolePolicy(inputJSON); }).toThrow("Invalid input: Missing required PolicyDocument.Statement.Resource field.");
    });
    it('throws an error when the JSON is missing PolicyDocument or Statement', function () {
        var inputJSON = { SomeOtherDocument: {} };
        expect(function () { return verifyIAMRolePolicy(inputJSON); }).toThrow("Invalid input: Policy JSON object can't be undefined and must contain exactly 2 attributes.");
    });
    it('returns true when Resource is an array not containing a single "*"', function () {
        var inputJSON = {
            PolicyName: "somePolicyName",
            PolicyDocument: {
                Statement: [
                    { Resource: ["arn:aws:iam::123456789012:user/*", "arn:aws:iam::*123"] }
                ]
            }
        };
        expect(verifyIAMRolePolicy(inputJSON)).toBe(true);
    });
});
