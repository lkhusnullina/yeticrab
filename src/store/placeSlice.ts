import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Item {
  id: number;
  name?: string;
  description?: string;
  date?: string;
  rating?: string;
  image?: string;
  place?: string;
  status?: string;
  latitude?: number;
  longitude?: number;
}

export interface ItemState {
  place: Item[];
}

const place: Item[] = [
  {
    id: 1,
    name: "Храм на Крови",
    description: "В самом центре уральской столицы недалеко от Вознесенской горки величественно возвышается Храма на Крови. Его возвели там, где раньше стоял Ипатьевский дом, в котором в ночь на 17 июля 1918 года расстреляли последнего императора России Николая II, его супругу Александру Федоровну, юного сына Алексея, четырех дочерей и слуг. Сегодня памятник последним в роду Романовых, запечатленным перед казнью, можно увидеть у входа в храм.",
    date: "20.03.2025, 12:00",
    rating: "5",
    image:
      "https://avatars.mds.yandex.net/i?id=ab7b19c1242610e0c57d0c9f99624240_l-5270099-images-thumbs&n=13",
    place: "г. Екатеринбург, ул. Царская, 10",
    // coordinates: "56.844509, 60.608877",
    latitude: 56.844509,
    longitude: 60.608877,
    status: "осмотрена",
  },
  {
    id: 2,
    name: "Дом Севастьянова",
    description: "Сказочный малахитовый терем стоит совсем рядом с плотиной, возле набережной Исети. Нарядный особняк был построен в XIX веке и назван в честь одного из владельцев — российского предпринимателя и хозяина золотых приисков Николая Севастьянова.",
    date: "20.03.2025, 12:05",
    rating: "5",
    image:
      "https://extraguide.ru/images/sp/ce78398f00f19a03f5afa52ee062791213f84b8e.jpg",
    place: "г. Екатеринбург, Проспект Ленина, 35",
    latitude: 56.839408,
    longitude: 60.606557,
    // coordinates: "56.839408, 60.606557",
    status: "осмотрена",
  }
];

const initialState: ItemState = {
  place: place,
};

const placeSlice = createSlice({
  name: "place",
  initialState: initialState,
  reducers: {
    addPlace: (state, action: PayloadAction<Item>) => {
      state.place.push(action.payload);
    },
    deletePlace: (state, action: PayloadAction<number>) => {
      state.place = state.place.filter((item) => item.id !== action.payload);
    },
    updatePlace: (state, action: PayloadAction<Item>) => {
      const index = state.place.findIndex((item) => item.id === action.payload.id);
      if (index !== -1) {
        state.place[index] = action.payload;
      }
    },
  },
});

export const { addPlace, deletePlace, updatePlace } = placeSlice.actions;
export default placeSlice.reducer;