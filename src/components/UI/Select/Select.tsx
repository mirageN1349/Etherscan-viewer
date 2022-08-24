import React from 'react';
import ReactSelect, { SingleValue } from 'react-select';

export type SelectOption<V> = {
  value: V;
  label: string | undefined;
};

type Props<V> = {
  value: V;
  options: SelectOption<V>[];
  onChange: (newValue: SingleValue<SelectOption<V>>) => void;
};

export function Select<V extends number | string | boolean>({ value, options, onChange }: Props<V>) {
  const selectedValue = value
    ? {
        value,
        label: options.find(opt => opt.value === value)?.label,
      }
    : null;

  return <ReactSelect onChange={onChange} value={selectedValue} options={options} />;
}
