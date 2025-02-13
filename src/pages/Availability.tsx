import React, { useState } from "react";
import {
  FormControlLabel,
  Checkbox,
  TextField,
  Button,
  Grid,
  Typography,
  Container,
  MenuItem,
} from "@mui/material";

const weekdays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
const timezones = ["UTC", "GMT", "EST", "PST", "IST", "CET", "JST"];

const Availability = () => {
  const [availability, setAvailability] = useState(
    weekdays.reduce((acc, day) => ({ ...acc, [day]: [] }), {})
  );
  const [selectedDay, setSelectedDay] = useState(weekdays[0]);
  const [timeSlot, setTimeSlot] = useState({
    start: "",
    end: "",
    timezone: "UTC",
  });
  const [copiedDay, setCopiedDay] = useState(null);

  const handleDayToggle = (day) => {
    setAvailability((prev) => ({
      ...prev,
      [day]: prev[day].length ? [] : prev[day],
    }));
  };

  const handleTimeChange = (e) => {
    setTimeSlot({ ...timeSlot, [e.target.name]: e.target.value });
  };

  const addTimeSlot = () => {
    if (timeSlot.start && timeSlot.end) {
      setAvailability((prev) => ({
        ...prev,
        [selectedDay]: [...prev[selectedDay], { ...timeSlot }],
      }));
      setTimeSlot({ start: "", end: "", timezone: timeSlot.timezone });
    }
  };

  const copyAvailability = () => {
    setCopiedDay(selectedDay);
  };

  const pasteAvailability = () => {
    if (copiedDay && copiedDay !== selectedDay) {
      setAvailability((prev) => ({
        ...prev,
        [selectedDay]: [...prev[copiedDay]],
      }));
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Set Your Availability
      </Typography>
      <Button variant="outlined" onClick={copyAvailability} sx={{ mb: 2 }}>
        Copy Availability
      </Button>
      <Button
        variant="outlined"
        onClick={pasteAvailability}
        sx={{ mb: 2, ml: 2 }}
      >
        Paste Availability
      </Button>
      <Grid container spacing={2}>
        {weekdays.map((day) => (
          <Grid item xs={4} key={day}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={!!availability[day].length}
                  onChange={() => handleDayToggle(day)}
                />
              }
              label={day}
            />
          </Grid>
        ))}
      </Grid>

      <Typography variant="h6" sx={{ mt: 2 }}>
        Select Time Slots
      </Typography>
      <TextField
        select
        SelectProps={{ native: true }}
        value={selectedDay}
        onChange={(e) => setSelectedDay(e.target.value)}
        fullWidth
      >
        {weekdays.map((day) => (
          <option key={day} value={day}>
            {day}
          </option>
        ))}
      </TextField>

      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={4}>
          <TextField
            label="Start Time"
            type="time"
            name="start"
            value={timeSlot.start}
            onChange={handleTimeChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            label="End Time"
            type="time"
            name="end"
            value={timeSlot.end}
            onChange={handleTimeChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            select
            label="Timezone"
            name="timezone"
            value={timeSlot.timezone}
            onChange={handleTimeChange}
            fullWidth
          >
            {timezones.map((tz) => (
              <MenuItem key={tz} value={tz}>
                {tz}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" onClick={addTimeSlot} fullWidth>
            Add
          </Button>
        </Grid>
      </Grid>

      <Typography variant="h6" sx={{ mt: 3 }}>
        Your Availability
      </Typography>
      {weekdays.map(
        (day) =>
          availability[day].length > 0 && (
            <Typography key={day}>
              {day}:{" "}
              {availability[day]
                .map(
                  ({ start, end, timezone }) =>
                    `${start} - ${end} (${timezone})`
                )
                .join(", ")}
            </Typography>
          )
      )}
    </Container>
  );
};

export default Availability;
