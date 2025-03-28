import React, { useEffect, useState } from "react";
import { Button, Select, TextArea, TextInput } from "@gravity-ui/uikit";
import { useAppDispatch } from "../../hooks";
import { addPlace, Item, updatePlace } from "../../store/placeSlice";
import styles from "../Form/Form.module.scss";

interface FormProps {
  initialData?: Item | null;
  onClose: () => void;
}

const Form: React.FC<FormProps> = ({ initialData, onClose }) => {
  const dispatch = useAppDispatch();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState("1");
  const [image, setImage] = useState("");
  const [place, setPlace] = useState("");
  const [latitude, setLatitude] = useState<number>(0);
  const [longitude, setLongitude] = useState<number>(0);

  useEffect(() => {
    if (initialData) {
      setName(initialData.name ?? "");
      setDescription(initialData.description ?? "");
      setImage(initialData.image ?? "");
      setPlace(initialData.place ?? "");
      setRating(initialData.rating ?? "");
      setLatitude(initialData.latitude ?? 0);
      setLongitude(initialData.longitude ?? 0);
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (initialData) {
      dispatch(
        updatePlace({
          ...initialData,
          name,
          description,
          date: new Date().toLocaleDateString("ru-RU"),
          rating,
          image,
          place,
          latitude,
          longitude,
        })
      );
    } else {
      const newPlace = {
        id: Date.now(),
        name,
        description,
        date: new Date().toLocaleDateString("ru-RU"),
        rating: rating.toString(),
        image,
        place,
        latitude,
        longitude,
      };
      dispatch(addPlace(newPlace));
    }
    onClose();
    setName("");
    setDescription("");
    setImage("");
    setPlace("");
    setRating("");
    setLatitude(0);
    setLongitude(0);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <TextInput
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Название"
        size="l"
      />

      <TextArea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Описание"
        rows={6}
      />
      <Select
        label="Рейтинг"
        value={[rating]}
        placeholder="Рейтинг"
        size="l"
        onUpdate={(vals: string[]) => setRating(vals[0])}
        options={[
          { value: "1", content: "1" },
          { value: "2", content: "2" },
          { value: "3", content: "3" },
          { value: "4", content: "4" },
          { value: "5", content: "5" },
        ]}
      />
      <TextInput
        value={image}
        onChange={(e) => setImage(e.target.value)}
        placeholder="Ссылка на картинку"
        size="l"
      />
      <TextInput
        value={place}
        onChange={(e) => setPlace(e.target.value)}
        placeholder="Месторасположение"
        size="l"
      />
       <TextInput
        label="Широта"
        type="number"
        value={latitude.toString()}
        onChange={(e) => setLatitude(parseFloat(e.target.value) || 0)}
        placeholder="Укажите широту"
        size="l"
      />
      <TextInput
        label="Долгота"
        type="number"
        value={longitude.toString()}
        onChange={(e) => setLongitude(parseFloat(e.target.value) || 0)}
        placeholder="Укажите долготу"
        size="l"
      />
      <Button view="action" type="submit" size="l">
        {initialData ? "Обновить" : "Создать"}
      </Button>
      <Button onClick={onClose} view="outlined-warning" size="l">
        Закрыть
      </Button>
    </form>
  );
};

export default Form;
