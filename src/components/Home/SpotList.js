import * as React from 'react';
import { List } from '@mui/material';
import ItemCard from './SpotList/ItemCard.js'

export default function SpotList(props) {

  const Item = props.Itemcard;

  return (
    <List
      sx={{ position: 'fixed', top: '64px', padding: '0px',
            width: '100%', height: '100%', overflow: 'hidden',
            maxWidth: 360, bgcolor: 'background.paper'}}
    >
      {Item &&
       Item.map((itemdata) => (
          <ItemCard
            ImageURL={itemdata.ImageURL}
            BrandName={itemdata.BrandName}
            GoodsName={itemdata.GoodsName}
          />
      ))}
    </List>
  );
};
