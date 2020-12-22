import { MdStore as icon } from 'react-icons/md';
import PriceInput from '../components/PriceInput';

const pizza = {
  name: 'storeSettings',
  title: 'Store Settings',
  type: 'document',
  icon,
  fields: [
    {
      name: 'slicemaster',
      title: 'Slicemaster Currently Slicing',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'person' }] }],
    },
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image',
      topping0: 'toppings.0.name',
      topping1: 'toppings.1.name',
      topping2: 'toppings.2.name',
      topping3: 'toppings.3.name',
      topping4: 'toppings.4.name',
    },
    prepare: ({ title, media, ...toppings }) => {
      const tops = Object.values(toppings).filter(Boolean);
      return {
        title,
        media,
        subtitle: tops.join(', '),
      };
    },
  },
};

export default pizza;
