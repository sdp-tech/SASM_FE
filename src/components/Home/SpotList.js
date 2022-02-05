import * as React from 'react';
import { List } from '@mui/material';
import ItemCard from './SpotList/ItemCard.js'
import SearchBar from './SpotList/SearchBar.js'

export default function SpotList(props) {

  const Item = props.Itemcard;

  // const SpotDetail(itemdata) => {

  // }

  return (
    <>
      <List
        style={{maxHeight: '100%', overflow: 'auto', padding: '10px'}}
        sx={{ position: 'fixed', top: '64px', padding: '0px', margin: '0px',
              width: '100%', height: '100%', overflow: 'hidden',
              maxWidth: 360, bgcolor: 'background.paper'}}
      >
        <SearchBar/>
        {Item &&
        Item.map((itemdata) => (
            <ItemCard //onClick={() => SpotDetail(itemdata)}
              ImageURL={itemdata.ImageURL}
              StoreName={itemdata.StoreName}
              StoreType={itemdata.StoreType}
              OpeningHours={itemdata.OpeningHours}
              Address={itemdata.Address}
            />
        ))}
      </List>
    </>
  );
};
