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
Object.defineProperty(exports, "__esModule", { value: true });
const jimp_1 = __importDefault(require("jimp"));
const base_1 = __importDefault(require("./base"));
const request_api_1 = __importDefault(require("../utils/request-api"));
const create_browserstack_status_1 = __importDefault(require("../utils/create-browserstack-status"));
const TESTS_TIMEOUT = process.env['BROWSERSTACK_TEST_TIMEOUT'] || 1800;
const BROWSERSTACK_API_PATHS = {
    browserList: {
        url: 'https://api.browserstack.com/4/browsers?flat=true'
    },
    newWorker: {
        url: 'https://api.browserstack.com/4/worker',
        method: 'POST'
    },
    getWorkerInfo: id => ({
        url: `https://api.browserstack.com/4/worker/${id}`
    }),
    deleteWorker: id => ({
        url: `https://api.browserstack.com/4/worker/${id}`,
        method: 'DELETE'
    }),
    screenshot: id => ({
        url: `https://api.browserstack.com/4/worker/${id}/screenshot.png`,
        encoding: null
    }),
    setStatus: id => ({
        url: `https://api.browserstack.com/automate/sessions/${id}.json`,
        method: 'PUT'
    })
};
class JSTestingBackend extends base_1.default {
    constructor(...args) {
        super(...args);
        this.workers = {};
    }
    async _requestSessionUrl(id) {
        var workerInfo = await request_api_1.default(BROWSERSTACK_API_PATHS.getWorkerInfo(this.workers[id].id));
        return workerInfo['browser_url'];
    }
    async _getSessionId(id) {
        var sessionIdMatch = this.workers[id].sessionUrl.match(/[^/]*$/);
        return sessionIdMatch && sessionIdMatch[0];
    }
    async getBrowsersList() {
        var platformsInfo = await request_api_1.default(BROWSERSTACK_API_PATHS.browserList);
        return platformsInfo.reverse();
    }
    getSessionUrl(id) {
        return this.workers[id] ? this.workers[id].sessionUrl : '';
    }
    async openBrowser(id, pageUrl, capabilities) {
        var { local } = capabilities, restCapabilities = __rest(capabilities, ["local"]);
        capabilities = Object.assign({ 'browserstack.local': local, timeout: TESTS_TIMEOUT, url: pageUrl }, restCapabilities);
        this.workers[id] = await request_api_1.default(BROWSERSTACK_API_PATHS.newWorker, Object.assign({ executeImmediately: true }, capabilities));
        this.workers[id].started = Date.now();
        this.workers[id].sessionUrl = await this._requestSessionUrl(id);
        this.workers[id].sessionId = await this._getSessionId(id);
    }
    async closeBrowser(id) {
        var workerId = this.workers[id].id;
        // Return incase of invalid workerId
        if (!workerId || workerId === '')
            return;
        await request_api_1.default(BROWSERSTACK_API_PATHS.deleteWorker(workerId));
    }
    async takeScreenshot(id, screenshotPath) {
        var buffer = await request_api_1.default(BROWSERSTACK_API_PATHS.screenshot(this.workers[id].id));
        var image = await jimp_1.default.read(buffer);
        await image.writeAsync(screenshotPath);
    }
    async resizeWindow(id) {
        this.reportWarning(id, 'The window resize functionality is not supported by the Browserstack JS Testing API. Use the Browserstack Automate API.');
    }
    async maximizeWindow(id) {
        this.reportWarning(id, 'The window maximization functionality is not supported by the Browserstack JS Testing API. Use the Browserstack Automate API.');
    }
    async reportJobResult(id, jobResult, jobData, possibleResults) {
        var sessionId = this.workers[id].sessionId;
        var jobStatus = create_browserstack_status_1.default(jobResult, jobData, possibleResults);
        await request_api_1.default(BROWSERSTACK_API_PATHS.setStatus(sessionId), { body: jobStatus });
    }
}
exports.default = JSTestingBackend;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianMtdGVzdGluZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9iYWNrZW5kcy9qcy10ZXN0aW5nLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxnREFBd0I7QUFDeEIsa0RBQWlDO0FBQ2pDLHVFQUE4QztBQUM5QyxxR0FBMkU7QUFHM0UsTUFBTSxhQUFhLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQywyQkFBMkIsQ0FBQyxJQUFJLElBQUksQ0FBQztBQUV2RSxNQUFNLHNCQUFzQixHQUFHO0lBQzNCLFdBQVcsRUFBRTtRQUNULEdBQUcsRUFBRSxtREFBbUQ7S0FDM0Q7SUFFRCxTQUFTLEVBQUU7UUFDUCxHQUFHLEVBQUssdUNBQXVDO1FBQy9DLE1BQU0sRUFBRSxNQUFNO0tBQ2pCO0lBRUQsYUFBYSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNsQixHQUFHLEVBQUUseUNBQXlDLEVBQUUsRUFBRTtLQUNyRCxDQUFDO0lBRUYsWUFBWSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNqQixHQUFHLEVBQUsseUNBQXlDLEVBQUUsRUFBRTtRQUNyRCxNQUFNLEVBQUUsUUFBUTtLQUNuQixDQUFDO0lBRUYsVUFBVSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNmLEdBQUcsRUFBTyx5Q0FBeUMsRUFBRSxpQkFBaUI7UUFDdEUsUUFBUSxFQUFFLElBQUk7S0FDakIsQ0FBQztJQUVGLFNBQVMsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDZCxHQUFHLEVBQUssa0RBQWtELEVBQUUsT0FBTztRQUNuRSxNQUFNLEVBQUUsS0FBSztLQUNoQixDQUFDO0NBQ0wsQ0FBQztBQUVGLE1BQXFCLGdCQUFpQixTQUFRLGNBQVc7SUFDckQsWUFBYSxHQUFHLElBQUk7UUFDaEIsS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUM7UUFFZixJQUFJLENBQUMsT0FB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LEVBQUU7UUFDbEIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxFQUFFLEVBQUUseUhBQXlILENBQUMsQ0FBQztJQUN0SixDQUFDO0lBRUQsS0FBSyxDQUFDLGNBQWMsQ0FBRSxFQUFFO1FBQ3BCLElBQUksQ0FBQyxhQUFhLENBQUMsRUFBRSxFQUFFLCtIQUErSCxDQUFDLENBQUM7SUFDNUosQ0FBQztJQUVELEtBQUssQ0FBQyxlQUFlLENBQUUsRUFBRSxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUUsZUFBZTtRQUMxRCxJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQztRQUMzQyxJQUFJLFNBQVMsR0FBRyxvQ0FBd0IsQ0FBQyxTQUFTLEVBQUUsT0FBTyxFQUFFLGVBQWUsQ0FBQyxDQUFDO1FBRTlFLE1BQU0scUJBQVUsQ0FBQyxzQkFBc0IsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLEVBQUUsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLENBQUMsQ0FBQztJQUN2RixDQUFDO0NBQ0o7QUFwRkQsbUNBb0ZDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGppbXAgZnJvbSAnamltcCc7XG5pbXBvcnQgQmFzZUJhY2tlbmQgZnJvbSAnLi9iYXNlJztcbmltcG9ydCByZXF1ZXN0QXBpIGZyb20gJy4uL3V0aWxzL3JlcXVlc3QtYXBpJztcbmltcG9ydCBjcmVhdGVCcm93c2Vyc3RhY2tTdGF0dXMgZnJvbSAnLi4vdXRpbHMvY3JlYXRlLWJyb3dzZXJzdGFjay1zdGF0dXMnO1xuXG5cbmNvbnN0IFRFU1RTX1RJTUVPVVQgPSBwcm9jZXNzLmVudlsnQlJPV1NFUlNUQUNLX1RFU1RfVElNRU9VVCddIHx8IDE4MDA7XG5cbmNvbnN0IEJST1dTRVJTVEFDS19BUElfUEFUSFMgPSB7XG4gICAgYnJvd3Nlckxpc3Q6IHtcbiAgICAgICAgdXJsOiAnaHR0cHM6Ly9hcGkuYnJvd3NlcnN0YWNrLmNvbS80L2Jyb3dzZXJzP2ZsYXQ9dHJ1ZSdcbiAgICB9LFxuXG4gICAgbmV3V29ya2VyOiB7XG4gICAgICAgIHVybDogICAgJ2h0dHBzOi8vYXBpLmJyb3dzZXJzdGFjay5jb20vNC93b3JrZXInLFxuICAgICAgICBtZXRob2Q6ICdQT1NUJ1xuICAgIH0sXG5cbiAgICBnZXRXb3JrZXJJbmZvOiBpZCA9PiAoe1xuICAgICAgICB1cmw6IGBodHRwczovL2FwaS5icm93c2Vyc3RhY2suY29tLzQvd29ya2VyLyR7aWR9YFxuICAgIH0pLFxuXG4gICAgZGVsZXRlV29ya2VyOiBpZCA9PiAoe1xuICAgICAgICB1cmw6ICAgIGBodHRwczovL2FwaS5icm93c2Vyc3RhY2suY29tLzQvd29ya2VyLyR7aWR9YCxcbiAgICAgICAgbWV0aG9kOiAnREVMRVRFJ1xuICAgIH0pLFxuXG4gICAgc2NyZWVuc2hvdDogaWQgPT4gKHtcbiAgICAgICAgdXJsOiAgICAgIGBodHRwczovL2FwaS5icm93c2Vyc3RhY2suY29tLzQvd29ya2VyLyR7aWR9L3NjcmVlbnNob3QucG5nYCxcbiAgICAgICAgZW5jb2Rpbmc6IG51bGxcbiAgICB9KSxcblxuICAgIHNldFN0YXR1czogaWQgPT4gKHtcbiAgICAgICAgdXJsOiAgICBgaHR0cHM6Ly9hcGkuYnJvd3NlcnN0YWNrLmNvbS9hdXRvbWF0ZS9zZXNzaW9ucy8ke2lkfS5qc29uYCxcbiAgICAgICAgbWV0aG9kOiAnUFVUJ1xuICAgIH0pXG59O1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBKU1Rlc3RpbmdCYWNrZW5kIGV4dGVuZHMgQmFzZUJhY2tlbmQge1xuICAgIGNvbnN0cnVjdG9yICguLi5hcmdzKSB7XG4gICAgICAgIHN1cGVyKC4uLmFyZ3MpO1xuXG4gICAgICAgIHRoaXMud29ya2VycyA9IHt9O1xuICAgIH1cblxuICAgIGFzeW5jIF9yZXF1ZXN0U2Vzc2lvblVybCAoaWQpIHtcbiAgICAgICAgdmFyIHdvcmtlckluZm8gPSBhd2FpdCByZXF1ZXN0QXBpKEJST1dTRVJTVEFDS19BUElfUEFUSFMuZ2V0V29ya2VySW5mbyh0aGlzLndvcmtlcnNbaWRdLmlkKSk7XG5cbiAgICAgICAgcmV0dXJuIHdvcmtlckluZm9bJ2Jyb3dzZXJfdXJsJ107XG4gICAgfVxuXG4gICAgYXN5bmMgX2dldFNlc3Npb25JZCAoaWQpIHtcbiAgICAgICAgdmFyIHNlc3Npb25JZE1hdGNoID0gdGhpcy53b3JrZXJzW2lkXS5zZXNzaW9uVXJsLm1hdGNoKC9bXi9dKiQvKTtcblxuICAgICAgICByZXR1cm4gc2Vzc2lvbklkTWF0Y2ggJiYgc2Vzc2lvbklkTWF0Y2hbMF07XG4gICAgfVxuXG4gICAgYXN5bmMgZ2V0QnJvd3NlcnNMaXN0ICgpIHtcbiAgICAgICAgdmFyIHBsYXRmb3Jtc0luZm8gPSBhd2FpdCByZXF1ZXN0QXBpKEJST1dTRVJTVEFDS19BUElfUEFUSFMuYnJvd3Nlckxpc3QpO1xuXG4gICAgICAgIHJldHVybiBwbGF0Zm9ybXNJbmZvLnJldmVyc2UoKTtcbiAgICB9XG5cbiAgICBnZXRTZXNzaW9uVXJsIChpZCkge1xuICAgICAgICByZXR1cm4gdGhpcy53b3JrZXJzW2lkXSA/IHRoaXMud29ya2Vyc1tpZF0uc2Vzc2lvblVybCA6ICcnO1xuICAgIH1cblxuICAgIGFzeW5jIG9wZW5Ccm93c2VyIChpZCwgcGFnZVVybCwgY2FwYWJpbGl0aWVzKSB7XG4gICAgICAgIHZhciB7IGxvY2FsLCAuLi5yZXN0Q2FwYWJpbGl0aWVzIH0gPSBjYXBhYmlsaXRpZXM7XG5cbiAgICAgICAgY2FwYWJpbGl0aWVzID0ge1xuICAgICAgICAgICAgJ2Jyb3dzZXJzdGFjay5sb2NhbCc6IGxvY2FsLFxuXG4gICAgICAgICAgICB0aW1lb3V0OiBURVNUU19USU1FT1VULFxuICAgICAgICAgICAgdXJsOiAgICAgcGFnZVVybCxcblxuICAgICAgICAgICAgLi4ucmVzdENhcGFiaWxpdGllc1xuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMud29ya2Vyc1tpZF0gPSBhd2FpdCByZXF1ZXN0QXBpKEJST1dTRVJTVEFDS19BUElfUEFUSFMubmV3V29ya2VyLCB7XG4gICAgICAgICAgICBleGVjdXRlSW1tZWRpYXRlbHk6IHRydWUsXG5cbiAgICAgICAgICAgIC4uLmNhcGFiaWxpdGllc1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLndvcmtlcnNbaWRdLnN0YXJ0ZWQgICAgPSBEYXRlLm5vdygpO1xuICAgICAgICB0aGlzLndvcmtlcnNbaWRdLnNlc3Npb25VcmwgPSBhd2FpdCB0aGlzLl9yZXF1ZXN0U2Vzc2lvblVybChpZCk7XG4gICAgICAgIHRoaXMud29ya2Vyc1tpZF0uc2Vzc2lvbklkICA9IGF3YWl0IHRoaXMuX2dldFNlc3Npb25JZChpZCk7XG4gICAgfVxuXG4gICAgYXN5bmMgY2xvc2VCcm93c2VyIChpZCkge1xuICAgICAgICB2YXIgd29ya2VySWQgICA9IHRoaXMud29ya2Vyc1tpZF0uaWQ7XG5cbiAgICAgICAgLy8gUmV0dXJuIGluY2FzZSBvZiBpbnZhbGlkIHdvcmtlcklkXG4gICAgICAgIGlmICghd29ya2VySWQgfHwgd29ya2VySWQgPT09ICcnKVxuICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgIGF3YWl0IHJlcXVlc3RBcGkoQlJPV1NFUlNUQUNLX0FQSV9QQVRIUy5kZWxldGVXb3JrZXIod29ya2VySWQpKTtcblxuICAgIH1cblxuICAgIGFzeW5jIHRha2VTY3JlZW5zaG90IChpZCwgc2NyZWVuc2hvdFBhdGgpIHtcbiAgICAgICAgdmFyIGJ1ZmZlciA9IGF3YWl0IHJlcXVlc3RBcGkoQlJPV1NFUlNUQUNLX0FQSV9QQVRIUy5zY3JlZW5zaG90KHRoaXMud29ya2Vyc1tpZF0uaWQpKTtcbiAgICAgICAgdmFyIGltYWdlID0gYXdhaXQgamltcC5yZWFkKGJ1ZmZlcik7XG5cbiAgICAgICAgYXdhaXQgaW1hZ2Uud3JpdGVBc3luYyhzY3JlZW5zaG90UGF0aCk7XG4gICAgfVxuXG4gICAgYXN5bmMgcmVzaXplV2luZG93IChpZCkge1xuICAgICAgICB0aGlzLnJlcG9ydFdhcm5pbmcoaWQsICdUaGUgd2luZG93IHJlc2l6ZSBmdW5jdGlvbmFsaXR5IGlzIG5vdCBzdXBwb3J0ZWQgYnkgdGhlIEJyb3dzZXJzdGFjayBKUyBUZXN0aW5nIEFQSS4gVXNlIHRoZSBCcm93c2Vyc3RhY2sgQXV0b21hdGUgQVBJLicpO1xuICAgIH1cblxuICAgIGFzeW5jIG1heGltaXplV2luZG93IChpZCkge1xuICAgICAgICB0aGlzLnJlcG9ydFdhcm5pbmcoaWQsICdUaGUgd2luZG93IG1heGltaXphdGlvbiBmdW5jdGlvbmFsaXR5IGlzIG5vdCBzdXBwb3J0ZWQgYnkgdGhlIEJyb3dzZXJzdGFjayBKUyBUZXN0aW5nIEFQSS4gVXNlIHRoZSBCcm93c2Vyc3RhY2sgQXV0b21hdGUgQVBJLicpO1xuICAgIH1cblxuICAgIGFzeW5jIHJlcG9ydEpvYlJlc3VsdCAoaWQsIGpvYlJlc3VsdCwgam9iRGF0YSwgcG9zc2libGVSZXN1bHRzKSB7XG4gICAgICAgIHZhciBzZXNzaW9uSWQgPSB0aGlzLndvcmtlcnNbaWRdLnNlc3Npb25JZDtcbiAgICAgICAgdmFyIGpvYlN0YXR1cyA9IGNyZWF0ZUJyb3dzZXJzdGFja1N0YXR1cyhqb2JSZXN1bHQsIGpvYkRhdGEsIHBvc3NpYmxlUmVzdWx0cyk7XG5cbiAgICAgICAgYXdhaXQgcmVxdWVzdEFwaShCUk9XU0VSU1RBQ0tfQVBJX1BBVEhTLnNldFN0YXR1cyhzZXNzaW9uSWQpLCB7IGJvZHk6IGpvYlN0YXR1cyB9KTtcbiAgICB9XG59XG5cbiJdfQ==