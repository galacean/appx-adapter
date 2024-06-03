// @ts-nocheck
import { platform } from './platform';
import { EventTarget } from './event-target';

const _requestHeader = new WeakMap();
const _responseHeader = new WeakMap();
const _requestTask = new WeakMap();

const contentTypes = {
  json: 'application/json',
  text: 'application/text',
  arraybuffer: 'application/octet-stream',
};

function _triggerEvent (type: string, event = {}) {
  event.target = event.target || this;

  if (typeof this[`on${type}`] === 'function') {
    this[`on${type}`].call(this, event);
  }
}

function _changeReadyState (readyState: string, event = {}) {
  this.readyState = readyState;

  event.readyState = readyState;

  _triggerEvent.call(this, 'readystatechange', event);
}

function _isRelativePath (url) {
  return !/^(http|https|ftp|wxfile):\/\/.*/i.test(url);
}

export class XMLHttpRequest extends EventTarget {
  static useFetchPatch: boolean;

  constructor () {
    super();

    this.runtime = platform.getSystemInfoSync().platform;

    /*
     * TODO 这一批事件应该是在 XMLHttpRequestEventTarget.prototype 上面的
     */
    this.onabort = null;
    this.onerror = null;
    this.onload = null;
    this.onloadstart = null;
    this.onprogress = null;
    this.ontimeout = null;
    this.onloadend = null;

    this.onreadystatechange = null;
    this.readyState = 0;
    this.response = null;
    this.responseText = null;
    this.responseType = 'text';
    this.dataType = 'string';
    this.responseXML = null;
    this.status = 0;
    this.statusText = '';
    this.upload = {};
    this.withCredentials = false;

    _requestHeader.set(this, {
      'content-type': 'application/x-www-form-urlencoded',
    });
    _responseHeader.set(this, {});
  }

  abort () {
    const myRequestTask = _requestTask.get(this);

    if (myRequestTask) {
      myRequestTask.abort();
    }
  }

  getAllResponseHeaders () {
    const responseHeader = _responseHeader.get(this);

    return Object.keys(responseHeader)
      .map(header => {
        return `${header}: ${responseHeader[header]}`;
      })
      .join('\n');
  }

  getResponseHeader (header) {
    return _responseHeader.get(this)[header];
  }

  /* async, user, password 这几个参数在小程序内不支持 */
  open (method: string, url: string) {
    this._method = method;
    this._url = url;
    _changeReadyState.call(this, XMLHttpRequest.OPENED);
  }

  overrideMimeType () { }

  send (data = '') {
    if (this.readyState !== XMLHttpRequest.OPENED) {
      throw new Error(
        'Failed to execute \'send\' on \'XMLHttpRequest\': The object\'s state must be OPENED.',
      );
    } else {
      const url = this._url;
      const header = _requestHeader.get(this);
      let responseType = this.responseType;
      let dataType = this.dataType;

      if (contentTypes[responseType] && !header['content-type']) {
        header['content-type'] = contentTypes[responseType];
      }
      const relative = _isRelativePath(url);
      let encoding;

      if (responseType === 'arraybuffer') {
        // 避免被默认转换为JSON
        dataType = 'arrayBuffer';
      } else {
        encoding = 'utf8';
      }

      if (responseType === 'json') {
        dataType = 'json';
        responseType = 'text';
      }

      delete this.response;
      this.response = null;
      let resolved = false;

      const onSuccess = ({ data, statusCode, header }) => {
        // console.log('onSuccess', url);
        if (resolved) { return; }
        resolved = true;
        statusCode = statusCode === undefined ? 200 : statusCode;
        if (typeof data !== 'string' && !(data instanceof ArrayBuffer) && dataType !== 'json') {
          try {
            data = JSON.stringify(data);
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          } catch (e) { /* empty */ }
        }

        this.status = statusCode;
        if (header) {
          _responseHeader.set(this, header);
        }
        _triggerEvent.call(this, 'loadstart');
        _changeReadyState.call(this, XMLHttpRequest.HEADERS_RECEIVED);
        _changeReadyState.call(this, XMLHttpRequest.LOADING);

        this.response = data;

        if (data instanceof ArrayBuffer) {
          Object.defineProperty(this, 'responseText', {
            enumerable: true,
            configurable: true,
            get: function () {
              throw 'InvalidStateError : responseType is ' + this.responseType;
            },
          });
        } else {
          this.responseText = data;
        }
        _changeReadyState.call(this, XMLHttpRequest.DONE);
        _triggerEvent.call(this, 'load');
        _triggerEvent.call(this, 'loadend');
      };

      const onFail = e => {
        const errMsg = e.message || e.errorMessage;

        // TODO 规范错误
        if (resolved) { return; }
        resolved = true;
        if (errMsg.indexOf('abort') !== -1) {
          _triggerEvent.call(this, 'abort');
        } else {
          _triggerEvent.call(this, 'error', {
            message: errMsg,
          });
        }
        _triggerEvent.call(this, 'loadend');

        if (relative) {
          // 用户即使没监听error事件, 也给出相应的警告
          console.warn(errMsg);
        }
      };

      if (relative) {
        const fs = platform.getFileSystemManager();

        const options = {
          filePath: url,
          success: onSuccess,
          fail: onFail,
        };

        if (encoding) {
          options['encoding'] = encoding;
        }
        fs.readFile(options);

        return;
      }

      // IOS在某些情况下不会触发onSuccess...
      const usePatch =
        responseType === 'arraybuffer' && this.runtime === 'ios' && XMLHttpRequest.useFetchPatch;

      platform.request({
        data,
        url: url,
        method: this._method.toUpperCase(),
        header: header,
        dataType: dataType,
        responseType: responseType,
        enableCache: false,
        success: onSuccess,
        // success: usePatch ? undefined : onSuccess,
        fail: onFail,
      });

      if (usePatch) {
        setTimeout(function () {
          platform.request({
            data,
            url: url,
            method: this._method,
            header: header,
            dataType: dataType,
            responseType: responseType,
            enableCache: true,
            success: onSuccess,
            fail: onFail,
          });
        }, XMLHttpRequest.fetchPatchDelay);
      }
    }
  }

  setRequestHeader (header, value) {
    const myHeader = _requestHeader.get(this);

    myHeader[header] = value;
    _requestHeader.set(this, myHeader);
  }

  addEventListener (type, listener) {
    if (typeof listener !== 'function') {
      return;
    }

    this['on' + type] = (event = {}) => {
      event.target = event.target || this;
      listener.call(this, event);
    };
  }

  removeEventListener (type, listener) {
    if (this['on' + type] === listener) {
      this['on' + type] = null;
    }
  }
}

// TODO 没法模拟 HEADERS_RECEIVED 和 LOADING 两个状态
XMLHttpRequest.UNSEND = 0;
XMLHttpRequest.OPENED = 1;
XMLHttpRequest.HEADERS_RECEIVED = 2;
XMLHttpRequest.LOADING = 3;
XMLHttpRequest.DONE = 4;

// 某些情况下IOS会不success不触发。。。
XMLHttpRequest.useFetchPatch = false;
XMLHttpRequest.fetchPatchDelay = 200;
