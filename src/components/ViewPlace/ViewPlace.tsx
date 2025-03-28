import { Button, Card, Link, Text } from "@gravity-ui/uikit";
import styles from "../ViewPlace/ViewPlace.module.scss";
import { IPlace } from "../../models/IPlace";

interface ViewPlaceProps {
  initialData?: IPlace | null;
  onClose: () => void;
}

const ViewPlace: React.FC<ViewPlaceProps> = ({ initialData, onClose }) => {
  const generateLink = (latitude?: number, longitude?: number) => {
    if (latitude && longitude) {
      return `https://www.google.com/maps?q=${latitude},${longitude}`;
    }
    return "#";
  };
  if (!initialData) {
    return <p>Данные отсутствуют</p>;
  }

  return (
    <Card className={styles.card} type="container" size="l">
      <div className={styles.card__info}>
       <Text variant="display-1">{initialData.name}</Text>
       {initialData.description && <Text color="primary">{initialData.description}</Text>} 
        <Text color="primary">Дата и время добавления: {initialData.date}</Text>
        <Text color="primary">Рейтинг: {initialData.rating}</Text>
        {initialData.place && <Text color="primary">Адрес: {initialData.place}</Text>} 
        {initialData.latitude && initialData.longitude && <Text color="primary">Координаты: {initialData.latitude}, {initialData.longitude}</Text>} 
        <Text color="primary">
          <Link
            view="normal"
            href={generateLink(initialData.latitude, initialData.longitude)}
            target="_blank"
            rel="noopener noreferrer"
          >
            Посмотреть на карте
          </Link>
        </Text>
      </div>

      <img
        src={
          initialData.image ||
          "https://avatars.mds.yandex.net/i?id=6dcd61e0d73567f14625142cc54c597e_l-5233011-images-thumbs&n=13"
        }
        alt={initialData.name || "Изображение отсутсвует"}
        className={styles.card__img}
      />
      <Button onClick={onClose} view="outlined-warning" size="l">
        Закрыть
      </Button>
    </Card>
  );
};

export default ViewPlace;
