import { Currency } from 'entities/Currency';
import { Country } from 'entities/Country';

export interface Profile {
  firstname?: string,
  lastname?: string,
  age?: number,
  city?: string
  currency?: Currency,
  country?: Country,
  username?: string,
  avatar?: string
}

export interface ProfileSchema {
  data?: Profile
  form?: Profile
  isLoading?: boolean
  error?: string
  readonly?: boolean
}
