import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Editor } from "@tinymce/tinymce-react";

const ContentEditModal = ({content, onSave, isOpen, onClose }) => {
  const [editorContent, setEditorContent] = useState(content || "");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setEditorContent(content || "");
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, [content]);

  const handleSave = () => {
    onSave(editorContent);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="bg-white w-[98vw] h-[95vh] max-w-[98vw] rounded-lg shadow-2xl flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >

        <div className="flex-1 p-1">
          {isLoading ? (
            <div className="w-full h-full animate-pulse bg-gray-100 rounded-md" />
          ) : (
            <Editor
              apiKey="ygwj4oiw000a86s30amkuhlfv9fnndfiakk5d48ho31pzrbs"
              value={editorContent}
              init={{
                height: "80vh",
                witdh:"100vw",
                menubar: true,
                plugins:
                  "advlist autolink lists link image charmap print preview anchor " +
                  "searchreplace visualblocks code fullscreen " +
                  "insertdatetime media table paste code help wordcount",
                toolbar:
                  "undo redo | formatselect | bold italic underline | " +
                  "alignleft aligncenter alignright alignjustify | " +
                  "bullist numlist outdent indent | image media table | " +
                  "removeformat | help",
              }}
              onEditorChange={(newContent) => setEditorContent(newContent)}
            />
          )}
        </div>

        <div className="p-2 border-t flex justify-end gap-4">
          <Button
            variant="outline"
            onClick={onClose}
            className="bg-black text-white hover:bg-gray-200 cursor-pointer"
          >
            Quay lại
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ContentEditModal;
