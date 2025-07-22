import { useModal } from "@/components/context/modal-context";
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
          text="キャンセル"
          bgColor="bg-cancel"
          textColor="text-white"
          className="flex-1"
          onClick={closeModal}
        />
        <StandardButton
          text="OK"
          bgColor="bg-attention"
          textColor="text-white"
          className="flex-1"
          onClick={handleConfirm}
        />
      </div>
    </div>
  );
};

export default ModalConfirm;
