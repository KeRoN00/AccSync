import { Button, Modal } from "@mui/material";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { ReactEventHandler, useState } from "react";
import { AddAppFormProps } from "../../../components/forms/add/AddAppForm";
interface AddButtonProps {
  formComponent: React.ElementType<AddAppFormProps>;
  onSubmit?: () => void;
  children: string;
}

const AddAppButton: React.FC<AddButtonProps> = ({
  formComponent: FormComponent,
  onSubmit,
  children,
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
      <Button
        variant="contained"
        onClick={handleOpen}
        sx={{
          backgroundColor: "green",
          color: "white",
          "&:hover": { backgroundColor: "darkgreen" },
        }}
      >
        <AddOutlinedIcon />
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
          />
          {/* Dodaj przycisk do wysyłania danych */}
          <Button onClick={handleSubmit}>Zapisz</Button>
          <Button onClick={handleClose}>Anuluj</Button>
        </div>
      </Modal>
    </>
  );
};

export default AddAppButton;
