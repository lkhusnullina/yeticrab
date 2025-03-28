import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as guid} from "uuid";
import { format } from "date-fns";
import { IPlace } from "../models/IPlace";
import { places } from "../models/places";

export interface PlaceState {
  place: IPlace[];
}

const initialState: PlaceState = {
  place: places,
};

const randomizeRating = (min: number = 1, max: number = 5): number => {
  return min + Math.floor((max - min + 1) * Math.random());
};

const placeSlice = createSlice({
  name: "place",
  initialState: initialState,
  reducers: {
    addPlace: (state, action: PayloadAction<IPlace>) => {
      const id = guid().toString();
      const date = format(Date.now(), "dd.MM.yyyy, hh:mm");
      const rating = randomizeRating();
      
      const newPlace = {...action.payload, id: id, date: date, rating: rating};
      state.place.push(newPlace as IPlace); 
    },
    deletePlace: (state, action: PayloadAction<string>) => {
      state.place = state.place.filter((item) => item.id !== action.payload);
    },
    updatePlace: (state, action: PayloadAction<IPlace>) => {
      const index = state.place.findIndex((item) => item.id === action.payload.id);
      if (index !== -1) {
        state.place[index] = action.payload;
      }
    },
  },
});

export const { addPlace, deletePlace, updatePlace } = placeSlice.actions;
export default placeSlice.reducer;