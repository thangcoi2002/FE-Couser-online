
import Modal from "../Modal";
import LessonItem from "./LessonItem";
import ClientEmpty from "../ClientEmpty";

function ListLesson({ data = [], onDelete, onOpen, showModal, onClose}) {
  if (data.length == 0) {
    return <ClientEmpty />;
  }

  return (
    <>
      {data.map((item, index) => (
        <LessonItem
          key={item._id}
          data={item}
          index={index}
          openModal={onOpen}
        />
      ))}

      <Modal
        title="Xóa bài học"
        description={"bạn có chắc xóa bài học này?"}
        showModal={showModal}
        onClose={onClose}
        onSubmit={onDelete}
      />
    </>
  );
}

export default ListLesson;
