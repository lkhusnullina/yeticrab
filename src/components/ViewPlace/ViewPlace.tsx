import { Item } from "../../store/placeSlice";
import { Button, Card, Text } from "@gravity-ui/uikit";
import styles from "../ViewPlace/ViewPlace.module.scss";

interface ViewPlaceProps {
  initialData?: Item | null;
  onClose: () => void;
}

const ViewPlace: React.FC<ViewPlaceProps> = ({ initialData, onClose }) => {
  if (!initialData) {
    return <p>Данные отсутствуют</p>;
  }

  return (
    <Card className={styles.card} type="container" size="l">
      <div className={styles.card__info}>
        <Text variant="display-1">{initialData.name}</Text>
        <Text color="primary">{initialData.description}</Text>
        <Text color="primary">Дата и время добавления: {initialData.date}</Text>
        <Text color="primary">Рейтинг: {initialData.rating}</Text>
        <Text color="primary">Адрес: {initialData.place}</Text>
        <Text color="primary">Координаты: {initialData.latitude}, {initialData.longitude}</Text> 
       
         {/* <Text color="primary">На карте: {initialData.coordinates}</Text> */}
      </div>

      <img
        className={styles.card__img}
        src={initialData.image}
        alt={initialData.name}
      />
      <Button onClick={onClose} view="outlined-warning" size="l">
        Закрыть
      </Button>
    </Card>
  );
};

export default ViewPlace;
