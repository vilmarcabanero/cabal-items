/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import {
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { getColorForAmount } from "../utils/color";

const ItemFormModal: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [details, setDetails] = useState("");
  const [date, setDate] = useState<Date | null>(new Date());

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    const numericPrice = parseInt(price.replace(/,/g, ''), 10);
    // Prepare the data to be sent
    const itemData = { name, price: numericPrice, date, details };

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/item`, {
        // Replace with your actual API endpoint
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(itemData),
      });

      if (response.status === 201) {
        console.log("Item added successfully");
        handleClose(); // Close the modal on successful addition
        setName('');
        setPrice('');
        setDetails('');
        setDate(new Date());
      } else {
        console.log("Failed to add item:", await response.text());
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handlePriceInputChange = (event: any) => {
    // Remove non-numeric characters except commas
    const value = event.target.value.replace(/[^0-9,]/g, '');

    // Convert to number and format with commas
    const numericValue = parseInt(value.replace(/,/g, ''), 10);
    if (!isNaN(numericValue)) {
      setPrice(numericValue.toLocaleString());
    } else {
      setPrice('');
    }
  }

  // Determine the color
  const color = getColorForAmount(parseInt(price.replace(/,/g, ''), 10) || 0);

  return (
    <div>
      <Button variant="outlined" onClick={handleOpen}>
        Add item
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ mt: 1, mx: "auto" }}>Add New Item</DialogTitle>
        <DialogContent sx={{ maxWidth: "25rem" }}>
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
                type="text"
                value={price}
                onChange={handlePriceInputChange}
                fullWidth
                sx={{ mt: 2, input: { color: color } }}
              />
              <TextField
                label="Details"
                value={details}
                onChange={(event) => setDetails(event.target.value)}
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
        <DialogActions sx={{ m: 2 }}>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ItemFormModal;
