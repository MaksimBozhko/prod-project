import { Currency } from '@/entities/Currency';
import { Country } from '@/entities/Country';

export interface Profile {
  id?: string,
  firstname?: string,
  lastname?: string,
  age?: number,
  city?: string
  currency?: Currency,
  country?: Country,
  username?: string,
  avatar?: string
}
