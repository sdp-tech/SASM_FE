import * as React from 'react';
import { List, ListItem, ListItemButton, ListItemText } from '@mui/material';

import jsonData from '../../datas/list/data.json';

const storeList = jsonData.storeList;
console.log(storeList);

export default function SpotList() {
  return (
    <List
      sx={{ position: 'fixed', top: '64px', padding: '0px',
            width: '100%', height: '100%', 
            maxWidth: 360, bgcolor: 'background.paper'}}
    >
      {storeList.map((store) => (
        <ListItem
          key={store.name}
          disableGutters
          sx={{padding: '0px'}}
        >
          <ListItemButton>
            <ListItemText
              primary={`${store.name}`}
              secondary={`위치: ${store.location}\n휴일: ${store.day}`} 
            />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};
