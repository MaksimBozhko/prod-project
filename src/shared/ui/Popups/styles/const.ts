import { DropDownDirection } from 'shared/types/ui';
import cls from './popup.module.scss';

export const mapDirectionsClass: Record<DropDownDirection, string> = {
  'bottom right': cls.optionsBottomRight,
  'bottom left': cls.optionsBottomLeft,
  'top left': cls.optionsTopLeft,
  'top right': cls.optionsTopRight,
}
