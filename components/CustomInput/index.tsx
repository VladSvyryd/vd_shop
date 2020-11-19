import React, { FC, useState } from 'react'
import { Field, useField, useFormikContext } from 'formik'

import { TextField, TextFieldProps } from '@material-ui/core'

export const CustomInput: FC<TextFieldProps> = (props) => {
  const [field, meta] = useField(props.name ? props.name : '')
  const { setFieldValue, setFieldTouched } = useFormikContext()
  const [isTyping, setIsTyping] = useState<boolean>(false)
  function handleOptionChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setIsTyping(true)
    setFieldValue(props.name ? props.name : '', event.target.value)
  }
  function updateBlur() {
    setFieldTouched(props.name ? props.name : '', true)
    setIsTyping(false)
  }

  return (
    <Field
      component={TextField}
      {...field}
      {...props}
      onBlur={updateBlur}
      onChange={handleOptionChange}
      helperText={meta.error}
      error={!isTyping && meta.touched && !!meta.error}
    />
  )
}
