import { Button, Modal } from "@mui/material";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { ReactEventHandler, useState } from "react";
import { AddAccessFormProps } from "../../../components/forms/add/AddAccessForm";

interface AddButtonProps {
  formComponent: React.ElementType<AddAccessFormProps>;
  onSubmit?: () => void;
  children: string;
}

const AddAccessButton: React.FC<AddButtonProps> = ({
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
          justifyContent: "center"
        }}
        open={open}
        onClose={handleClose}
      >
        <FormComponent
          onSubmit={() => {
            handleSubmit();
            handleClose;
          }}
        />
      </Modal>
    </>
  );
};

export default AddAccessButton;
