import React, { useEffect } from 'react';
import { type StorageProperties } from './create-storage';
import { readLocalStorageValue, useLocalStorage } from './use-local-storage';

export default { title: 'use-local-storage' };

const getRandomKey = () => Math.random().toString(36).substr(2, 5);

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

export function WithoutDefaultValue() {
  return <Wrapper storage={{ getInitialValueInEffect: false, key: getRandomKey() }} />;
}

export function WithoutDefaultValueSSR() {
  return <Wrapper storage={{ key: getRandomKey() }} />;
}

export function WithDefaultValue() {
  return (
    <Wrapper storage={{ defaultValue: 123, getInitialValueInEffect: false, key: getRandomKey() }} />
  );
}

export function WithDefaultValueSSR() {
  return <Wrapper storage={{ defaultValue: 456, key: getRandomKey() }} />;
}
