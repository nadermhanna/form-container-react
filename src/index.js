import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const Form = (props) => {
  const { children, getFormState, onSubmit: onSubmitCallback } = props;
  const defaultIsRequiredMessage = "this is a required field";
  const isWeb = typeof document != 'undefined';

  const initialValues = {};
  React.Children.forEach(children, (child) => {
    const {
      field, value,
    } = child.props;
    if (value) initialValues[field] = value;
  });

  const [form, updateForm] = useState({
    values: {
      ...initialValues,
    },
    errors: {},
  });

  // check if child is an input field
  const isFormField = (child) => {
      return !!child.props.field;
  }
  // check if child is a submit button
  const isSubmitButton = (child) => { 
      return child.props.issubmit;
  }

  // update form state on change
  const setValue = (field, value) => {
    updateForm({
      ...form,
      values: {
        ...form.values,
        [field]: value,
      },
    });
  };
  const setError = (field, error) => {
    updateForm({
      ...form,
      errors: {
        ...form.errors,
        [field]: error,
      },
    });
  };
  const onSubmit = () => {
    let formToUpdate = { ...form };
    let isGoodToSubmit = true;
    React.Children.forEach(children, (child) => {
      const {
        field, isRequired, isRequiredMessage,
      } = child.props;
      const isRequiredSatisfied = isRequired
        ? !!form.values[field] : true;
      const isValid = !(form.errors[field]);
      if (!isRequiredSatisfied) {
        isGoodToSubmit = false
        formToUpdate = {
          ...formToUpdate,
          errors: {
            [field]: isRequiredMessage || defaultIsRequiredMessage,
          },
        };
      } else if (
        // clear out isRequired if it's been filled
        !isValid && (
          form.errors[field] === isRequiredMessage ||
          form.errors[field] === defaultIsRequiredMessage
      )) {
        isGoodToSubmit = true;
      } else if (!isValid) {
        isGoodToSubmit = false
      }
    });
    if (isGoodToSubmit) {
      onSubmitCallback(form);
    } else {
      updateForm(formToUpdate);
    }
  };

  // use a callback to send up the form state
  useEffect(() => {
    getFormState(form);
  }, [form]);

  return (
    <>
      {React.Children.map(children, (child) => {
        if (isSubmitButton(child)) {
          return React.cloneElement(child, {
            ...(!isWeb? {onPress: onSubmit} : {}),
            ...(isWeb? {onClick: onSubmit} : {}),
          });
        }
        if (!isFormField(child)) {
          return child;
        }
        const { field } = child.props;
        return React.cloneElement(child, {
          setValue: (value) => { setValue(field, value); },
          setError: (error) => { setError(field, error); },
          value: form.values[field],
          error: form.errors[field],
        });
      })}
    </>
  );
};

Form.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  getFormState: PropTypes.func,
  onSubmit: PropTypes.func,
};

Form.defaultProps = {
  children: null,
  getFormState: () => {},
  onSubmit: () => {},
};


export default Form;
