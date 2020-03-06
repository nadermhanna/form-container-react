"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var Form = function Form(props) {
  var children = props.children,
      getFormState = props.getFormState,
      onSubmitCallback = props.onSubmit;
  var defaultIsRequiredMessage = "this is a required field";
  var isWeb = typeof document != 'undefined';
  var initialValues = {};

  _react["default"].Children.forEach(children, function (child) {
    var _child$props = child.props,
        field = _child$props.field,
        value = _child$props.value;
    if (value) initialValues[field] = value;
  });

  var _useState = (0, _react.useState)({
    values: _objectSpread({}, initialValues),
    errors: {}
  }),
      _useState2 = _slicedToArray(_useState, 2),
      form = _useState2[0],
      updateForm = _useState2[1]; // check if child is an input field


  var isFormField = function isFormField(child) {
    return !!child.props.field;
  }; // check if child is a submit button


  var isSubmitButton = function isSubmitButton(child) {
    return child.props.issubmit;
  }; // update form state on change


  var _setValue = function setValue(field, value) {
    updateForm(_objectSpread({}, form, {
      values: _objectSpread({}, form.values, _defineProperty({}, field, value))
    }));
  };

  var _setError = function setError(field, error) {
    updateForm(_objectSpread({}, form, {
      errors: _objectSpread({}, form.errors, _defineProperty({}, field, error))
    }));
  };

  var onSubmit = function onSubmit() {
    var formToUpdate = _objectSpread({}, form);

    var isGoodToSubmit = true;

    _react["default"].Children.forEach(children, function (child) {
      var _child$props2 = child.props,
          field = _child$props2.field,
          isRequired = _child$props2.isRequired,
          isRequiredMessage = _child$props2.isRequiredMessage;
      var isRequiredSatisfied = isRequired ? !!form.values[field] : true;
      var isValid = !form.errors[field];

      if (!isRequiredSatisfied) {
        isGoodToSubmit = false;
        formToUpdate = _objectSpread({}, formToUpdate, {
          errors: _defineProperty({}, field, isRequiredMessage || defaultIsRequiredMessage)
        });
      } else if ( // clear out isRequired if it's been filled
      !isValid && (form.errors[field] === isRequiredMessage || form.errors[field] === defaultIsRequiredMessage)) {
        isGoodToSubmit = true;
      } else if (!isValid) {
        isGoodToSubmit = false;
      }
    });

    if (isGoodToSubmit) {
      onSubmitCallback(form);
    } else {
      updateForm(formToUpdate);
    }
  }; // use a callback to send up the form state


  (0, _react.useEffect)(function () {
    getFormState(form);
  }, [form]);
  return _react["default"].createElement(_react["default"].Fragment, null, _react["default"].Children.map(children, function (child) {
    if (isSubmitButton(child)) {
      return _react["default"].cloneElement(child, _objectSpread({}, !isWeb ? {
        onPress: onSubmit
      } : {}, {}, isWeb ? {
        onClick: onSubmit
      } : {}));
    }

    if (!isFormField(child)) {
      return child;
    }

    var field = child.props.field;
    return _react["default"].cloneElement(child, {
      setValue: function setValue(value) {
        _setValue(field, value);
      },
      setError: function setError(error) {
        _setError(field, error);
      },
      value: form.values[field],
      error: form.errors[field]
    });
  }));
};

Form.propTypes = {
  children: _propTypes["default"].oneOfType([_propTypes["default"].arrayOf(_propTypes["default"].node), _propTypes["default"].node]),
  getFormState: _propTypes["default"].func,
  onSubmit: _propTypes["default"].func
};
Form.defaultProps = {
  children: null,
  getFormState: function getFormState() {},
  onSubmit: function onSubmit() {}
};
var _default = Form;
exports["default"] = _default;
