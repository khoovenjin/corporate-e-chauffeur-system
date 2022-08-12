import React from 'react';
import { useFormikContext } from 'formik';

import AppTextInput from '../AppTextInput';
import ErrorMessage from './ErrorMessage';

function AppFormField({name, width, handleMax = null, ...otherProps}, ref) {
    const {setFieldTouched, setFieldValue, errors, values, touched} = useFormikContext();

    return (
        <>
            <AppTextInput
                onBlur={() => setFieldTouched(name)}
                onChangeText={text => setFieldValue(name, text)}
                value={values[name]}
                width={width}
                ref={ref}
                handleMax={handleMax? (()=>setFieldValue(name, handleMax)): null}
                {...otherProps}
            />
            <ErrorMessage error={errors[name]} visible={touched[name]}/>
        </>
    );
}

export default React.forwardRef(AppFormField);