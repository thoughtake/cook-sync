import { useModal } from "@/context/modal-context";
import StandardButton from "../button/standard-button";

type Props = {
  message: string;
  onConfirm: () => void;
};

const ModalConfirm = (props: Props) => {
  const { closeModal } = useModal();

  const { message, onConfirm } = props;

  const handleConfirm = () => {
    onConfirm();
    closeModal();
  };

  return (
    <div>
      <p className="text-center text-xl font-bold mb-5">{message}</p>
      <div className="flex gap-4">
        <StandardButton
          label="キャンセル"
          variant="filled"
          color="gray"
          className="flex-1"
          onClick={closeModal}
        />
        <StandardButton
          label="OK"
          variant="filled"
          color="red"
          className="flex-1"
          onClick={handleConfirm}
        />
      </div>
    </div>
  );
};

export default ModalConfirm;
