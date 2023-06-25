import React, { useState, useEffect } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Api } from "../api/Api";

export default function Editor() {
  const [url, setUrl] = useState('');
  const [videoProvider, setVideoProvider] = useState('');
  const [show, setShow] = useState(false);
  const [showSecond, setShowSecond] = useState(false);
  const [ShowThird, setShowThird] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleCloseSecond = () => setShowSecond(false);
  const handleShowSecond = () => setShowSecond(true);
  const handleCloseThird = () => setShowThird(false);
  const handleShowThird = () => setShowThird(true);

  const [htmlContent, setHtmlContent] = useState('');
  const [imgUrl, setImageUrl] = useState('');


  const editorConfig = {
    ckfinder: {
      uploadUrl: '/',
    },
    allowedContent: true,
    extraAllowedContent: 'iframe[*]',
    mediaEmbed: {
      previewsInData: true
    }
  };

  const handleVideoEmbedSubmit = (e: any) => {
    e.preventDefault();
    let data = `<figure class="media"><oembed url=${url}></oembed></figure>`
    if (htmlContent) {
      setHtmlContent(htmlContent.concat(data));
    } else {
      setHtmlContent(data)
    }
  };



  const handlePicEmbedChange = async (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 20000);
    let res = await Api.postReq(formData)

    setImageUrl(res.data)


  }




  const handlePicEmbedSubmit = (e: any) => {
    e.preventDefault();
    let data = `<img src=${imgUrl}>`
    if (htmlContent) {
      setHtmlContent(htmlContent.concat(data));
    } else {
      setHtmlContent(data)
    }

  };


  return (

    <div className="editor">
      <div className="card">
        <div className="card-header">

        </div>
        <div className="card-body">
          <h5 className="card-title">This is the title</h5>

          <CKEditor
            editor={ClassicEditor}
            config={editorConfig}
            data={htmlContent}
            onReady={editor => {
              // You can store the "editor" and use when it is needed.
              console.log('Editor is ready to use!', editor);
            }}
            onChange={(event, editor) => {
              var data = editor.getData();
              setHtmlContent(data)
              console.log({ event, editor, data });
            }}
            onBlur={(event, editor) => {
              console.log('Blur.', editor);
            }}
            onFocus={(event, editor) => {
              console.log('Focus.', editor);
            }}
          />
          <div className="dropdown">
            <button
              className="btn btn-primary rounded-circle dropdown-toggle"
              type="button"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="fa fa-plus"></i>
            </button>

            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <h6 className="dropdown-header">Embed</h6>

              <li className=''>
                <div className='item icon'>
                  <a className="dropdown-item" onClick={handleShow}>
                    <svg className="picsvg" fill="#000000" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>image</title> <path d="M0 26.016q0 2.496 1.76 4.224t4.256 1.76h20q2.464 0 4.224-1.76t1.76-4.224v-20q0-2.496-1.76-4.256t-4.224-1.76h-20q-2.496 0-4.256 1.76t-1.76 4.256v20zM4 26.016v-20q0-0.832 0.576-1.408t1.44-0.608h20q0.8 0 1.408 0.608t0.576 1.408v20q0 0.832-0.576 1.408t-1.408 0.576h-20q-0.832 0-1.44-0.576t-0.576-1.408zM6.016 24q0 0.832 0.576 1.44t1.408 0.576h16q0.832 0 1.408-0.576t0.608-1.44v-0.928q-0.224-0.448-1.12-2.688t-1.6-3.584-1.28-2.112q-0.544-0.576-1.12-0.608t-1.152 0.384-1.152 1.12-1.184 1.568-1.152 1.696-1.152 1.6-1.088 1.184-1.088 0.448q-0.576 0-1.664-1.44-0.16-0.192-0.48-0.608-1.12-1.504-1.6-1.824-0.768-0.512-1.184 0.352-0.224 0.512-0.928 2.24t-1.056 2.56v0.64zM6.016 9.024q0 1.248 0.864 2.112t2.112 0.864 2.144-0.864 0.864-2.112-0.864-2.144-2.144-0.864-2.112 0.864-0.864 2.144z"></path> </g></svg>
                    <span className='top-menu'>Picture</span>
                    <br />
                    <span className='down-menu'>Jpg, Png</span>

                  </a>
                </div>
              </li>
              <li>

                <div className='item icon'>
                  <a className="dropdown-item" onClick={handleShowSecond}>
                    <svg fill="#000000" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M17 10.5V7C17 6.73478 16.8946 6.48043 16.7071 6.29289C16.5196 6.10536 16.2652 6 16 6H4C3.73478 6 3.48043 6.10536 3.29289 6.29289C3.10536 6.48043 3 6.73478 3 7V17C3 17.2652 3.10536 17.5196 3.29289 17.7071C3.48043 17.8946 3.73478 18 4 18H16C16.2652 18 16.5196 17.8946 16.7071 17.7071C16.8946 17.5196 17 17.2652 17 17V13.5L21 17.5V6.5L17 10.5ZM10.0014 15C9.92043 15 9.84028 14.9839 9.76561 14.9526C9.69095 14.9213 9.62325 14.8755 9.56647 14.8178C9.5097 14.7601 9.46497 14.6917 9.43491 14.6165C9.40485 14.5413 9.39006 14.4609 9.39138 14.38H10.6214C10.6214 14.4614 10.6053 14.542 10.5742 14.6173C10.543 14.6925 10.4974 14.7608 10.4398 14.8184C10.3822 14.876 10.3139 14.9216 10.2386 14.9528C10.1634 14.984 10.0828 15 10.0014 15ZM12.4614 14.08H7.54138V13.77L8.16138 13.15V11.62C8.12783 11.185 8.2474 10.752 8.49941 10.3959C8.75143 10.0398 9.12002 9.78302 9.54138 9.67V9.46C9.54393 9.3388 9.59322 9.22328 9.67894 9.13756C9.76466 9.05184 9.88018 9.00255 10.0014 9C10.1234 9 10.2404 9.04846 10.3267 9.13473C10.4129 9.221 10.4614 9.338 10.4614 9.46V9.67C10.8836 9.7828 11.2533 10.0392 11.507 10.3951C11.7607 10.7509 11.8825 11.1841 11.8514 11.62V13.15L12.4614 13.77V14.08Z"></path> </g></svg>
                    <span className='top-menu'>Video</span>
                    <br />
                    <span className='down-menu'>Jw player, Youtube, Vimeo</span>
                  </a>
                </div>

              </li>

              <div className='item icon'>
                <a className="dropdown-item" onClick={handleShowThird}>
                  <svg fill="#000000" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" ><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M70,57c-4.8,0-8.9,3.4-9.8,8H47c-0.6,0-1,0.5-1,1.1c0,0.3,0,0.6,0,0.9c0,1-0.1,1.9-0.3,2.8 c-0.1,0.6,0.4,1.2,1,1.2h14.1c1.5,3.5,5.1,6,9.2,6c5.5,0,10-4.5,10-10C80,61.5,75.5,57,70,57z"></path> </g> <g> <path d="M43.3,45.5c-1.2-0.5-2.3-1.2-3.3-2c-0.5-0.4-1.2-0.2-1.5,0.3l-7.1,13.3C31,57,30.5,57,30,57 c-5.5,0-10,4.5-10,10c0,5.5,4.5,10,10,10c5.5,0,10-4.5,10-10c0-2.9-1.2-5.4-3.1-7.3l6.9-12.8C44,46.4,43.8,45.8,43.3,45.5z"></path> </g> <g> <path d="M50,41c1,0,1.9-0.1,2.8-0.4l6.9,12.7c0.3,0.5,0.9,0.7,1.4,0.4c1.1-0.7,2.2-1.3,3.4-1.7 c0.6-0.2,0.8-0.9,0.5-1.4l-7.2-13.4c1.3-1.7,2.2-3.9,2.2-6.2c0-5.5-4.5-10-10-10s-10,4.5-10,10C40,36.5,44.5,41,50,41z"></path> </g> </g> </g></svg>
                  <span className='top-menu'>Social</span>
                  <br />
                  <span className='down-menu'>Instagram, Ticktok, Snapchat, Facebook</span>
                </a>
              </div>            </ul>
          </div>



          {/* pic modal */}
          <div className='pic-modal'>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <h3 className="control-label">Embed</h3>
              </Modal.Header>
              <Modal.Body>
                <section>
                  <form  >

                    <div className="container">
                      <p className='upload-image'>Upload Image</p>
                      <p className='file-upload'>File upload</p>
                      <div className="row">
                        <div className="col-md-12">

                          <div className="form-group">

                            <div className="preview-zone hidden">
                              <div className="box box-solid">

                                <div className="box-body"></div>
                              </div>
                            </div>
                            <div className="dropzone-wrapper">
                              <div className="dropzone-desc">
                                <i className="glyphicon glyphicon-download-alt"></i>
                                <button className="upload-btn btn bg-transparent btn-outline-success">Import Image from Device.</button>
                              </div>
                              <input
                                type="file"
                                name="img_logo"
                                className="dropzone"
                                onChange={(e) => handlePicEmbedChange(e)}
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-12">
                        </div>
                      </div>
                    </div>
                    <Button className="embed-btn" variant="primary" onClick={handlePicEmbedSubmit}>
                      {isLoading ? <i className='fa fa-refresh fa-spin'></i> : 'Embed'}

                    </Button>
                    <Button variant="secondary" className="close-btn" onClick={handleClose}>
                      Close
                    </Button>


                  </form>
                </section>
              </Modal.Body>
              <Modal.Footer>


              </Modal.Footer>
            </Modal>
          </div>

          {/* video modal */}
          <div className='video-modal'>
            <Modal show={showSecond} onHide={handleCloseSecond}>
              <Modal.Header closeButton>
                <h3 className="control-label">Embed</h3>

              </Modal.Header>
              <Modal.Body>
                <section>
                  <form  >
                    <div className="container">
                      <div className="row">
                        <div className="col-md-12">
                          <div className="form-group">
                            <div className="preview-zone hidden">
                              <div className="box box-solid">

                                <div className="box-body"></div>
                              </div>
                            </div>
                            <div className="mb-3">
                              <label className="control-label">VIDEO PROVIDER</label>

                              <select className='form-control input-form' value={videoProvider} onChange={(e: any) => setVideoProvider(e.target.value)}>
                                <option>Youtube</option>
                              </select>
                            </div>
                            <div className="mb-3">
                              <label className="control-label">URL</label>

                              <input type="text"
                                className="form-control input-form"
                                id="exampleInputPassword1"
                                value={url}
                                onChange={(e: any) => setUrl(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-12">
                        </div>
                      </div>
                    </div>
                    <Button className="embed-btn" variant="primary" onClick={handleVideoEmbedSubmit}>
                      Embed
                    </Button>
                    <Button variant="secondary" className="close-btn" onClick={handleCloseSecond}>
                      Close
                    </Button>


                  </form>
                </section>
              </Modal.Body>
              <Modal.Footer>


              </Modal.Footer>
            </Modal>
          </div>

          {/* social modal */}
          <div className='social-modal'>
            <Modal show={ShowThird} onHide={handleCloseThird}>
              <Modal.Header closeButton>
                <h3 className="control-label">Embed</h3>

              </Modal.Header>
              <Modal.Body>
                <section>
                  <form  >
                    <div className="container">
                      <div className="row">
                        <div className="col-md-12">
                          <div className="form-group">
                            <div className="preview-zone hidden">
                              <div className="box box-solid">

                                <div className="box-body"></div>
                              </div>
                            </div>
                            <div className="mb-3">
                              <label className="control-label">SOCIAL MEDIA PLATFORM</label>

                              <select className='form-control input-form' value={videoProvider} onChange={(e: any) => setVideoProvider(e.target.value)}>
                                <option>Facebook</option>
                              </select>
                            </div>
                            <div className="mb-3">
                              <label className="control-label">URL</label>

                              <input type="text"
                                className="form-control input-form"
                                id="exampleInputPassword1"
                                value={url}
                                onChange={(e: any) => setUrl(e.target.value)}
                              />
                            </div>

                            <div className="mb-3">
                              <label className="control-label">CODE</label>

                              <input type="text"
                                className="form-control input-form"
                                id="exampleInputPassword1"
                                value={"<iframe width=“560” height=“315” src=“https://www.youtube.com/embed/9Q8di14SuE4” title=“YouTube…"}
                                onChange={(e: any) => setUrl(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-12">
                        </div>
                      </div>
                    </div>
                    <Button className="embed-btn" variant="primary">
                      Embed
                    </Button>
                    <Button variant="secondary" className="close-btn">
                      Close
                    </Button>


                  </form>
                </section>
              </Modal.Body>
              <Modal.Footer>


              </Modal.Footer>
            </Modal>
          </div>

        </div>
      </div>

    </div>

  );
}