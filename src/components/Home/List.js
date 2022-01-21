import * as React from 'react';
import { Box, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { FixedSizeList } from 'react-window';

import jsonData from '../../datas/list/data.json';

// console.log(jsonData);

const renderRow = () => {
  
  const { data, style } = jsonData;
  console.log(jsonData.storeList);

  return (
    <ListItem style={style} key={data} component="div" disablePadding>
      <ListItemButton>
        <ListItemText primary={`${data}`} />
      </ListItemButton>
    </ListItem>
  );
};

export default function List() {
  return (
    <Box
      sx={{ position: 'fixed', top: '64px', width: '100%', height: '100%', maxWidth: 360, bgcolor: 'background.paper'}}
    >
      <FixedSizeList
        height={510}
        width={360}
        itemSize={60}
        itemCount={30}
        overscanCount={5}
      >
        {renderRow}
      </FixedSizeList>
    </Box>
  );
};
