import * as React from 'react';
import { List } from '@mui/material';
import MainCard from './SpotDetail/MainCard.js'

export default function SpotDetail(props) {

  const Item = props.MainCard;

  return (
    <>
      <List
        style={{maxHeight: '100%', overflow: 'auto', padding: '10px'}}
        sx={{ position: 'fixed', top: '64px', padding: '0px', margin: '0px',
              width: '100%', height: '100%', overflow: 'hidden',
              maxWidth: 360, bgcolor: 'background.paper'}}
      >
        {Item &&
        Item.map((itemdata) => (
            <MainCard
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
