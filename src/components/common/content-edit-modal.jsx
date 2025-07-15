import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Editor } from "@tinymce/tinymce-react";

const ContentEditModal = ({ content, onSave }) => {
  const [editorContent, setEditorContent] = useState(content || "");
  const [isOpen, setIsOpen] = useState(false);

  const handleSave = () => {
    onSave(editorContent);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Content</Button>
      </DialogTrigger>
      <DialogContent
        modal={false}
        className="w-full max-w-none h-[95vh] p-4"
        style={{
          width: "100%",
          maxWidth: "100%",
          height: "95vh",
          overflow: "auto",
        }}
      >
        <DialogHeader>
          <DialogTitle>Edit Article Content</DialogTitle>
        </DialogHeader>

        <div className="mt-4">
          <Editor
            apiKey="ygwj4oiw000a86s30amkuhlfv9fnndfiakk5d48ho31pzrbs"
            value={content}
            init={{
              height: 500,
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

        <div className="mt-6 flex justify-end">
          <Button onClick={handleSave}>Save</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ContentEditModal;
