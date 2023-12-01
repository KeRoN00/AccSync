import { Button, Modal } from "@mui/material";

import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useState } from "react";
import { DeleteAppFormProps } from "../../../components/forms/delete/DeleteAppForm";
type DeleteButtonProps = {
  children: string;
  formComponent: React.ElementType<DeleteAppFormProps>;
  onSubmit?: () => void;
  data: number | undefined; //lub inne
};

const DeleteAppButton: React.FC<DeleteButtonProps> = ({
  formComponent: FormComponent,
  onSubmit,
  children,
  data,
}) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
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
          backgroundColor: "red",
          color: "white",
          "&:hover": { backgroundColor: "darkred" },
        }}
      >
        <DeleteOutlineIcon />
        {children}
      </Button>
      <Modal open={open} onClose={handleClose}>
     
        <div>
        <FormComponent
            onSubmit={() => {
              handleSubmit();
              handleClose;
            }}
            id={data}
          />
          {/* Renderowanie dynamicznego formularza dla każdej podstrony */}
          <Button onClick={handleClose}>Zamknij</Button>
        </div>
      </Modal>
    </>
  );
};

export default DeleteAppButton;
