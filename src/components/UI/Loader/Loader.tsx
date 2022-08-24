import React from 'react';
import s from './Loader.module.scss';

type Props = {};

export function Loader({}: Props) {
  return (
    <div>
      <div className={s['lds-spinner']}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
