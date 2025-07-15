import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Editor } from "@tinymce/tinymce-react";

const ContentEditModal = ({ content, onSave, isOpen, onClose }) => {
  const [editorContent, setEditorContent] = useState(content || "");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay for smoother transition
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  const handleSave = () => {
    onSave(editorContent);
    onClose();
  };

  if (isLoading) {
    return <div className="flex items-center justify-center h-full">Loading...</div>;
  }

  return (
    isOpen && (
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            onClose();
          }
        }}
      >
        <div 
          className="bg-white w-[90vw] h-[95vh] max-w-[98vw] rounded-lg shadow-2xl flex flex-col overflow-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold">Edit Article Content</h2>
          </div>

          <div className="flex-1 p-4">
            <Editor
              apiKey="ygwj4oiw000a86s30amkuhlfv9fnndfiakk5d48ho31pzrbs"
              value={editorContent}
              init={{
                height: "85vh",
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
          </div>

          <div className="p-6 border-t flex justify-end gap-4">
            <Button 
              variant="outline"
              onClick={onClose}
              className="bg-gray-100 hover:bg-gray-200"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSave}
              className="bg-primary hover:bg-primary-dark"
            >
              Save
            </Button>
          </div>
        </div>
      </div>
    )
  );
};

export default ContentEditModal;