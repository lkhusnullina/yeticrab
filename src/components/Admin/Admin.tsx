import { CirclePlus } from "@gravity-ui/icons";
import { Button, Modal, Switch } from "@gravity-ui/uikit";
import { useState } from "react";
import Form from "../Form/Form";

interface AdminProps {
  isAdmin: boolean;
  setIsAdmin: React.Dispatch<React.SetStateAction<boolean>>;
}

const Admin: React.FC<AdminProps> = ({ isAdmin, setIsAdmin }) => {
  
  const [open, setOpen] = useState(false);

  
  return (
    <div>
      <div className="header">
        <Switch
          className="switch"
          size="l"
          checked={isAdmin}
          onChange={() => setIsAdmin((prev) => !prev)}
        >
          Режим администратора
        </Switch>
        {isAdmin && (
          <div>
            <Button className="button__header" onClick={() => setOpen(true)}>
              <CirclePlus />
              Добавить
            </Button>
          </div>
        )}
      </div>
      <Modal open={open} onClose={() => setOpen(false)}>
        <div className="create__block">
          <Form onClose={() => setOpen(false)}/>
        </div>
      </Modal>
    </div>
  );
};

export default Admin;
