import { H5, P, SVG } from "../../../../../../AbstractElements";
import { useState } from "react";
import { Dropzone, ExtFile, FileMosaic } from "@dropzone-ui/react";
import { DragFilesHere } from "../../../../../../utils/Constant";
import { setFormValue } from "../../../../../../ReduxToolkit/Reducers/AddProductSlice";
import { useDispatch } from "react-redux";

const ProductGallery = () => {
  const [files, setFiles] = useState<ExtFile[]>([]);
  const dispatch = useDispatch()
  const updateFiles = (incomingFiles: ExtFile[]) => {
    setFiles(incomingFiles);
    dispatch(setFormValue({name:"fileName1",value:incomingFiles[0].file?.name}))
  };
  const removeFile = (id: string | number | undefined) => {
    setFiles(files.filter((x: ExtFile) => x.id !== id));
  };
  return (
    <div className="product-upload">
      <P>Product Gallery</P>
      <Dropzone onChange={(files)=>updateFiles(files)} value={files} maxFiles={1} header={false} footer={false} minHeight="80px" name="fileName1">
        {files.map((file: ExtFile) => (
          <FileMosaic key={file.id} {...file} onDelete={removeFile} info={true} />
        ))}
        {files.length === 0 && (
          <div className="dz-message needsclick">
            <SVG iconId="file-upload1" />
            <H5>{DragFilesHere}</H5>
            <span className="note needsclick">Add Product Gallery Images</span>
          </div>
        )}
      </Dropzone>
    </div>
  );
};

export default ProductGallery;
