import {toast } from 'react-toastify';

export const toastError = (text: string) => {
  return toast.error(text);
};

export const toastSuccess = (text: string) => {
  toast.success(text);
};