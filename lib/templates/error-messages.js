"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dedent_1 = __importDefault(require("dedent"));
exports.BROWSERSTACK_AUTHENTICATION_FAILED = () => 'Authentication failed. Please assign the correct username and access key to the BROWSERSTACK_USERNAME and BROWSERSTACK_ACCESS_KEY environment variables.';
exports.API_METHOD_NOT_IMPLEMENTED = () => 'The API method is not implemented';
exports.REMOTE_API_REQUEST_FAILED = ({ status, apiResponse }) => dedent_1.default `
    API error ${status}: 
    
    ${apiResponse}
`;
exports.SESSION_ID_NOT_FOUND = ({ sessionInfoDump }) => dedent_1.default ` 
    Unable to find a session ID in the following session information: 
    
    ${sessionInfoDump}
`;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3ItbWVzc2FnZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdGVtcGxhdGVzL2Vycm9yLW1lc3NhZ2VzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsb0RBQTRCO0FBR2YsUUFBQSxrQ0FBa0MsR0FBRyxHQUFHLEVBQUUsQ0FBQywwSkFBMEosQ0FBQztBQUN0TSxRQUFBLDBCQUEwQixHQUFXLEdBQUcsRUFBRSxDQUFDLG1DQUFtQyxDQUFDO0FBRS9FLFFBQUEseUJBQXlCLEdBQUcsQ0FBQyxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUUsRUFBRSxFQUFFLENBQUMsZ0JBQU0sQ0FBQztnQkFDN0QsTUFBTTs7TUFFaEIsV0FBVztDQUNoQixDQUFDO0FBRVcsUUFBQSxvQkFBb0IsR0FBRyxDQUFDLEVBQUUsZUFBZSxFQUFFLEVBQUUsRUFBRSxDQUFDLGdCQUFNLENBQUM7OztNQUc5RCxlQUFlO0NBQ3BCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZGVkZW50IGZyb20gJ2RlZGVudCc7XG5cblxuZXhwb3J0IGNvbnN0IEJST1dTRVJTVEFDS19BVVRIRU5USUNBVElPTl9GQUlMRUQgPSAoKSA9PiAnQXV0aGVudGljYXRpb24gZmFpbGVkLiBQbGVhc2UgYXNzaWduIHRoZSBjb3JyZWN0IHVzZXJuYW1lIGFuZCBhY2Nlc3Mga2V5IHRvIHRoZSBCUk9XU0VSU1RBQ0tfVVNFUk5BTUUgYW5kIEJST1dTRVJTVEFDS19BQ0NFU1NfS0VZIGVudmlyb25tZW50IHZhcmlhYmxlcy4nO1xuZXhwb3J0IGNvbnN0IEFQSV9NRVRIT0RfTk9UX0lNUExFTUVOVEVEID0gICAgICAgICAoKSA9PiAnVGhlIEFQSSBtZXRob2QgaXMgbm90IGltcGxlbWVudGVkJztcblxuZXhwb3J0IGNvbnN0IFJFTU9URV9BUElfUkVRVUVTVF9GQUlMRUQgPSAoeyBzdGF0dXMsIGFwaVJlc3BvbnNlIH0pID0+IGRlZGVudCBgXG4gICAgQVBJIGVycm9yICR7c3RhdHVzfTogXG4gICAgXG4gICAgJHthcGlSZXNwb25zZX1cbmA7XG5cbmV4cG9ydCBjb25zdCBTRVNTSU9OX0lEX05PVF9GT1VORCA9ICh7IHNlc3Npb25JbmZvRHVtcCB9KSA9PiBkZWRlbnQgYCBcbiAgICBVbmFibGUgdG8gZmluZCBhIHNlc3Npb24gSUQgaW4gdGhlIGZvbGxvd2luZyBzZXNzaW9uIGluZm9ybWF0aW9uOiBcbiAgICBcbiAgICAke3Nlc3Npb25JbmZvRHVtcH1cbmA7XG4iXX0=