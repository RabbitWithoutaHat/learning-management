import React, { Component } from 'react'
import FileUpload from '../FileUpload/FileUpload';
export default class File extends Component {
  
  render() {
    return (
      // <div className='container mt-4'>
     <div className='container mt-4'>
      <div className="display-4 text center mb-4">
          <i className='fab fa-react' />
      </div>
        <FileUpload />
       </div>
      
    )
  }
}
