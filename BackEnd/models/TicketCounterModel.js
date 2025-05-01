import mongoose from "mongoose";

const TicketCounterSchema = new mongoose.Schema({
  date: { type: String, required: true, unique: true },
  counter: { type: Number, default: 1 },
});

const TicketCounterModel =
  mongoose.models.TicketCounter ||
  mongoose.model("TicketCounter", TicketCounterSchema);
export default TicketCounterModel;
