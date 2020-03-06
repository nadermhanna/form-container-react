# form-container-react

A form container for react and react-native. It is built as a way of centralising form state, validation and submission. **form-container-react** is primarily intended for developers building custom inputs and form elements.

Please note: This is a work in progress.

## Getting Started

#### npm
```
npm install --save form-container-react
```
#### yarn
```
yarn add form-container-react
```
#### Example:
```
import Form from 'form-container-react'

const CustomInput = (props) => {
	const {
		setValue,
		setError,
		value,
		error,
		validationRegex,
		errorMessage,
		isRequired,
		isRequiredMessage
  } = props;
  
	const onBlur = () => {
		if (!validationRegex.test(value)) setError(errorMessage);
		/*
		 if the 'isRequired' prop is set on a field, the field will be checked during 'onSubmit' as 
		 well.
		 */
		if (!value && isRequired) setError(isRequiredMessage);
	};
	const onChange = (e) => {
    setValue(e.target.value);
    if (error && validationRegex.test(value)) setError(null);
	};
	return(
    <div>
		<input onChange={onChange} onBlur={onBlur} />
    {error && <p>{error}</p>}
    </div>
	);
}

const App = () => {
	return(
		<Form
			getFormState={(state) => {console.log("state: ", state);}}
			onSubmit={(form) => {console.log("form: ", form); }}
		>
			<p>This is the form</p>
			<CustomInput
				field="email"
				validationRegex={/^(\D)+(\w)*((\.(\w)+)?)+@(\D)+(\w)*((\.(\D)+(\w)*)+)?(\.)[a-z]{2,}$/}
				errorMessage="please enter a valid email"
				isRequired
				isRequiredMessage="this field is required"
			/>
			<button issubmit="true">
        submit
      </button>
		</Form>
	);
}
```
## Props

### Form
|prop             |usage                               
|----------------|-------------------------------|
|`getFormState`  |A callback function that is called on every form update with the current `formState` object as an argument 
|`onSubmit`      |A callback function that is called onSubmit form update with the current `formState` object as an argument. Please note that the callback will not be called if the form contains any `errors`.  Also note, that when the form is submitted all fields will be checked to ensure that any fields marked with  `isRequired	` are filled. If a field is empty while marked as `isRequired` an `error` will be marked using the `isRequiredMessage` 

### Input
|prop             |usage                               
|----------------|-------------------------------|
|`value`         |The value of the field in the form state |
|`error`         |The error message of the field in the form state|
|`setValue`      |Sets the value of the field in the form state|
|`setError`      |Sets the error message of the field in the form state|


