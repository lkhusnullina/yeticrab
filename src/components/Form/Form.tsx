import React, { useEffect, useState } from "react";
import { Button, TextArea, TextInput } from "@gravity-ui/uikit";
import { useAppDispatch } from "../../hooks";
import { addPlace, Item, updatePlace } from "../../store/placeSlice";

interface FormProps {
  initialData?: Item | null;
  onClose: () => void;
}

const Form: React.FC<FormProps> = ({ initialData, onClose }) => {
  const dispatch = useAppDispatch();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState(0);
  const [image, setImage] = useState("");
  const [place, setPlace] = useState("");

  useEffect(() => {
    if (initialData) {
        setName(initialData.name ?? '');
      setDescription(initialData.description ?? '');
      setImage(initialData.image ?? '');
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (initialData) {
      dispatch(updatePlace({ ...initialData, name: name, description, image: image  }));
    } else {
      const newPlace = {
        id: Date.now(),
        name,
        description,
        rating,
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
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextInput
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Название"
      />

      <TextArea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Описание"
        rows={4}
      />
      <TextInput
        value={image}
        onChange={(e) => setImage(e.target.value)}
        placeholder="Картинка"
      />
      <TextInput
        value={place}
        onChange={(e) => setPlace(e.target.value)}
        placeholder="Месторасположение"
      />

      <Button view="action" type="submit">
      {initialData ? "Обновить" : "Создать"}
      </Button>
    </form>
  );
};

export default Form;
