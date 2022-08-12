import React from 'react';
import { useFormikContext } from "formik";

import PinCodeInput from '../PinCodeInput';
import ErrorMessage from './ErrorMessage';

function AppFormPinCode({ name, codeLength, cellSpacing, handleFulfill, ...otherProps }, ref) {
    const { errors, setFieldTouched, setFieldValue, values, touched } = useFormikContext();

    return (
        <>
            <PinCodeInput
                ref={ref}
                codeLength={codeLength} 
                cellSpacing={cellSpacing}
                inputCode={values[name]}
                setInputCode={(item) => setFieldValue(name, item)}
                name={name}
                handleFulfill={handleFulfill}
                onBlur={() => setFieldTouched(name)}
                {...otherProps}
            />
            <ErrorMessage error={errors[name]} visible={touched[name]} />
        </>
    );
}

export default React.forwardRef(AppFormPinCode);