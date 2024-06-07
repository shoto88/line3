import { format } from 'date-fns';
import { ja } from 'date-fns/locale';

export function formatDate(date: Date, formatString: string) {
  return format(date, formatString, { locale: ja });
}