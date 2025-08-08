import DynamicForm from "@/components/private/dynamic-form";

const PostForm = ({
  formState,
  postTypes,
  loading,
  isContentModalOpen,
  setIsContentModalOpen,
  handleInputChange,
  handleSelectType,
  handleContentSave,
  handleStatusToggle, 
  handleSubmit,
  currentPost, 
  setIsSheetOpen,
}) => {
  const fields = [
    {
      type: "input",
      id: "title",
      name: "title",
      label: "Tiêu đề",
      onChange: handleInputChange,
      required: true,
    },
    {
      type: "content-editor",
      name: "content",
      label: "Nội dung",
      buttonText: "Chỉnh sửa nội dung",
      onClick: () => setIsContentModalOpen(true),
      onSave: handleContentSave,
      isOpen: isContentModalOpen,
      onClose: () => setIsContentModalOpen(false),
    },
    {
      type: "select",
      id: "postType",
      name: "type",
      label: "Loại bài viết",
      loading: loading, // Giả định loading ở đây cũng áp dụng cho postTypes
      placeholder: "Chọn loại...",
      options: postTypes.map((type) => ({ value: type.id, label: type.name })),
      onValueChange: handleSelectType,
      required: true,
    },
    {
      type: "input",
      id: "thumbnailFile",
      name: "thumbnailFile",
      label: "Hình ảnh đại diện",
      inputType: "file",
      onChange: handleInputChange,
      accept: "image/*",
    },
    {
      type: "file-preview",
      fileField: "thumbnailFile", 
      previewUrlField: "thumbnailUrl", 
      previewAltText: "Hình ảnh hiện tại",
    },
  ];

  return (
    <DynamicForm
      formState={formState}
      fields={fields}
      handleSubmit={handleSubmit}
      loading={loading}
      onCancel={() => setIsSheetOpen(false)}
    />
  );
};

export default PostForm;
