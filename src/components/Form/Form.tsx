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
  

  useEffect(() => {
    if (initialData) {
      setName(initialData.name ?? "");
      setDescription(initialData.description ?? "");
      setImage(initialData.image ?? "");
      setPlace(initialData.place ?? "");
      setRating(initialData.rating ?? "");
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (initialData) {
      dispatch(updatePlace({ ...initialData, name, description, image, rating, date: new Date().toLocaleDateString("ru-RU") }));
    } else {
      const newPlace = {
        id: Date.now(),
        name,
        description,
        rating: rating.toString(),
        image,
        place,
        date: new Date().toLocaleDateString("ru-RU"),
      };
      dispatch(addPlace(newPlace));
    }
    onClose();
    setName("");
    setDescription("");
    setImage("");
    setPlace("");
    setRating("");
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

      <Button view="action" type="submit" size="l">
        {initialData ? "Обновить" : "Создать"}
      </Button>
      <Button onClick={onClose} view="outlined-warning" size="l">Закрыть</Button>
    </form>
  );
};

export default Form;
