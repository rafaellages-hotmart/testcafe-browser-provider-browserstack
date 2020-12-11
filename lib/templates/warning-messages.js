"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dedent_1 = __importDefault(require("dedent"));
exports.API_POLLING_INTERVAL_IS_TOO_LARGE = ({ actual, expected }) => dedent_1.default `
    The API Polling interval is set to ${actual}. It shouldn't exceed the BrowserStack idle timeout, which is ${expected}.
    Stability and performance are not guaranteed.
`;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2FybmluZy1tZXNzYWdlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90ZW1wbGF0ZXMvd2FybmluZy1tZXNzYWdlcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLG9EQUE0QjtBQUdmLFFBQUEsaUNBQWlDLEdBQUcsQ0FBQyxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLENBQUMsZ0JBQU0sQ0FBQzt5Q0FDekMsTUFBTSxpRUFBaUUsUUFBUTs7Q0FFdkgsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBkZWRlbnQgZnJvbSAnZGVkZW50JztcblxuXG5leHBvcnQgY29uc3QgQVBJX1BPTExJTkdfSU5URVJWQUxfSVNfVE9PX0xBUkdFID0gKHsgYWN0dWFsLCBleHBlY3RlZCB9KSA9PiBkZWRlbnQgYFxuICAgIFRoZSBBUEkgUG9sbGluZyBpbnRlcnZhbCBpcyBzZXQgdG8gJHthY3R1YWx9LiBJdCBzaG91bGRuJ3QgZXhjZWVkIHRoZSBCcm93c2VyU3RhY2sgaWRsZSB0aW1lb3V0LCB3aGljaCBpcyAke2V4cGVjdGVkfS5cbiAgICBTdGFiaWxpdHkgYW5kIHBlcmZvcm1hbmNlIGFyZSBub3QgZ3VhcmFudGVlZC5cbmA7XG4iXX0=