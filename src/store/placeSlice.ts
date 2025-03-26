import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Item {
    id: number;
    name?: string;
    description?: string;
    date?: string;
    rating?: number;
    image?: string;
    place?: string;
    status?: string;
}

export interface ItemState {
    place: Item[];
};

const place: Item[] = [
    {
      id: 1,
      name: "Старый вокзал",
      description: "Когда-то именно это здание было",
      date: "01.01.2000",
      rating: 3,
      image:
        "https://avatars.dzeninfra.ru/get-zen_doc/28064/pub_5ff2f026bb14d54ffb7beb1b_62bb184183c24f3fef071049/scale_1200",
      place: "г. Екатеринбург, ул. Вокзальная, 14.",
      status: "осмотрена",
    },
    {
      id: 2,
      name: "Старый вокзал",
      description: "Когда-то именно это здание",
      date: "01.01.2000",
      rating: 3,
      image:
        "https://avatars.dzeninfra.ru/get-zen_doc/28064/pub_5ff2f026bb14d54ffb7beb1b_62bb184183c24f3fef071049/scale_1200",
      place: "г. Екатеринбург, ул. Вокзальная, 14.",
      status: "осмотрена",
    },
    {
      id: 3,
      name: "Старый вокзал",
      description: "Когда-то именно это здание",
      date: "01.01.2000",
      rating: 5,
      image:
        "https://avatars.dzeninfra.ru/get-zen_doc/28064/pub_5ff2f026bb14d54ffb7beb1b_62bb184183c24f3fef071049/scale_1200",
      place: "г. Екатеринбург, ул. Вокзальная, 14.",
      status: "осмотрена",
    },
];


const initialState: ItemState = {
    place: place,
}

const placeSlice = createSlice({
    name: "place",
    initialState: initialState,
    reducers: {
        addPlace: (state, action: PayloadAction<Item>) => {
            state.place.push(action.payload)
        },
        deletePlace: (state, action: PayloadAction<number>) => {
            state.place = state.place.filter(item => item.id !== action.payload)
        },
        updatePlace: (state, action: PayloadAction<Item>) => {
            const index = state.place.findIndex(item => item.id === action.payload.id);
            if (index !== -1) {
                state.place[index] = action.payload
            }
        }
    }
})

export const { addPlace, deletePlace, updatePlace } = placeSlice.actions;
export default placeSlice.reducer;