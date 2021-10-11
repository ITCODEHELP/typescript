'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var _request = _interopDefault(require('request'));

var JupitaEndpoint;

(function (JupitaEndpoint) {
  JupitaEndpoint["dump"] = "https://api.jupita.io/v1/dump";
})(JupitaEndpoint || (JupitaEndpoint = {}));

(function (MessageType) {
  MessageType[MessageType["Touchpoint"] = 0] = "Touchpoint";
  MessageType[MessageType["Input"] = 1] = "Input";
})(exports.MessageType || (exports.MessageType = {}));

var Jupita = /*#__PURE__*/function () {
  function Jupita(token, touchpointId) {
    this.token = token;
    this.touchpointId = touchpointId;
  }

  var _proto = Jupita.prototype;

  _proto.dump = function dump(text, inputId, messageType, isCall, listener) {
    if (messageType === void 0) {
      messageType = exports.MessageType.Touchpoint;
    }

    if (isCall === void 0) {
      isCall = false;
    }

    // if (messageType !== MessageType.Input) {
    //     throw new InvalidParameterException(`invalid input`)
    // }
    this.request(JupitaEndpoint.dump, {
      token: this.token,
      touchpoint_id: this.touchpointId,
      input_id: inputId,
      message_type: messageType,
      text: text,
      isCall: isCall
    }, listener);
  };

  _proto.request = function request(url, options, listener) {
    _request.post(url, {
      json: options,
      headers: {
        "content-type": "application/json"
      }
    }, function (err, res, body) {
      if (!listener) {
        return console.log('No listener supplied');
      }

      if (err || res.statusCode !== 200) {
        listener.onError(res.statusCode.toString(), res.body);
      } else {
        listener.onSuccess(body);
      }
    });
  };

  return Jupita;
}();

(function (ModelName) {
  ModelName["JUPITAV1"] = "JupitaV1";
  ModelName["JUPITAV2"] = "JupitaV2";
})(exports.ModelName || (exports.ModelName = {}));

exports.Jupita = Jupita;
//# sourceMappingURL=jupita-sdk.cjs.development.js.map
