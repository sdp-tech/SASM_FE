import * as React from 'react';
import { List, ListItem, ListItemButton, ListItemText } from '@mui/material';

import ItemCard from './SpotList/ItemCard.js'
import jsonData from '../../datas/list/data.json';


const storeList = jsonData.storeList;
console.log(storeList);

export default function SpotList(props) {

  console.log('Props', typeof(props), props);
  const Item = props.Itemcard;
  console.log('Item', typeof(Item));

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
