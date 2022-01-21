import * as React from 'react';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { FixedSizeList } from 'react-window';

// Code Refactoring 1 : JSON import 방식 통일
// var data = require('../../datas/list/data.json');
import data from '../../datas/list/data.json';

console.log(data);

function renderRow(props) {
  const { data, style } = props;

  return (
    <ListItem style={style} key={data} component="div" disablePadding>
    <ListItemButton>
      {/* <ListItemText primary={`Item ${index + 1}`} /> */}
      {/* <ListItemText primary="Brunch this weekend?" /> */}
       <ListItemText primary={`${data}`} />
    </ListItemButton>
  </ListItem>
  );
}

export default function List() {
  return (
    <Box
      sx={{ width: '100%', height: 510, maxWidth: 360, bgcolor: 'background.paper' }}
    >
      <FixedSizeList
        height={510}
        width={360}
        itemSize={46}
        itemCount={20}
        overscanCount={5}
      >
        {renderRow}
      </FixedSizeList>
    </Box>
  );
}

// import * as React from 'react';
// import Box from '@mui/material/Box';
// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
// import Divider from '@mui/material/Divider';
// import InboxIcon from '@mui/icons-material/Inbox';
// import DraftsIcon from '@mui/icons-material/Drafts';

// export default function BasicList() {
//   return (
//     <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
//       <nav aria-label="main mailbox folders">
//         <List>
//           <ListItem disablePadding>
//             <ListItemButton>
//               <ListItemText primary="Inbox" />
//             </ListItemButton>
//           </ListItem>
//           <ListItem disablePadding>
//             <ListItemButton>
//               <ListItemText primary="Drafts" />
//             </ListItemButton>
//           </ListItem>
//         </List>
//       </nav>
//       <Divider />
//       <nav aria-label="secondary mailbox folders">
//         <List>
//           <ListItem disablePadding>
//             <ListItemButton>
//               <ListItemText primary="Trash" />
//             </ListItemButton>
//           </ListItem>
//           <Divider />
//           <ListItem disablePadding>
//             <ListItemButton component="a" href="#simple-list">
//               <ListItemText primary="Spam" />
//             </ListItemButton>
//           </ListItem>
//         </List>
//       </nav>
//     </Box>
//   );
// }

// import * as React from 'react';
// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
// import ListItemText from '@mui/material/ListItemText';
// import Divider from '@mui/material/Divider';

// const style = {
//   width: '100%',
//   maxWidth: 360,
//   bgcolor: 'background.paper',
// };

// export default function ListDividers() {
//   return (
//     <List sx={style} component="nav" aria-label="mailbox folders">
//       <ListItem button>
//         <ListItemText primary="Store1" />
//       </ListItem>
//       <Divider />
//       <ListItem button divider>
//         <ListItemText primary="Store2" />
//       </ListItem>
//       <ListItem button>
//         <ListItemText primary="Store3" />
//       </ListItem>
//       <Divider light />
//       <ListItem button>
//         <ListItemText primary="Store4" />
//       </ListItem>
//     </List>
//   );
// }
