import { CirclePlus } from "@gravity-ui/icons";
import { Button, Icon, Modal, Switch, Text } from "@gravity-ui/uikit";
import { useState } from "react";
import Form from "../Form/Form";
import styles from "../Admin/Admin.module.scss"
import { useAppSelector } from "../../hooks";

interface AdminProps {
  isAdmin: boolean;
  setIsAdmin: React.Dispatch<React.SetStateAction<boolean>>;
}

const Admin: React.FC<AdminProps> = ({ isAdmin, setIsAdmin }) => {
  const [open, setOpen] = useState(false);
  const count = useAppSelector(state => state.places.place);
  return (
    <div>
      <div className={styles.admin__header}>
        <Switch
          size="l"
          checked={isAdmin}
          onChange={() => setIsAdmin((prev) => !prev)}
        >
          Режим администратора
        </Switch>
        <Text color="primary">Общее количество {count.length}</Text>

        {isAdmin && (
          <Button
            view="outlined-action"
            size="l"
            className={styles.admin__button}
            onClick={() => setOpen(true)}
          >
            <Icon data={CirclePlus} size={18} />
            Добавить
          </Button>
        )}
      </div>
      <Modal open={open} onClose={() => setOpen(false)}>
        <div className="create__block">
          <Form onClose={() => setOpen(false)} />
        </div>
      </Modal>
    </div>
  );
};

export default Admin;
