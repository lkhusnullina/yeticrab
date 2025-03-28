import { Modal, Table, Text, Select, Link } from "@gravity-ui/uikit";
import { Eye, Pencil, TrashBin } from "@gravity-ui/icons";
import styles from "../TablePlace/TablePlace.module.scss";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { deletePlace, Item } from "../../store/placeSlice";
import Form from "../Form/Form";
import { useState } from "react";
import ViewPlace from "../ViewPlace/ViewPlace";

export const TablePlace: React.FC<{ isAdmin: boolean }> = ({ isAdmin }) => {
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.places.place);
  const [open, setOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [selectItem, setSelectItem] = useState<Item | null>(null);

  const handleDelete = (id: number) => {
    dispatch(deletePlace(id));
  };

  const handleEdit = (item: Item) => {
    setSelectItem(item);
    setOpen(true);
  };

  const handleView = (item: Item) => {
    setSelectItem(item);
    setViewOpen(true);
  };

  const generateCoordinate = (latitude?: number, longitude?: number) => {
    if (latitude && longitude) {
      return `https://www.google.com/maps?q=${latitude},${longitude}`;
    }
    return "#";
  };

  const columns = [
    {
      id: "name",
      name: "Название",
      template: (item: Item) => (
        <Text ellipsisLines={5} ellipsis={true}>
          {item.name}
        </Text>
      ),
    },
    {
      id: "description",
      name: "Описание",
      template: (item: Item) => (
        <Text ellipsisLines={3} ellipsis={true} word-break="break-all">
          {item.description}
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
      template: (item: Item) =>
        item.image ? (
          <img
            src={item.image}
            alt={item.name}
            style={{ width: "350px", height: "auto", borderRadius: "4px" }}
          />
        ) : (
          <img
            src="https://avatars.mds.yandex.net/i?id=6dcd61e0d73567f14625142cc54c597e_l-5233011-images-thumbs&n=13"
            alt="Изображение отсутсвует"
            style={{ width: "350px", height: "auto", borderRadius: "4px" }}
          />
        ),
    },
    {
      id: "place",
      name: "Месторасположение",
      template: (item: Item) => (
        <Text ellipsisLines={3} ellipsis={true} word-break="break-all">
          {item.place}
        </Text>
      ),
    },
    {
      id: "coordinates",
      name: "Координаты",
      template: (item: Item) => (
        <Text ellipsisLines={4} ellipsis={true} word-break="break-all">
          {item.latitude} {item.longitude}
        </Text>
      ),
    },
    {
      id: "link",
      name: "Карта",
      template: (item: Item) => (
        <Link
          view="normal"
          href={generateCoordinate(item.latitude, item.longitude)}
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
      template: (item: Item) => (
        <Select
          size="l"
          defaultValue={[item.status || "в планах"]}
          options={[
            { value: "в планах", content: "В планах" },
            { value: "осмотрена", content: "Осмотрена" },
          ]}
        />
      ),
    },
    ...(isAdmin
      ? [
          {
            id: "control",
            name: "Управление",
            template: (item: Item) => (
              <div className={styles.control}>
                <Eye onClick={() => handleView(item)} />
                <Pencil onClick={() => handleEdit(item)} />
                <TrashBin onClick={() => handleDelete(item.id)} />
              </div>
            ),
          },
        ]
      : []),
  ];
  return (
    <div>
      <Table
        data={data}
        columns={columns}
        className={styles.mytable}
        width={"max"}
      />

      <Modal open={viewOpen} onClose={() => setViewOpen(false)}>
        {selectItem && (
          <ViewPlace
            initialData={selectItem}
            onClose={() => setViewOpen(false)}
          />
        )}
      </Modal>

      <Modal open={open} onClose={() => setOpen(false)}>
        <Form initialData={selectItem} onClose={() => setOpen(false)} />
      </Modal>
    </div>
  );
};
