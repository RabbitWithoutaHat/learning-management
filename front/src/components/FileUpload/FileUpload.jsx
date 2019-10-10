import React, { useState } from 'react';
import { Label, Image, Form, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
const FileUpload = () => {
  const [file, setFile] = useState('');
  const [filename, setFilename] = useState('Choose File');
  const [FilePath, setUploadedFilePath] = useState('String');

  // const downloadRandomImage = () => {
  //   fetch('/download')
  //     .then(response => {
  //       const filename =  response.headers.get('Content-Disposition').split('filename=')[1];
  //       response.blob().then(blob => {
  //         let url = window.URL.createObjectURL(blob);
  //         let a = document.createElement('a');
  //         a.href = url;
  //         a.download = filename;
  //         a.click();
  //     });
  //  });
  // }
  const grabFile = e => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };
  const but = async e => {
    e.preventDefault();
    const resp = await fetch('/downloadtest');
    const data = await resp;
  };
  const onSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);
    let resp = await fetch('/upload', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
      body: formData,
    });
    try {
      let { fileName, filePath } = await resp.json();
      setUploadedFilePath({ filePath });
      console.log('sssss', FilePath);
    } catch (err) {
      console.log(err);
    }
  };
  //   let { fileName, filePath } = await resp.data.json();
  //   setUploadedFile({ fileName, filePath });
  // } catch (err) {
  //   if (err.response.status === 500) {
  //     console.log('The was a problem with the server');
  //   } else {
  //     console.log(err.response.data.message);

  //   }
  // }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="custom-file mb-4">
          <input type="file" className="custom-file-input" id="customFile" onChange={grabFile} />
          <label className="custom-file-label" htmlFor="customFile">
            {filename}
          </label>
        </div>
        <input type="submit" value="Upload" className="btn btn-primary btn-block mt-4"></input>
      </form>
      {/* {uploadedFile} */}
      <Image src={FilePath.filePath} size="small" circular />
      <div>
        {/* <a src='/images/lenin.svg' download="lenin.svg" target="_blank"> </a> */}
        <Link
          to={FilePath.filePath}
          // to="./images/IMG_7778.jpg"
          download
          target="_blank"
        >
          download
        </Link>
        {/* <a href= '/home/oleg-lasttry/Final Project/learning-management/back/public/images/lenin.svg' download> Click */}
        {/* <img src='/images/lenin.svg' alt='xx' /> */}
        {/* </a> */}
      </div>
    </div>
  );
};
export default FileUpload;
