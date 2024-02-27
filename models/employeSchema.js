import { Schema, model, models } from "mongoose";
import { v4 as uuidv4 } from "uuid";

const attendanceSchema = new Schema({
  date: {
    type: String,
  },
  month: {
    type: Number,
  },
  checkIn: {
    type: String,
  },
  checkOut: {
    type: String,
  },
  hoursAttended: {
    type: Number,
    default: 0,
  },
});

const employeeSchema = new Schema({
  id: {
    type: String,
    default: () => uuidv4(),
  },
  name: {
    type: String,
    required: true,
  },
  vacancyDaysCount: {
    type: Number,
    default: 0,
  },
  dailyAttendance: [attendanceSchema],
  monthlyAttendance: [
    {
      month: {
        type: String,
      },
      totalDays: {
        type: Number,
        default: 0,
      },
    },
  ],
  payPerHour: {
    type: Number,
  },
  vacationDays: [
    {
      date: {
        type: String,
      },
      reason: {
        type: String,
      },
    },
  ],
});

const Employee = models.Employee || model("Employee", employeeSchema);

export default Employee;
