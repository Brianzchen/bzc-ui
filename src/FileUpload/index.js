// @flow
import * as React from 'react';

import Box from '../Box';
import styler from '../styler';
import useTheme from '../useTheme';
import type { StyleT } from '../types';

export type FileUploadT = {|
  /**
   * A render func that is passed the `draggedOver` state
   * in case the child wants to render differently depending
   * on whether there are files dragged over the component
   */
  children?: ({|
    draggedOver: boolean,
  |}) => React.Node,
  /**
   * Whether clicking on the component should trigger the file upload
   * functionality also
   */
  uploadOnClick?: boolean,
  /**
   * Function to trigger when the data is passed into the browser
   * via drag and drop or click to add.
   * Returns an array of objects { fileName, data }
   */
  onFileAdded?: (Array<{|
    data: null | ArrayBuffer | string,
    raw: Blob,
    fileName: string,
  |}>) => void,
  /**
   * Optionally used if you want to restrict the file extensions allowed
   */
  accept?: string,
  /**
   * Whether file upload should allow multiple files
   */
  multiple?: boolean,
  /** overrides styling for root element */
  style?: StyleT,
|};

/**
 * Wrapper component to support uploading files with drag and drop or click to add functionality
 */
const FileUpload: React$AbstractComponent<FileUploadT, HTMLElement> = React.forwardRef<FileUploadT, HTMLElement>(({
  children = () => null,
  uploadOnClick = true,
  onFileAdded,
  accept,
  multiple = false,
  style = {},
}: FileUploadT, ref): React.Node => {
  const theme = useTheme();
  const inputRef = React.useRef(null);
  const [draggedOver, setDraggedOver] = React.useState(false);

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDraggedOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDraggedOver(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDraggedOver(true);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const dataFile = e.dataTransfer;
    if (dataFile) {
      const { files } = dataFile;

      const filesParsed = [];
      for (let i = 0, len = (multiple ? files.length : 1); i < len; i++) {
        const fileName: string = files[i].name;
        const fileExtension = accept ?? '';
        if (fileName.lastIndexOf(fileExtension) === fileName.length - fileExtension.length) {
          const fileData = new FileReader();
          fileData.readAsText(dataFile.files[i]);
          fileData.onload = () => {
            filesParsed.push({
              data: fileData.result,
              raw: dataFile.files[i],
              fileName,
            });
            if (len === filesParsed.length && onFileAdded) {
              onFileAdded(filesParsed);
            }
          };
        }
      }
    }
    setDraggedOver(false);
  };

  const handleFileClickAdded = (e) => {
    const { files } = e.target;

    const filesParsed = [];
    for (let i = 0, len = files.length; i < len; i++) {
      const { current } = inputRef;
      const fileName = files[i].name;
      if (current) {
        const fileData = new FileReader();
        fileData.readAsText(current.files[i]);
        fileData.onload = () => {
          filesParsed.push({
            data: fileData.result,
            raw: current.files[i],
            fileName,
          });
          if (len === filesParsed.length && onFileAdded) {
            onFileAdded(filesParsed);
          }
        };
      }
    }
  };

  const styles = {
    fileUpload: styler(style, theme, {
      cursor: 'pointer',
    }),
  };

  return (
    <Box
      ref={ref}
      onClick={uploadOnClick
        ? () => {
          if (inputRef.current) {
            inputRef.current.click();
          }
        }
        : undefined}
      onDrop={(e) => handleDrop(e)}
      onDragOver={(e) => handleDragOver(e)}
      onDragEnter={(e) => handleDragEnter(e)}
      onDragLeave={(e) => handleDragLeave(e)}
      style={styles.fileUpload}
    >
      {children({
        draggedOver,
      })}
      {uploadOnClick && (
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          style={{
            display: 'none',
          }}
          onChange={handleFileClickAdded}
        />
      )}
    </Box>
  );
});

FileUpload.displayName = 'FileUpload';

export default FileUpload;
