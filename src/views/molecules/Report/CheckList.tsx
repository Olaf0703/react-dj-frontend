import { FC, useState } from 'react';
import List             from '@mui/material/List';
import ListItem         from '@mui/material/ListItem';
import ListItemButton   from '@mui/material/ListItemButton';
import ListItemText     from '@mui/material/ListItemText';
import Checkbox         from '@mui/material/Checkbox';
import { LSLabel }      from 'views/molecules/Setting/utils/Style';

const randomText = [
  'How can we raise a good child, one who will do the right thing, even when no one may see them do it',
  'To encourage empathy in your child, encourage your child to talk about her feelings and make sure she knows that you care about them.',
  'How can we raise a good child, one who will do the right thing, even when no one may see them do it',
  'Babies and young children learn best when they have warm, engaged and responsive relationships with their main carers.',
  'Letting your child make mistakes and find out for himself how the world works is a big part of learning.',
  'Babies and young children learn best when they have warm, engaged and responsive relationships with their main carers.',
  'No two children learn the same way or at the same pace. ',
  'You and your family have a vital role in what your child learns in these early years.',
  'You and your family have a vital role in what your child learns in these early years.',
  'You and your family have a vital role in what your child learns in these early years.',
  'You and your family have a vital role in what your child learns in these early years.',
  'No two children learn the same way or at the same pace. ',
]

export const LSCheckboxList: FC = () => {
  const [checked, setChecked] = useState([1]);

  const handleToggle = (value: number) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <>
      <LSLabel ml={15} fontSize={20}>{'Sophie\'s reports'}</LSLabel>
      <List dense sx={{
         width: '100%',
         bgcolor: 'background.paper',
         height: 340,
         position: 'relative',
         overflow: 'auto',
         }}>
        {/* <ListSubheader>sddd</ListSubheader> */}
        {randomText.map((value, index) => {
          const labelId = `checkbox-list-secondary-label-${value}`;
          return (
            <ListItem
              key={value}
              secondaryAction={
                <Checkbox
                  edge="end"
                  onChange={handleToggle(index)}
                  checked={checked.indexOf(index) !== -1}
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              }
              disablePadding
            >
              <ListItemButton>
                <ListItemText id={labelId} primary={value} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </>
  );
}
