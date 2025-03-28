import { useState } from "react";
import { Modal, Table, Text, Select, Link, Button } from "@gravity-ui/uikit";
import { Eye, Pencil, TrashBin } from "@gravity-ui/icons";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { deletePlace } from "../../store/placeSlice";
import { IPlace } from "../../models/IPlace";
import Form from "../FormPlace/FormPlace";
import ViewPlace from "../ViewPlace/ViewPlace";
import styles from "../TablePlace/TablePlace.module.scss";
import Status from "../../enum/Status";

export const TablePlace: React.FC<{ isAdmin: boolean }> = ({ isAdmin }) => {
  const dispatch = useAppDispatch();
  const places = useAppSelector((state) => state.places.place);
  const [open, setOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [delOpen, setDelOpen] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState<IPlace | null>(null);

  const handleDelete = (place: IPlace) => {
    setSelectedPlace(place);
    setDelOpen(true);
  };

  const handleEdit = (place: IPlace) => {
    setSelectedPlace(place);
    setOpen(true);
  };

  const handleView = (place: IPlace) => {
    setSelectedPlace(place);
    setViewOpen(true);
  };

  const generateLink = (latitude?: number, longitude?: number) => {
    if (latitude && longitude) {
      return `https://www.google.com/maps?q=${latitude},${longitude}`;
    }
    return "#";
  };

  const columns = [
    {
      id: "name",
      name: "Название",
      template: (place: IPlace) => (
        <Text ellipsisLines={5} ellipsis={true}>
          {place.name}
        </Text>
      ),
    },
    {
      id: "description",
      name: "Описание",
      template: (place: IPlace) => (
        <Text ellipsisLines={3} ellipsis={true} word-break="break-all">
          {place.description}
        </Text>
      ),
    },
    { id: "date", name: "Дата создания" },
    {
      id: "rating",
      name: "Рейтинг",
    },
    {
      id: "image",
      name: "Фото",
      template: (place: IPlace) => (
        <img
          src={
            place.image ||
            "https://avatars.mds.yandex.net/i?id=6dcd61e0d73567f14625142cc54c597e_l-5233011-images-thumbs&n=13"
          }
          alt={place.name || "Изображение отсутсвует"}
          style={{ width: "350px", height: "auto", borderRadius: "4px" }}
        />
      ),
    },
    {
      id: "place",
      name: "Месторасположение",
      template: (place: IPlace) => (
        <Text ellipsisLines={3} ellipsis={true} word-break="break-all">
          {place.place}
        </Text>
      ),
    },
    {
      id: "coordinates",
      name: "Координаты",
      template: (place: IPlace) => (
        <Text ellipsisLines={4} ellipsis={true} word-break="break-all">
          {place.latitude} {place.longitude}
        </Text>
      ),
    },
    {
      id: "link",
      name: "Карта",
      template: (place: IPlace) => (
        <Link
          view="normal"
          href={generateLink(place.latitude, place.longitude)}
          target="_blank"
          rel="noopener noreferrer"
        >
          Открыть карту
        </Link>
      ),
    },
    {
      id: "status",
      name: "Статус",
      template: (place: IPlace) => (
        <Select
          size="l"
          defaultValue={[place.status || Status.PLANS]}
          options={[
            { value: Status.PLANS, content: Status.PLANS },
            { value: Status.VIEW, content: Status.VIEW },
          ]}
        />
      ),
    },
    ...(isAdmin
      ? [
          {
            id: "action",
            name: "Управление",
            template: (place: IPlace) => (
              <div className={styles.customTable__action}>
                <Eye onClick={() => handleView(place)} />
                <Pencil onClick={() => handleEdit(place)} />
                <TrashBin onClick={() => handleDelete(place)} />
              </div>
            ),
          },
        ]
      : []),
  ];
  return (
    <div>
      <Table
        data={places}
        columns={columns}
        className={styles.customTable}
        width={"max"}
      />

      <Modal open={viewOpen} onClose={() => setViewOpen(false)}>
        {selectedPlace && (
          <ViewPlace
            initialData={selectedPlace}
            onClose={() => setViewOpen(false)}
          />
        )}
      </Modal>

      <Modal open={open} onClose={() => setOpen(false)}>
        <Form initialData={selectedPlace} onClose={() => setOpen(false)} />
      </Modal>

      <Modal open={delOpen} onClose={() => setDelOpen(false)}>
        <div className={styles.deleteModal}>
          <Text>Вы уверены, что хотите удалить эту достопримечательность?</Text>
          <div className={styles.deleteModal__buttons}>
            <Button
              view="outlined-warning"
              size="l"
              width="max"
              onClick={() => {
                if (selectedPlace?.id) {
                  dispatch(deletePlace(selectedPlace.id));
                  setDelOpen(false);
                }
              }}
            >
              Да
            </Button>
            <Button
              view="outlined-success"
              size="l"
              width="max"
              onClick={() => setDelOpen(false)}
            >
              Нет
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
