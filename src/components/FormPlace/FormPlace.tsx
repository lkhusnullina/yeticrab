import React, { useEffect, useState } from "react";
import { Button, Select, TextArea, TextInput } from "@gravity-ui/uikit";
import { useAppDispatch } from "../../hooks";
import { IPlace } from "../../models/IPlace";
import { addPlace, updatePlace } from "../../store/placeSlice";
import styles from "../FormPlace/FormPlace.module.scss";

interface FormPlaceProps {
  initialData?: IPlace | null;
  onClose: () => void;
}

const FormPlace: React.FC<FormPlaceProps> = ({ initialData, onClose }) => {
  const dispatch = useAppDispatch();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState<number| null>(null);
  const [image, setImage] = useState("");
  const [place, setPlace] = useState("");
  const [latitude, setLatitude] = useState<number| null>(null);
  const [longitude, setLongitude] = useState<number| null>(null);

  useEffect(() => {
    if (initialData) {
      setName(initialData.name ?? "");
      setDescription(initialData.description ?? "");
      setImage(initialData.image ?? "");
      setPlace(initialData.place ?? "");
      setRating(initialData.rating ?? null);
      setLatitude(initialData.latitude ?? null);
      setLongitude(initialData.longitude ?? null);
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;

    if (initialData) {
      dispatch(
        updatePlace({
          ...initialData,
          name,
          description,
          rating: rating || 1,
          image,
          place,
          latitude: latitude || undefined,
          longitude: longitude || undefined,
        })
      );
    } else {
      const newPlace = {
        name,
        description,
        rating:rating || 0,
        image,
        place,
        latitude: latitude || undefined,
        longitude: longitude || undefined,
      };
      dispatch(addPlace(newPlace));
    }
    onClose();
    setName("");
    setDescription("");
    setImage("");
    setPlace("");
    setRating(null);
    setLatitude(null);
    setLongitude(null);

  };

  const handleRatingChange = (value: string[]) => {
    setRating(value[0] ? parseInt(value[0]) : null);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <TextInput
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Название"
        size="l"
        validationState={!name ? "invalid" : undefined}
      />

      <TextArea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Описание"
        rows={6}
      />
      {initialData?.rating && <Select
        label="Рейтинг"
        value={rating ? [rating.toString()] : []}
        placeholder="Рейтинг"
        size="l"
        onUpdate={handleRatingChange}
        options={[
          { value: "1", content: "1" },
          { value: "2", content: "2" },
          { value: "3", content: "3" },
          { value: "4", content: "4" },
          { value: "5", content: "5" },
        ]}
      />}
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
        type="number"
        value={latitude?.toString() || ""}
        onChange={(e) => setLatitude(parseFloat(e.target.value) || null)}
        placeholder="Укажите широту"
        size="l"
      />
      <TextInput
        type="number"
        value={longitude?.toString() || ""}
        onChange={(e) => setLongitude(parseFloat(e.target.value) || null)}
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

export default FormPlace;
