import ModalConfirm from "@/components/common/ui/modal/modal-confirm";
import { useModal } from "@/context/modal-context";
import { KeyedMutator } from "swr";
import { fetchJson } from "./fetchJson";

export type DeleteItemParams<T> = {
  id: number;
  endpoint: string;
  mutate: KeyedMutator<T>;
};

export const deleteItem = async <T,>({
  id,
  endpoint,
  mutate,
}: DeleteItemParams<T>): Promise<void> => {
  if (id) {
    try {

      await fetchJson({
        url: `${endpoint}/${id}`,
        method: "DELETE"
      })

      //GET
      await mutate();
    } catch (err) {
      alert("削除に失敗しました");
      console.error("削除エラー：", err, "ID：", id);
    }
  }
};

type DeleteItemWithConfirmParams<T> = Omit<DeleteItemParams<T>, "id">

//削除確認
export const useDeleteItemWithConfirm = <T,> ({ endpoint, mutate }: DeleteItemWithConfirmParams<T>) => {

  const {showModal} = useModal();

  return ({id, name}: {id: number, name: string})=>  showModal(
      <ModalConfirm
        message={`${name} を削除してよろしいですか？`}
        onConfirm={() => deleteItem({id, endpoint, mutate})}
      />
    );
  };