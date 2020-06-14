import React, { useState } from 'react';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
  KeyboardTimePicker,
} from '@material-ui/pickers';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  FormControl,
  makeStyles,
  InputLabel,
  Select,
  MenuItem,
} from '@material-ui/core';
import { useAuth } from '../Hooks/useAuth';
import { book } from '../Api/booking';

const useStyles = makeStyles({
  control: {
    display: 'flex',
    justifyContent: 'space-between',
  },
});

function Book({ restaurantId, open, handleClose }) {
  const { user } = useAuth();
  const { userId } = user;
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [people, setPeople] = useState(1);
  const classes = useStyles();

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleBooking = async () => {
    const newBooking = {
      restaurantId,
      userId,
      table: 1,
      people,
      date: selectedDate,
    };
    console.log(await book(newBooking));
    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Book Table</DialogTitle>
      <DialogContent>
        <DialogContentText>Restaurant: {book.name}</DialogContentText>
        <FormControl className={classes.control}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="dd/MM/yyyy"
              margin="normal"
              id="date-picker-inline"
              label="Date"
              value={selectedDate}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
            <KeyboardTimePicker
              margin="normal"
              id="time-picker"
              label="Time"
              value={selectedDate}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change time',
              }}
            />
          </MuiPickersUtilsProvider>
        </FormControl>
        <FormControl className={classes.formControl} fullWidth>
          <InputLabel id="demo-simple-select-label">People</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={people}
            onChange={(e) => setPeople(e.target.value)}
          >
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={4}>4</MenuItem>
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={6}>6</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="inherit">
          Cancel
        </Button>
        <Button onClick={handleBooking} color="secondary">
          Book
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default Book;
