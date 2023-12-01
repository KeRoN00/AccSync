import { Button, Modal } from "@mui/material";

import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useState } from "react";
import { DeleteAccessFormProps } from "../../../components/forms/delete/DeleteAccessForm";
type DeleteButtonProps = {
  children: string;
  formComponent: React.ElementType<DeleteAccessFormProps>;
  onSubmit?: () => void;
  data: number | undefined; //lub inne
};

const DeleteAccessButton: React.FC<DeleteButtonProps> = ({
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
      <Modal
        open={open}
        onClose={handleClose}
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <FormComponent
          onSubmit={() => {
            handleSubmit();
            handleClose;
          }}
          id={data}
        />
      </Modal>
    </>
  );
};

export default DeleteAccessButton;
