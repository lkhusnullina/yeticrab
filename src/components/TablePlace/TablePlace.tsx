import { Modal, Table, Text } from "@gravity-ui/uikit";
import {Pencil, TrashBin} from '@gravity-ui/icons';
import styles from "../TablePlace/TablePlace.module.scss"
import { useAppDispatch, useAppSelector } from "../../hooks";
import { deletePlace, Item } from "../../store/placeSlice";
import Form from "../Form/Form";
import { useState } from "react";

export const TablePlace: React.FC<{ isAdmin: boolean }> = ({ isAdmin }) => {
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.places.place);
  const [open, setOpen] = useState(false);
  const [selectItem, setSelectItem] = useState<Item | null>(null);

  const handleDelete = (id: number) => {
    dispatch(deletePlace(id))
  }

  const handleEdit = (item: Item) => {
    setSelectItem(item);
    setOpen(true);
  }

  const columns = [
    { id: "name", name: "Название" },
    { id: "description", name: "Описание", template: (item: Item) => <Text color="primary">{item.description}</Text> },
    { id: "date", name: "Дата создания" },
    { id: "rating", name: "Рейтинг" },
    { id: "image", name: "Фото", template: (item: Item) => <img src={item.image} alt={item.name} style={{ width: "150px", height: "auto", borderRadius: "4px" }} /> },
    { id: "place", name: "Месторасположение" },
    { id: "status", name: "Статус" },
    ...(isAdmin ? [{
      id: "admin",
      name: "Администратор",
      template: (item: Item) => (
        <div className={styles.admin}>
          <Pencil onClick={() => handleEdit(item)}/>
          <TrashBin onClick={() => handleDelete(item.id)} />
        </div>
      )
    }] : [])
  ];
  return (
    <div>
      <Table
        data={data}
        columns={columns}
        emptyMessage="No data available"
        onRowClick={(item) => console.log("Row clicked:", item)}
      />
      <Modal open={open} onClose={() => setOpen(false)}>
        <div className="create__block">
          <Form initialData={selectItem} onClose={() => setOpen(false)}/>
        </div>
      </Modal>
    </div>
  );
};
