import React, { useEffect } from 'react';
import { type StorageProperties } from './create-storage';
import { readLocalStorageValue, useLocalStorage } from './use-local-storage';

export default { title: 'use-local-storage' };

function Wrapper<T>({ storage: { key, ...options } }: { storage: StorageProperties<T> }) {
  const [value] = useLocalStorage({ key, ...options });

  const [storedValue, setStoredValue] = React.useState<T | undefined>(undefined);

  useEffect(() => {
    setTimeout(() => {
      setStoredValue(readLocalStorageValue({ key }));
    }, 1000);
  }, []);

  return (
    <div style={{ padding: 40 }}>
      <p>
        Hook value: {String(value)} ({typeof value})
      </p>
      <p>
        Local storage value: {String(storedValue)} ({typeof storedValue})
      </p>
    </div>
  );
}

export function NoDefaultValue() {
  return <Wrapper storage={{ getInitialValueInEffect: false, key: 'no-default-value' }} />;
}

export function NoDefaultValueSSR() {
  return <Wrapper storage={{ key: 'no-default-value-ssr' }} />;
}

export function NoDefaultValueWithStoredValue() {
  const key = 'no-default-value-with-stored-value';

  // Forces a value on local storage
  window.localStorage.setItem(key, '123');

  return <Wrapper storage={{ getInitialValueInEffect: false, key }} />;
}

export function NoDefaultValueWithStoredValueSSR() {
  const key = 'no-default-value-with-stored-value-ssr';

  // Forces a value on local storage
  window.localStorage.setItem(key, '456');

  return <Wrapper storage={{ key }} />;
}

export function WithDefaultValue() {
  return (
    <Wrapper
      storage={{ defaultValue: 123, getInitialValueInEffect: false, key: 'with-default-value' }}
    />
  );
}

export function WithDefaultValueSSR() {
  return <Wrapper storage={{ defaultValue: 456, key: 'with-default-value-ssr' }} />;
}

export function WithDefaultValueAndStoredValue() {
  const key = 'with-default-value-and-stored-value';

  // Forces a value on local storage
  window.localStorage.setItem(key, '654');

  return <Wrapper storage={{ defaultValue: 123, getInitialValueInEffect: false, key }} />;
}

export function WithDefaultValueAndStoredValueSSR() {
  const key = 'with-default-value-and-stored-value-ssr';

  // Forces a value on local storage
  window.localStorage.setItem(key, '321');

  return <Wrapper storage={{ defaultValue: 456, key }} />;
}
