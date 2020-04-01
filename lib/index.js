'use strict';

exports.__esModule = true;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _url = require('url');

var _pinkie = require('pinkie');

var _pinkie2 = _interopRequireDefault(_pinkie);

var _util = require('util');

var _desiredCapabilities = require('desired-capabilities');

var _desiredCapabilities2 = _interopRequireDefault(_desiredCapabilities);

var _lodash = require('lodash');

var _connector = require('./connector');

var _connector2 = _interopRequireDefault(_connector);

var _jsTesting = require('./backends/js-testing');

var _jsTesting2 = _interopRequireDefault(_jsTesting);

var _automate = require('./backends/automate');

var _automate2 = _interopRequireDefault(_automate);

var _browserProxy = require('./browser-proxy');

var _browserProxy2 = _interopRequireDefault(_browserProxy);

var _isEnvVarTrue = require('./utils/is-env-var-true');

var _isEnvVarTrue2 = _interopRequireDefault(_isEnvVarTrue);

var _mimeDb = require('mime-db');

var _mimeDb2 = _interopRequireDefault(_mimeDb);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ANDROID_PROXY_RESPONSE_DELAY = 500;

var isAutomateEnabled = function isAutomateEnabled() {
    return (0, _isEnvVarTrue2.default)('BROWSERSTACK_USE_AUTOMATE');
};
var isLocalEnabled = function isLocalEnabled() {
    return !!process.env.BROWSERSTACK_LOCAL_IDENTIFIER || !(0, _isEnvVarTrue2.default)('BROWSERSTACK_NO_LOCAL');
};

function getMimeTypes() {
    var mimeTypes = (0, _keys2.default)(_mimeDb2.default);

    return mimeTypes.filter(function (mimeType) {
        var extensions = _mimeDb2.default[mimeType].extensions;


        return extensions && extensions.length;
    }).join(',');
}

exports.default = {
    // Multiple browsers support
    isMultiBrowser: true,

    backend: null,

    connectorPromise: _pinkie2.default.resolve(null),
    browserProxyPromise: _pinkie2.default.resolve(null),

    workers: {},
    platformsInfo: [],
    browserNames: [],

    _createConnector: function _createConnector() {
        var _this = this;

        this.connectorPromise = this.connectorPromise.then(function () {
            var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(connector) {
                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                if (connector) {
                                    _context.next = 4;
                                    break;
                                }

                                connector = new _connector2.default(process.env['BROWSERSTACK_ACCESS_KEY']);

                                _context.next = 4;
                                return connector.create();

                            case 4:
                                return _context.abrupt('return', connector);

                            case 5:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, _this);
            }));

            return function (_x) {
                return _ref.apply(this, arguments);
            };
        }());

        return this.connectorPromise;
    },
    _disposeConnector: function _disposeConnector() {
        var _this2 = this;

        this.connectorPromise = this.connectorPromise.then(function () {
            var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(connector) {
                return _regenerator2.default.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                if (!connector) {
                                    _context2.next = 3;
                                    break;
                                }

                                _context2.next = 3;
                                return connector.destroy();

                            case 3:
                                return _context2.abrupt('return', null);

                            case 4:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, _this2);
            }));

            return function (_x2) {
                return _ref2.apply(this, arguments);
            };
        }());

        return this.connectorPromise;
    },
    _getBrowserProxy: function _getBrowserProxy(host, port) {
        var _this3 = this;

        this.browserProxyPromise = this.browserProxyPromise.then(function () {
            var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(browserProxy) {
                return _regenerator2.default.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                if (browserProxy) {
                                    _context3.next = 4;
                                    break;
                                }

                                browserProxy = new _browserProxy2.default(host, port, { responseDelay: ANDROID_PROXY_RESPONSE_DELAY });

                                _context3.next = 4;
                                return browserProxy.init();

                            case 4:
                                return _context3.abrupt('return', browserProxy);

                            case 5:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, _this3);
            }));

            return function (_x3) {
                return _ref3.apply(this, arguments);
            };
        }());

        return this.browserProxyPromise;
    },
    _disposeBrowserProxy: function _disposeBrowserProxy() {
        var _this4 = this;

        this.browserProxyPromise = this.browserProxyPromise.then(function () {
            var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(browserProxy) {
                return _regenerator2.default.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                if (!browserProxy) {
                                    _context4.next = 3;
                                    break;
                                }

                                _context4.next = 3;
                                return browserProxy.dispose();

                            case 3:
                                return _context4.abrupt('return', null);

                            case 4:
                            case 'end':
                                return _context4.stop();
                        }
                    }
                }, _callee4, _this4);
            }));

            return function (_x4) {
                return _ref4.apply(this, arguments);
            };
        }());

        return this.browserProxyPromise;
    },
    _getDeviceList: function _getDeviceList() {
        var _this5 = this;

        return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5() {
            return _regenerator2.default.wrap(function _callee5$(_context5) {
                while (1) {
                    switch (_context5.prev = _context5.next) {
                        case 0:
                            _context5.next = 2;
                            return _this5.backend.getBrowsersList();

                        case 2:
                            _this5.platformsInfo = _context5.sent;

                        case 3:
                        case 'end':
                            return _context5.stop();
                    }
                }
            }, _callee5, _this5);
        }))();
    },
    _createQuery: function _createQuery(capabilities) {
        var _parseCapabilities$ = (0, _desiredCapabilities2.default)(capabilities)[0],
            browserName = _parseCapabilities$.browserName,
            browserVersion = _parseCapabilities$.browserVersion,
            platform = _parseCapabilities$.platform;


        browserName = browserName.toLowerCase();

        if (browserName === 'internet explorer') browserName = 'ie';

        return {
            name: browserName,
            version: browserVersion.toLowerCase(),
            platform: platform.toLowerCase()
        };
    },
    _generateBasicCapabilities: function _generateBasicCapabilities(browserName) {
        return this._filterPlatformInfo(this._createQuery(browserName))[0];
    },
    _getCapabilitiesFromEnvironment: function _getCapabilitiesFromEnvironment() {
        // NOTE: This function maps env vars to browserstack capabilities.
        // For the full list of capabilities, see https://www.browserstack.com/automate/capabilities

        return {
            'build': process.env['BROWSERSTACK_BUILD_ID'],
            'project': process.env['BROWSERSTACK_PROJECT_NAME'],
            'resolution': process.env['BROWSERSTACK_DISPLAY_RESOLUTION'],
            'name': process.env['BROWSERSTACK_TEST_RUN_NAME'],
            'browserstack.debug': process.env['BROWSERSTACK_DEBUG'],
            'browserstack.console': process.env['BROWSERSTACK_CONSOLE'],
            'browserstack.networkLogs': process.env['BROWSERSTACK_NETWORK_LOGS'],
            'browserstack.video': process.env['BROWSERSTACK_VIDEO'],
            'browserstack.timezone': process.env['BROWSERSTACK_TIMEZONE'],
            'browserstack.geoLocation': process.env['BROWSERSTACK_GEO_LOCATION'],
            'browserstack.customNetwork': process.env['BROWSERSTACK_CUSTOM_NETWORK'],
            'browserstack.networkProfile': process.env['BROWSERSTACK_NETWORK_PROFILE'],
            'acceptSslCerts': process.env['BROWSERSTACK_ACCEPT_SSL_CERTS']
        };
    },
    _getCapabilitiesFromConfig: function _getCapabilitiesFromConfig() {
        var defaultConfigPath = './browserstackConfig.js';
        var configPath = process.env.BROWSERSTACK_CAPABILITIES_CONFIG_PATH || defaultConfigPath;

        if (_fs2.default.existsSync(configPath)) return require(_fs2.default.realpathSync(configPath));else if (configPath !== defaultConfigPath)
            // eslint-disable-next-line
            console.warn('Could not find the file:', configPath);

        return {};
    },
    _getAdditionalCapabilities: function _getAdditionalCapabilities() {
        var capabilitiesFromEnvironment = (0, _lodash.omitBy)(this._getCapabilitiesFromEnvironment(), function (value) {
            return typeof value === 'undefined';
        });

        return (0, _extends3.default)({}, this._getCapabilitiesFromConfig(), capabilitiesFromEnvironment);
    },
    _filterPlatformInfo: function _filterPlatformInfo(query) {
        return this.platformsInfo.filter(function (info) {
            var browserNameMatched = info['browser'] && info['browser'].toLowerCase() === query.name;
            var deviceNameMatched = info['device'] && info['device'].toLowerCase() === query.name;

            var browserVersionMatched = info['browser_version'] && Number(info['browser_version']) === Number(query.version);
            var platformVersionMatched = info['os_version'] && Number(info['os_version']) === Number(query.version);
            var platformNameMatched = info['os'].toLowerCase() === query.platform || info['os'].toLowerCase() + ' ' + info['os_version'].toLowerCase() === query.platform;

            var isAnyVersion = query.version === 'any';
            var isAnyPlatform = query.platform === 'any';

            var desktopBrowserMatched = browserNameMatched && (browserVersionMatched || isAnyVersion) && (platformNameMatched || isAnyPlatform);

            var mobileBrowserMatched = deviceNameMatched && (platformVersionMatched || isAnyVersion);

            return desktopBrowserMatched || mobileBrowserMatched;
        });
    },
    _generateBrowserNames: function _generateBrowserNames() {
        this.browserNames = this.platformsInfo.map(function (info) {
            var isDesktop = !info['device'];
            var name = isDesktop ? info['browser'] : info['device'];
            var version = isDesktop ? info['browser_version'] : info['os_version'];
            var platform = isDesktop ? info['os'] + ' ' + info['os_version'] : '';

            return name + '@' + version + (platform ? ':' + platform : '');
        });
    },
    _prepareChromeCapabilities: function _prepareChromeCapabilities(capabilities) {
        if (process.env['BROWSERSTACK_CHROME_ARGS'] && process.env['BROWSERSTACK_CHROME_ARGS'].length > 0) capabilities.chromeOptions = { args: [process.env['BROWSERSTACK_CHROME_ARGS']] };
    },
    _prepareFirefoxCapabilities: function _prepareFirefoxCapabilities(capabilities) {
        var _this6 = this;

        return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6() {
            var FirefoxProfile, profile;
            return _regenerator2.default.wrap(function _callee6$(_context6) {
                while (1) {
                    switch (_context6.prev = _context6.next) {
                        case 0:
                            if (process.env['BROWSERSTACK_USE_AUTOMATE']) {
                                _context6.next = 2;
                                break;
                            }

                            return _context6.abrupt('return');

                        case 2:
                            FirefoxProfile = require('firefox-profile');
                            profile = new FirefoxProfile();


                            profile.defaultPreferences = {};

                            profile.setPreference('browser.helperApps.neverAsk.saveToDisk', getMimeTypes());
                            profile.updatePreferences();

                            _context6.next = 9;
                            return (0, _util.promisify)(profile.encoded).bind(profile)();

                        case 9:
                            capabilities['firefox_profile'] = _context6.sent;

                        case 10:
                        case 'end':
                            return _context6.stop();
                    }
                }
            }, _callee6, _this6);
        }))();
    },
    _encodeFirefoxProfile: function _encodeFirefoxProfile(profile) {
        var _this7 = this;

        return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7() {
            return _regenerator2.default.wrap(function _callee7$(_context7) {
                while (1) {
                    switch (_context7.prev = _context7.next) {
                        case 0:
                            return _context7.abrupt('return', new _pinkie2.default(function (resolve, reject) {
                                profile.encoded(function (err, encodedProfile) {
                                    if (err) reject(err);else resolve(encodedProfile);
                                });
                            }));

                        case 1:
                        case 'end':
                            return _context7.stop();
                    }
                }
            }, _callee7, _this7);
        }))();
    },


    // Required - must be implemented
    // Browser control
    openBrowser: function openBrowser(id, pageUrl, browserName) {
        var _this8 = this;

        return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee8() {
            var capabilities, connector, parsedPageUrl, browserProxy;
            return _regenerator2.default.wrap(function _callee8$(_context8) {
                while (1) {
                    switch (_context8.prev = _context8.next) {
                        case 0:
                            capabilities = (0, _extends3.default)({}, _this8._generateBasicCapabilities(browserName), _this8._getAdditionalCapabilities());


                            capabilities.local = isLocalEnabled();

                            // Give preference to the already running local identifier
                            capabilities.localIdentifier = process.env.BROWSERSTACK_LOCAL_IDENTIFIER;

                            if (!(capabilities.local && !capabilities.localIdentifier)) {
                                _context8.next = 8;
                                break;
                            }

                            _context8.next = 6;
                            return _this8._createConnector();

                        case 6:
                            connector = _context8.sent;


                            capabilities.localIdentifier = connector.connectorInstance.localIdentifierFlag;

                        case 8:
                            if (!(capabilities.os.toLowerCase() === 'android')) {
                                _context8.next = 14;
                                break;
                            }

                            parsedPageUrl = (0, _url.parse)(pageUrl);
                            _context8.next = 12;
                            return _this8._getBrowserProxy(parsedPageUrl.hostname, parsedPageUrl.port);

                        case 12:
                            browserProxy = _context8.sent;


                            pageUrl = 'http://' + browserProxy.targetHost + ':' + browserProxy.proxyPort + parsedPageUrl.path;

                        case 14:

                            if (!capabilities.name) capabilities.name = 'TestCafe test run ' + id;

                            if (browserName.includes('chrome')) _this8._prepareChromeCapabilities(capabilities);

                            if (!browserName.includes('firefox')) {
                                _context8.next = 19;
                                break;
                            }

                            _context8.next = 19;
                            return _this8._prepareFirefoxCapabilities(capabilities);

                        case 19:
                            _context8.next = 21;
                            return _this8.backend.openBrowser(id, pageUrl, capabilities);

                        case 21:

                            _this8.setUserAgentMetaInfo(id, _this8.backend.getSessionUrl(id));

                        case 22:
                        case 'end':
                            return _context8.stop();
                    }
                }
            }, _callee8, _this8);
        }))();
    },
    closeBrowser: function closeBrowser(id) {
        var _this9 = this;

        return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee9() {
            return _regenerator2.default.wrap(function _callee9$(_context9) {
                while (1) {
                    switch (_context9.prev = _context9.next) {
                        case 0:
                            _context9.next = 2;
                            return _this9.backend.closeBrowser(id);

                        case 2:
                        case 'end':
                            return _context9.stop();
                    }
                }
            }, _callee9, _this9);
        }))();
    },


    // Optional - implement methods you need, remove other methods
    // Initialization
    init: function init() {
        var _this10 = this;

        return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee10() {
            var reportWarning;
            return _regenerator2.default.wrap(function _callee10$(_context10) {
                while (1) {
                    switch (_context10.prev = _context10.next) {
                        case 0:
                            reportWarning = function reportWarning() {
                                return _this10.reportWarning.apply(_this10, arguments);
                            };

                            _this10.backend = isAutomateEnabled() ? new _automate2.default(reportWarning) : new _jsTesting2.default(reportWarning);

                            _context10.next = 4;
                            return _this10._getDeviceList();

                        case 4:

                            _this10._generateBrowserNames();

                        case 5:
                        case 'end':
                            return _context10.stop();
                    }
                }
            }, _callee10, _this10);
        }))();
    },
    dispose: function dispose() {
        var _this11 = this;

        return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee11() {
            return _regenerator2.default.wrap(function _callee11$(_context11) {
                while (1) {
                    switch (_context11.prev = _context11.next) {
                        case 0:
                            _context11.next = 2;
                            return _this11._disposeConnector();

                        case 2:
                            _context11.next = 4;
                            return _this11._disposeBrowserProxy();

                        case 4:
                        case 'end':
                            return _context11.stop();
                    }
                }
            }, _callee11, _this11);
        }))();
    },


    // Browser names handling
    getBrowserList: function getBrowserList() {
        var _this12 = this;

        return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee12() {
            return _regenerator2.default.wrap(function _callee12$(_context12) {
                while (1) {
                    switch (_context12.prev = _context12.next) {
                        case 0:
                            return _context12.abrupt('return', _this12.browserNames);

                        case 1:
                        case 'end':
                            return _context12.stop();
                    }
                }
            }, _callee12, _this12);
        }))();
    },
    isValidBrowserName: function isValidBrowserName(browserName) {
        var _this13 = this;

        return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee13() {
            return _regenerator2.default.wrap(function _callee13$(_context13) {
                while (1) {
                    switch (_context13.prev = _context13.next) {
                        case 0:
                            return _context13.abrupt('return', (0, _desiredCapabilities2.default)(browserName).length === 1 && !!_this13._filterPlatformInfo(_this13._createQuery(browserName)).length);

                        case 1:
                        case 'end':
                            return _context13.stop();
                    }
                }
            }, _callee13, _this13);
        }))();
    },


    // Extra methods
    resizeWindow: function resizeWindow(id, width, height, currentWidth, currentHeight) {
        var _this14 = this;

        return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee14() {
            return _regenerator2.default.wrap(function _callee14$(_context14) {
                while (1) {
                    switch (_context14.prev = _context14.next) {
                        case 0:
                            _context14.next = 2;
                            return _this14.backend.resizeWindow(id, width, height, currentWidth, currentHeight);

                        case 2:
                        case 'end':
                            return _context14.stop();
                    }
                }
            }, _callee14, _this14);
        }))();
    },
    maximizeWindow: function maximizeWindow(id) {
        var _this15 = this;

        return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee15() {
            return _regenerator2.default.wrap(function _callee15$(_context15) {
                while (1) {
                    switch (_context15.prev = _context15.next) {
                        case 0:
                            _context15.next = 2;
                            return _this15.backend.maximizeWindow(id);

                        case 2:
                        case 'end':
                            return _context15.stop();
                    }
                }
            }, _callee15, _this15);
        }))();
    },
    takeScreenshot: function takeScreenshot(id, screenshotPath) {
        var _this16 = this;

        return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee16() {
            return _regenerator2.default.wrap(function _callee16$(_context16) {
                while (1) {
                    switch (_context16.prev = _context16.next) {
                        case 0:
                            _context16.next = 2;
                            return _this16.backend.takeScreenshot(id, screenshotPath);

                        case 2:
                        case 'end':
                            return _context16.stop();
                    }
                }
            }, _callee16, _this16);
        }))();
    },
    reportJobResult: function reportJobResult(id, jobResult, jobData) {
        var _this17 = this;

        return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee17() {
            return _regenerator2.default.wrap(function _callee17$(_context17) {
                while (1) {
                    switch (_context17.prev = _context17.next) {
                        case 0:
                            _context17.next = 2;
                            return _this17.backend.reportJobResult(id, jobResult, jobData, _this17.JOB_RESULT);

                        case 2:
                        case 'end':
                            return _context17.stop();
                    }
                }
            }, _callee17, _this17);
        }))();
    }
};
module.exports = exports['default'];