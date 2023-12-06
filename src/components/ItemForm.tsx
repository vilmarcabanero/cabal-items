import React, { useState } from 'react';
import { TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers';

const ItemFormModal: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [date, setDate] = useState<Date | null>(new Date());

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    // Handle the form submission here
    console.log({ name, price, date });
    handleClose(); // Close the modal on submit
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleOpen}>
        Add item
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{mt: 1, mx: 'auto'}}>Add New Item</DialogTitle>
        <DialogContent sx={{ maxWidth: '25rem' }}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <form>
              <TextField
                label="Item Name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                fullWidth
                sx={{ mt: 2 }}
              />
              <TextField
                label="Price"
                value={price}
                onChange={(event) => setPrice(event.target.value)}
                fullWidth
                sx={{ mt: 2 }}
              />
              <DatePicker
                label="Date"
                value={date}
                onChange={setDate}
                sx={{ mt: 2 }}
              />
              {/* You can place more form fields here */}
            </form>
          </LocalizationProvider>
        </DialogContent>
        <DialogActions sx={{m: 2}}>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant='contained' >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ItemFormModal;
