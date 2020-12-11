"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const pinkie_1 = __importDefault(require("pinkie"));
const request_promise_1 = __importDefault(require("request-promise"));
const ERROR_MESSAGES = __importStar(require("../templates/error-messages"));
const apiRequestPromise = pinkie_1.default.resolve(null);
function default_1(apiPath, params = {}) {
    if (!process.env['BROWSERSTACK_USERNAME'] || !process.env['BROWSERSTACK_ACCESS_KEY'])
        throw new Error(ERROR_MESSAGES.BROWSERSTACK_AUTHENTICATION_FAILED());
    var { body, executeImmediately } = params, queryParams = __rest(params, ["body", "executeImmediately"]);
    var opts = {
        url: apiPath.url,
        auth: {
            user: process.env['BROWSERSTACK_USERNAME'],
            pass: process.env['BROWSERSTACK_ACCESS_KEY'],
        },
        headers: {
            'user-agent': 'testcafe-browserstack',
        },
        qs: Object.assign({}, queryParams),
        method: apiPath.method || 'GET',
        json: apiPath.encoding === void 0
    };
    const proxy = process.env['BROWSERSTACK_PROXY'];
    if (proxy)
        opts.proxy = `http://${proxy}`;
    if (body)
        opts.body = body;
    if (apiPath.encoding !== void 0)
        opts.encoding = apiPath.encoding;
    const chainPromise = executeImmediately ? pinkie_1.default.resolve(null) : apiRequestPromise;
    const currentRequestPromise = chainPromise
        .then(() => request_promise_1.default(opts))
        .catch(error => {
        if (error.statusCode === 401)
            throw new Error(ERROR_MESSAGES.BROWSERSTACK_AUTHENTICATION_FAILED());
        throw error;
    });
    return currentRequestPromise;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVxdWVzdC1hcGkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXRpbHMvcmVxdWVzdC1hcGkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvREFBNkI7QUFDN0Isc0VBQXNDO0FBQ3RDLDRFQUE4RDtBQUU5RCxNQUFNLGlCQUFpQixHQUFHLGdCQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBRWhELG1CQUF5QixPQUFPLEVBQUUsTUFBTSxHQUFHLEVBQUU7SUFDekMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsdUJBQXVCLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMseUJBQXlCLENBQUM7UUFDaEYsTUFBTSxJQUFJLEtBQUssQ0FBQyxjQUFjLENBQUMsa0NBQWtDLEVBQUUsQ0FBQyxDQUFDO0lBRXpFLElBQUksRUFBRSxJQUFJLEVBQUUsa0JBQWtCLEtBQXFCLE1BQU0sRUFBekIsNERBQXlCLENBQUM7SUFFMUQsSUFBSSxJQUFJLEdBQUc7UUFDUCxHQUFHLEVBQUcsT0FBTyxDQUFDLEdBQUc7UUFDakIsSUFBSSxFQUFFO1lBQ0YsSUFBSSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsdUJBQXVCLENBQUM7WUFDMUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMseUJBQXlCLENBQUM7U0FDL0M7UUFFRCxPQUFPLEVBQUU7WUFDTCxZQUFZLEVBQUUsdUJBQXVCO1NBQ3hDO1FBRUQsRUFBRSxvQkFBTyxXQUFXLENBQUU7UUFFdEIsTUFBTSxFQUFFLE9BQU8sQ0FBQyxNQUFNLElBQUksS0FBSztRQUMvQixJQUFJLEVBQUksT0FBTyxDQUFDLFFBQVEsS0FBSyxLQUFLLENBQUM7S0FDdEMsQ0FBQztJQUVGLE1BQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsb0JBQW9CLENBQUMsQ0FBQztJQUVoRCxJQUFJLEtBQUs7UUFDTCxJQUFJLENBQUMsS0FBSyxHQUFHLFVBQVUsS0FBSyxFQUFFLENBQUM7SUFFbkMsSUFBSSxJQUFJO1FBQ0osSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7SUFFckIsSUFBSSxPQUFPLENBQUMsUUFBUSxLQUFLLEtBQUssQ0FBQztRQUMzQixJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUM7SUFFckMsTUFBTSxZQUFZLEdBQUcsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLGdCQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQztJQUVwRixNQUFNLHFCQUFxQixHQUFHLFlBQVk7U0FDckMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLHlCQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDekIsS0FBSyxDQUFDLEtBQUssQ0FBQyxFQUFFO1FBQ1gsSUFBSSxLQUFLLENBQUMsVUFBVSxLQUFLLEdBQUc7WUFDeEIsTUFBTSxJQUFJLEtBQUssQ0FBQyxjQUFjLENBQUMsa0NBQWtDLEVBQUUsQ0FBQyxDQUFDO1FBRXpFLE1BQU0sS0FBSyxDQUFDO0lBQ2hCLENBQUMsQ0FBQyxDQUFDO0lBRVAsT0FBTyxxQkFBcUIsQ0FBQztBQUNqQyxDQUFDO0FBOUNELDRCQThDQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQcm9taXNlIGZyb20gJ3BpbmtpZSc7XG5pbXBvcnQgcmVxdWVzdCBmcm9tICdyZXF1ZXN0LXByb21pc2UnO1xuaW1wb3J0ICogYXMgRVJST1JfTUVTU0FHRVMgZnJvbSAnLi4vdGVtcGxhdGVzL2Vycm9yLW1lc3NhZ2VzJztcblxuY29uc3QgYXBpUmVxdWVzdFByb21pc2UgPSBQcm9taXNlLnJlc29sdmUobnVsbCk7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChhcGlQYXRoLCBwYXJhbXMgPSB7fSkge1xuICAgIGlmICghcHJvY2Vzcy5lbnZbJ0JST1dTRVJTVEFDS19VU0VSTkFNRSddIHx8ICFwcm9jZXNzLmVudlsnQlJPV1NFUlNUQUNLX0FDQ0VTU19LRVknXSlcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKEVSUk9SX01FU1NBR0VTLkJST1dTRVJTVEFDS19BVVRIRU5USUNBVElPTl9GQUlMRUQoKSk7XG5cbiAgICB2YXIgeyBib2R5LCBleGVjdXRlSW1tZWRpYXRlbHksIC4uLnF1ZXJ5UGFyYW1zIH0gPSBwYXJhbXM7XG5cbiAgICB2YXIgb3B0cyA9IHtcbiAgICAgICAgdXJsOiAgYXBpUGF0aC51cmwsXG4gICAgICAgIGF1dGg6IHtcbiAgICAgICAgICAgIHVzZXI6IHByb2Nlc3MuZW52WydCUk9XU0VSU1RBQ0tfVVNFUk5BTUUnXSxcbiAgICAgICAgICAgIHBhc3M6IHByb2Nlc3MuZW52WydCUk9XU0VSU1RBQ0tfQUNDRVNTX0tFWSddLFxuICAgICAgICB9LFxuXG4gICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICd1c2VyLWFnZW50JzogJ3Rlc3RjYWZlLWJyb3dzZXJzdGFjaycsXG4gICAgICAgIH0sXG5cbiAgICAgICAgcXM6IHsgLi4ucXVlcnlQYXJhbXMgfSxcblxuICAgICAgICBtZXRob2Q6IGFwaVBhdGgubWV0aG9kIHx8ICdHRVQnLFxuICAgICAgICBqc29uOiAgIGFwaVBhdGguZW5jb2RpbmcgPT09IHZvaWQgMFxuICAgIH07XG5cbiAgICBjb25zdCBwcm94eSA9IHByb2Nlc3MuZW52WydCUk9XU0VSU1RBQ0tfUFJPWFknXTtcblxuICAgIGlmIChwcm94eSlcbiAgICAgICAgb3B0cy5wcm94eSA9IGBodHRwOi8vJHtwcm94eX1gO1xuXG4gICAgaWYgKGJvZHkpXG4gICAgICAgIG9wdHMuYm9keSA9IGJvZHk7XG5cbiAgICBpZiAoYXBpUGF0aC5lbmNvZGluZyAhPT0gdm9pZCAwKVxuICAgICAgICBvcHRzLmVuY29kaW5nID0gYXBpUGF0aC5lbmNvZGluZztcblxuICAgIGNvbnN0IGNoYWluUHJvbWlzZSA9IGV4ZWN1dGVJbW1lZGlhdGVseSA/IFByb21pc2UucmVzb2x2ZShudWxsKSA6IGFwaVJlcXVlc3RQcm9taXNlO1xuXG4gICAgY29uc3QgY3VycmVudFJlcXVlc3RQcm9taXNlID0gY2hhaW5Qcm9taXNlXG4gICAgICAgIC50aGVuKCgpID0+IHJlcXVlc3Qob3B0cykpXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgICBpZiAoZXJyb3Iuc3RhdHVzQ29kZSA9PT0gNDAxKVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihFUlJPUl9NRVNTQUdFUy5CUk9XU0VSU1RBQ0tfQVVUSEVOVElDQVRJT05fRkFJTEVEKCkpO1xuXG4gICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgfSk7XG5cbiAgICByZXR1cm4gY3VycmVudFJlcXVlc3RQcm9taXNlO1xufVxuIl19