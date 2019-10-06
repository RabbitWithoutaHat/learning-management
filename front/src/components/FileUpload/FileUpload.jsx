import React, { Component, useState } from 'react'

const FileUpload = () => {
  const [file, setFile] = useState('');
  const [filename, setFilename] = useState('Choose File');
  const [uploadedFile, setUploadedFile] = useState({});
  const grabFile = e => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name)
  }
  const onSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);
    // console.log(file.arrayBuffer);
    // console.log(filename);
    // console.log(formData);
    
    let resp = await fetch('/upload', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        
      },
      body: formData,
    });
    try {

      let { fileName, filePath } = await resp.json();
      setUploadedFile({ fileName, filePath });
      console.log('sssss',fileName,filePath);
      
    } catch (err) {
      console.log(err);
      
        
      
    }
  }
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
      <div>
    DownLoad The FIle 
    <a href='./images/lenin.svg' download="lenin.svg" target="_blank">Click to download</a>
    

      </div>
    </div>
  )
}
export default FileUpload;