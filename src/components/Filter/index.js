import {TextField} from '@mui/material';
import {observer} from 'mobx-react-lite';

export const Filter = ({
  value,
  onInput,
  ...props
}) => {
  return (
    <div {...props}>
      <TextField
        id="filled-search"
        label="Search field"
        type="search"
        variant="filled"
        value={value}
        onInput={onInput}
      />
    </div>
  );
};