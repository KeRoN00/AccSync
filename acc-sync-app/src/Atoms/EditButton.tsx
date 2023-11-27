import { Button, Modal } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { ReactEventHandler, useState } from "react";
import { EditUserFormProps } from "../forms/edit/EditUserForm";
import { UserDTO } from "../types/User";
interface EditButtonProps {
  formComponent: React.ElementType<EditUserFormProps>;
  onSubmit?: () => void;
  children: string;
  data: UserDTO //lub inne
}

const EditButton: React.FC<EditButtonProps> = ({
  formComponent: FormComponent,
  onSubmit,
  children,
  data
}) => {
  const [open, setOpen] = useState(false);

  const handleOpen: ReactEventHandler = () => {
    setOpen(true);
  };

  const handleClose: ReactEventHandler = () => {
    setOpen(false);
  };
  const handleSubmit = () => {
    // Wywołaj funkcję onSubmit przekazaną jako prop
    if (onSubmit) {
      onSubmit();
    }
    // Zamknij backdrop
    setOpen(false);
  };
  return (
    <>
      <Button variant="contained" onClick={handleOpen}>
        <EditIcon />
        {children}
      </Button>
      <Modal
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        open={open}
        onClose={handleClose}
      >
        <div className="">
          {/* Renderowanie dynamicznego formularza dla każdej podstrony */}
          <FormComponent
            onSubmit={() => {
              handleSubmit();
              handleClose;
            }}
            data={data}
          />
          {/* Dodaj przycisk do wysyłania danych */}
          <Button onClick={handleSubmit}>Zapisz</Button>
          <Button onClick={handleClose}>Anuluj</Button>
        </div>
      </Modal>
    </>
  );
};

export default EditButton;
