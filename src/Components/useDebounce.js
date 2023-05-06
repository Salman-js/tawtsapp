import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';

const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
  }, [value, delay]);
  return debouncedValue;
};

export default useDebounce;
