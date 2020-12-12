import { FaPepperHot as icon } from 'react-icons/fa';

const toppings = {
  name: 'toppings',
  title: 'Toppings',
  type: 'document',
  icon,
  fields: [
    {
      name: 'name',
      title: 'Pizza name',
      type: 'string',
      description: 'what is the name of the toppings',
    },
    {
      name: 'vegetarain',
      title: 'Vegetarain',
      type: 'boolean',
      description: 'what is the name of the toppings',
      options: {
        layout: 'checkbox',
      },
    },
  ],
  preview: {
    select: {
      name: 'name',
      vegetarain: 'vegetarain',
    },
    prepare: ({ name, vegetarain }) => ({
      title: `${vegetarain ? '🌱' : ''} ${name}`,
    }),
  },
};

export default toppings;
