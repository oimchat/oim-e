export default class Platform {

    public static isWindows(): boolean {
        const platform = navigator.platform;
        const lowerUserAgent = navigator.userAgent.toLowerCase();
        const isWindows = (platform === 'Win32') || (platform === 'Win64') || (platform === 'wow64');
        return isWindows;
    }

    public static isMac(): boolean {
        const platform = navigator.platform;
        const lowerUserAgent = navigator.userAgent.toLowerCase();
        const isMac = (platform === 'Mac68K') || (platform === 'MacPPC') || (platform === 'Macintosh') || (platform === 'MacIntel');
        return isMac;
    }

    public static getName(): string {
        const name = 'unknown';

        const platform = navigator.platform;
        const lowerUserAgent = navigator.userAgent.toLowerCase();
        const isWindows = (platform === 'Win32') || (platform === 'Win64') || (platform === 'wow64');
        const isMac = (platform === 'Mac68K') || (platform === 'MacPPC') || (platform === 'Macintosh') || (platform === 'MacIntel');
        if (isMac) {
            return 'Mac';
        }
        const isUnix = (platform === 'X11') && !isWindows && !isMac;
        if (isUnix) {
            return 'Unix';
        }
        const isLinux = (platform.indexOf('Linux') > -1);
        const matchArray: RegExpMatchArray | null = lowerUserAgent.match(/android/i);
        let isAndroid = false;
        if (matchArray) {
            isAndroid = matchArray.length > 0;
        }
        if (isLinux) {
            if (isAndroid) {
                return 'Android';
            } else {
                return 'Linux';
            }
        }
        if (isWindows) {
            const isWindows2K = lowerUserAgent.indexOf('windows nt 5.0') > -1 || lowerUserAgent.indexOf('windows 2000') > -1;
            if (isWindows2K) {
                return 'Windows 2000';
            }
            const isWindowsXP = lowerUserAgent.indexOf('windows nt 5.1') > -1 || lowerUserAgent.indexOf('windows xp') > -1;
            if (isWindowsXP) {
                return 'Windows XP';
            }
            const isWindows2003 = lowerUserAgent.indexOf('windows nt 5.2') > -1 || lowerUserAgent.indexOf('windows 2003') > -1;
            if (isWindows2003) {
                return 'Windows 2003';
            }
            const isWindowsVista = lowerUserAgent.indexOf('windows nt 6.0') > -1 || lowerUserAgent.indexOf('windows vista') > -1;
            if (isWindowsVista) {
                return 'Windows Vista';
            }
            const isWindows7 = lowerUserAgent.indexOf('windows nt 6.1') > -1 || lowerUserAgent.indexOf('windows 7') > -1;
            if (isWindows7) {
                return 'Windows 7';
            }
            const isWindows8 = lowerUserAgent.indexOf('windows nt 6.2') > -1 || lowerUserAgent.indexOf('windows 8') > -1;
            if (isWindows8) {
                return 'Windows 8';
            }
            const isWindows8$1 = lowerUserAgent.indexOf('windows nt 6.3') > -1 || lowerUserAgent.indexOf('windows 8.1') > -1;
            if (isWindows8$1) {
                return 'Windows 8.1';
            }
            const isWindows10 = lowerUserAgent.indexOf('windows nt 10.0') > -1 || lowerUserAgent.indexOf('windows 10') > -1;
            if (isWindows10) {
                return 'Windows 10';
            }
        }
        return name;
    }


    public static getBrowser() {

        const regMsie = /(msie\s|trident\/7)([\w.]+)/;
        const regTrident = /(trident)\/([\w.]+)/;
        const regEdge = /(edge)\/([\w.]+)/; // IE

        const regFirefox = /(firefox)\/([\w.]+)/;  // 火狐
        const regOpera = /(opera).+version\/([\w.]+)/;  // 旧Opera
        const regNewOpera = /(opr)\/(.+)/;  // 新Opera 基于谷歌
        const regChrome = /(chrome)\/([\w.]+)/; // 谷歌
        const regUC = /(ubrowser)\/([\w.]+)/; // UC
        const regMaxthon = /(maxthon)\/([\w.]+)/; // 遨游
        const reg2345 = /(2345explorer)\/([\w.]+)/; // 2345
        const regQQ = /(qqbrowser)\/([\w.]+)/; // QQ
        // var rMetasr =  /(metasr)\/([\w.]+)/;//搜狗
        const regSafari = /version\/([\w.]+).*(safari)/;

        const lowerUserAgent = navigator.userAgent.toLowerCase();

        let matchBS;
        let matchBS2;

        // IE 低版
        matchBS = regMsie.exec(lowerUserAgent);
        if (matchBS != null) {
            matchBS2 = regTrident.exec(lowerUserAgent);
            if (matchBS2 != null) {
                switch (matchBS2[2]) {
                    case '4.0':
                        return {
                            browser: 'Microsoft IE',
                            version: 'IE: 8',  // 内核版本号
                        };
                    case '5.0':
                        return {
                            browser: 'Microsoft IE',
                            version: 'IE: 9',
                        };
                    case '6.0':
                        return {
                            browser: 'Microsoft IE',
                            version: 'IE: 10',
                        };
                    case '7.0':
                        return {
                            browser:
                                'Microsoft IE',
                            version: 'IE: 11',
                        };
                    default:
                        return {
                            browser:
                                'Microsoft IE',
                            version: 'Undefined',
                        };
                }
            } else {
                return {
                    browser: 'Microsoft IE',
                    version: 'IE:' + matchBS[2] || '0',
                };
            }
        }

        const windowAttachEvent: any = (window as any).attachEvent;
        const windowChrome: any = (window as any).chrome;
        const windowOpera: any = (window as any).opera;

        // IE最新版
        matchBS = regEdge.exec(lowerUserAgent);
        if ((matchBS != null) && (!windowAttachEvent)) {
            return {
                browser: 'Microsoft Edge',
                version: 'Edge/' + matchBS[2] || '0',
            };
        }
        // UC浏览器
        matchBS = regUC.exec(lowerUserAgent);
        if ((matchBS != null) && (!windowAttachEvent)) {
            return {
                browser: 'UC',
                version: 'ubrowser/' + matchBS[2] || '0',
            };
        }
        // 火狐浏览器
        matchBS = regFirefox.exec(lowerUserAgent);
        if ((matchBS != null) && (!windowAttachEvent)) {
            return {
                browser: '火狐',
                version: 'Firefox/' + matchBS[2] || '0',
            };
        }
        // Opera浏览器
        matchBS = regOpera.exec(lowerUserAgent);
        if ((matchBS != null) && (!windowAttachEvent)) {
            return {
                browser: 'Opera',
                version: 'Opera/' + matchBS[2] || '0',
            };
        }
        // 遨游
        matchBS = regMaxthon.exec(lowerUserAgent);
        if ((matchBS != null) && (!windowAttachEvent)) {
            return {
                browser: '遨游',
                version: 'Maxthon/' + matchBS[2] || '0',
            };
        }
        // 2345浏览器
        matchBS = reg2345.exec(lowerUserAgent);
        if ((matchBS != null) && (!windowAttachEvent)) {
            return {
                browser: '2345',
                version: '2345explorer/ ' + matchBS[2] || '0',
            };
        }
        // QQ浏览器
        matchBS = regQQ.exec(lowerUserAgent);
        if ((matchBS != null) && (!windowAttachEvent)) {
            return {
                browser: 'QQ',
                version: 'qqbrowser/' + matchBS[2] || '0',
            };
        }
        // Safari（苹果）浏览器
        matchBS = regSafari.exec(lowerUserAgent);
        if ((matchBS != null) && (!windowAttachEvent) && (!windowChrome) && (!windowOpera)) {
            return {
                browser: 'Safari',
                version: 'Safari(win版)/' + matchBS[1] || '0',
            };
        }
        // 谷歌浏览器
        matchBS = regChrome.exec(lowerUserAgent);
        if ((matchBS != null) && (!windowAttachEvent)) {
            matchBS2 = regNewOpera.exec(lowerUserAgent);
            if (matchBS2 == null) {
                return {
                    browser: '谷歌',
                    version: 'Chrome/' + matchBS[2] || '0',
                };
            } else {
                return {
                    browser: 'Opera',
                    version: 'opr/' + matchBS2[2] || '0',
                };
            }
        }
    }
}
