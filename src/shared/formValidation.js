export const required = value => (
  value ? undefined : 'Required'
);

export const maxLength = max => value => (
  value && value.length > max ? `Must be ${max} characters or less` : undefined
);
export const maxLength15 = maxLength(15);

export const minLength = min => value => (
  value && value.length < min ? `Must be ${min} characters or more` : undefined
);
export const minLength6 = minLength(6);

export const number = value => (
  value && isNaN(Number(value)) ? 'Must be a number' : undefined
);

export const email = value => (
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email address'
    : undefined
);
