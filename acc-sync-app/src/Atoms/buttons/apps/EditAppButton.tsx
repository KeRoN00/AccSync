import { Button, Modal } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { ReactEventHandler, useState } from "react";
import { AppDTO } from "../../../api";
import { EditAppFormProps } from "../../../components/forms/edit/EditAppForm";
interface EditButtonProps {
  formComponent: React.ElementType<EditAppFormProps>;
  onSubmit?: () => void;
  children: string;
  data: AppDTO; //lub inne
}

const EditAppButton: React.FC<EditButtonProps> = ({
  formComponent: FormComponent,
  onSubmit,
  children,
  data,
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
          data={data}
        />
      </Modal>
    </>
  );
};

export default EditAppButton;
