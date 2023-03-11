import { CategoryItemProps } from 'features/CategoriesList/CategoryItem'

import polymers from '/public/assets/commodities/polymers.png'
import petroleum from '/public/assets/commodities/petroleum.png'
import crudeOil from '/public/assets/commodities/crudeOil.png'
import otherOil from '/public/assets/commodities/otherOil.png'
import fertilizers from '/public/assets/commodities/fertilizers.png'
import sulphur from '/public/assets/commodities/sulphur.png'
import otherPetro from '/public/assets/commodities/otherPetro.png'
import grains from '/public/assets/commodities/grains.png'
import fruits from '/public/assets/commodities/fruits.png'
import vegetables from '/public/assets/commodities/vegetables.png'
import nuts from '/public/assets/commodities/nuts.png'
import sugar from '/public/assets/commodities/sugar.png'
import textiles from '/public/assets/commodities/textiles.png'
import cotton from '/public/assets/commodities/cotton.png'

export const categoriesList: CategoryItemProps[] = [
  {
    name: 'Polymers',
    image: polymers,
    link: '/find/offers',
  },
  {
    name: 'Petroleum products',
    image: petroleum,
  },
  {
    name: 'Crude oil',
    image: crudeOil,
  },
  {
    name: 'Other oil products',
    image: otherOil,
  },
  {
    name: 'Fertilizers',
    image: fertilizers,
  },
  {
    name: 'Sulphur',
    image: sulphur,
  },
  {
    name: 'Other petrochemicals',
    image: otherPetro,
  },
  {
    name: 'Grains',
    image: grains,
  },
  {
    name: 'Fruits',
    image: fruits,
  },
  {
    name: 'Vegetables',
    image: vegetables,
  },
  {
    name: 'Nuts',
    image: nuts,
  },
  {
    name: 'Sugar',
    image: sugar,
  },
  {
    name: 'Textiles',
    image: textiles,
  },
  {
    name: 'Cotton',
    image: cotton,
  },
]
