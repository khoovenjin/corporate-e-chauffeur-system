import React from 'react';
import { useFormikContext } from 'formik';

import ImageInput from '../camera/ImageInput';
import ErrorMessage from './ErrorMessage';

function AppFormImagePicker({name, ...otherProps}, ref) {
    const {setFieldValue, errors, values, touched} = useFormikContext();

    return (
        <>
            <ImageInput
                imageUri={values[name]}
                onChangeImage={uri => setFieldValue(name, uri)}
                ref={ref}
                {...otherProps}
            />
            <ErrorMessage error={errors[name]} visible={touched[name]}/>
        </>
    );
}

export default React.forwardRef(AppFormImagePicker);