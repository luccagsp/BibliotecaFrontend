import { atom } from 'nanostores';

export const popupSuccessVisible:boolean = atom(false);
export const popupReserveVisible:boolean = atom(false);
export const popupLoginVisible:boolean = atom(false);
export const popupErrorVisible:boolean = atom(false);
export const currentBookData:object = atom()