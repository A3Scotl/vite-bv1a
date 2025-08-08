import DynamicForm from "@/components/private/dynamic-form";

const DoctorForm = ({
  formState,
  positions,
  departments,
  positionsLoading,
  departmentsLoading,
  isContentModalOpen,
  setIsContentModalOpen,
  handleInputChange,
  handleSelectChange,
  handlePositionChange,
  handleContentSave,
  handleSubmit,
  loading,
  setIsSheetOpen,
  currentDoctor, 
}) => {
  const fields = [
    {
      type: "input",
      id: "fullName",
      name: "fullName",
      label: "Họ tên",
      onChange: handleInputChange,
      required: true,
    },
    {
      type: "select",
      id: "positionId",
      name: "position",
      label: "Vị trí",
      loading: positionsLoading,
      placeholder: "Chọn vị trí",
      options: positions.map((pos) => ({ value: pos, label: pos })),
      onValueChange: handlePositionChange,
      required: true,
    },
    {
      type: "select",
      id: "departmentId",
      name: "departmentId",
      label: "Phòng ban",
      loading: departmentsLoading,
      placeholder: "Chọn phòng ban",
      options: departments.map((dept) => ({ value: dept.id.toString(), label: dept.name })),
      onValueChange: handleSelectChange,
      required: true,
    },
    {
      type: "content-editor",
      name: "description",
      label: "Mô tả",
      buttonText: "Chỉnh sửa mô tả",
      onClick: () => setIsContentModalOpen(true),
      onSave: handleContentSave,
      isOpen: isContentModalOpen,
      onClose: () => setIsContentModalOpen(false),
    },
    {
      type: "input",
      id: "avatar",
      name: "avatar",
      label: "Ảnh đại diện",
      inputType: "file",
      onChange: handleInputChange,
      accept: "image/*",
    },
    {
      type: "file-preview",
      fileField: "avatar", 
      previewUrlField: "avatarUrl",
      previewAltText: "Ảnh đại diện hiện tại",
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

export default DoctorForm;
