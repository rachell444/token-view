import { useState, useEffect } from 'react';
import axios from 'axios';
import { useTheme } from '@mui/material/styles';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faCoins as CoinsIcon } from '@fortawesome/free-solid-svg-icons';

import CustomCard from '../CustomCard';

// ✅ Mueve esto aquí, después de todos los imports
library.add(CoinsIcon);

const Categories = () => {
  const theme = useTheme();

  const [categories, setCategories] = useState([]);

  const fetchCategories = () => {
    axios
      .get('https://api.coingecko.com/api/v3/coins/categories/list', {
        headers: {
          Accept: 'application/json',
        },
      })
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <CustomCard
      text='CATEGORIES'
      value={categories.length}
      color={theme.palette.error.dark}
      icon={CoinsIcon}
    />
  );
};

export default Categories;
