import React, {useState, useRef} from 'react'
import Body from '../../../Body/Body'
import ImageCropper from '../../../Image-cropper/Image-cropper'
import {setFirstBodyCard, setBodyCardBlob} from '../../../../Redux/actions/bodyCardActions'
import {connect} from 'react-redux'

const mapStateToPops = state => {
    return{
        bodyCard: state.bodyCardReducer.bodyCard
    }
}

const mapDispatchToProps = dispatch => {
    return{
        setFirstBodyCard: bodyCard => dispatch(setFirstBodyCard(bodyCard)),
        setBodyCardImgBlob: blob => dispatch(setBodyCardBlob(blob))
    }
}

const BodyForm = ({ requestState, bodyCard, setFirstBodyCard, setBodyCardImgBlob}) => {
    const [inputImg, setInputImg] = useState("")

    const inputRef = useRef(null)

    const inputOnChange = (e) => {
        const file = e.target.files[0]
        const reader = new FileReader()

        reader.addEventListener('load', () => {
            setInputImg(reader.result)
        }, false)

        if(file) {
            reader.readAsDataURL(file)
        }
    }

    const cropperCallback = (blob) => {
        setInputImg("")
        const url = window.URL.createObjectURL(blob);
        setFirstBodyCard([{
            ...bodyCard[0],
            defaultImg: url,
            imgInput: true
        }])
        setBodyCardImgBlob(blob)
        document.getElementById("preview-body-img").src=url
    }

    const bodyCardTextForm = (e) => {
        e.preventDefault()

        if(e.target.name !== "body-img") {
            setFirstBodyCard([{
                ...bodyCard[0],
                [e.target.name]: e.target.value
            }])
        }
    }

    const bodyImgClick = (e) => {
        e.preventDefault()
        document.getElementById("body-input-img").click();
    }

    const bodyCardNextBtn = (e) => {
        e.preventDefault()

       e.target.classList.add('was-validated');
       if (e.target.checkValidity() === false) {
            e.stopPropagation();
        } else{
        document.getElementById('body-card-form').style.display="none"
        document.getElementById('article-form').style.display="block"
      }
    }

    const textAreaAdjust = (e) => {
        e.target.style.height = "1px";
        e.target.style.height = e.target.scrollHeight +"px";
      }

    const typeBtnClick = (e) => {
        setFirstBodyCard([{
            ...bodyCard[0],
            type: e.target.innerHTML
        }])

        const actives = document.querySelectorAll("#body-card-form .card-header button.active")
        actives.forEach(btn => {
            btn.classList.remove("active")
        })

        e.target.classList.add("active")
    }

    return(
        bodyCard[0] &&
        <div className="row mw-100" id="body-card-form">
            <div className="col-xl-6 col-lg-8 col-md-10 col-12 body-form-back mx-md-auto px-3 mr-3 ml-4">
                <div className="card mt-3 body-card-form">
                    <div className="card-header border-bottom">
                        <div className="btn-group w-100 ">
                            <button className="btn btn-outline-info active article-type py-2" onClick={typeBtnClick} id="body-type-Article">
                                Article
                            </button>
                            <button className="btn btn-outline-info article-type py-2" onClick={typeBtnClick} id="body-type-News">
                                News
                            </button>
                            <button className="btn btn-outline-info article-type py-2" onClick={typeBtnClick} id="body-type-Review">
                                Review
                            </button>
                        </div>
                    </div>
                    <div className="card-body">
                        <form className="form-group d-flex flex-column" onChange={bodyCardTextForm} onSubmit={bodyCardNextBtn} noValidate>
                            <div className="form-group mb-4">
                                <label for="body-img" className="form-label">Image</label>
                                <div className="article-form-img">
                                    <img src="/img/default-image.jpg" alt="preview-body" className="preview-body-img" id="preview-body-img" />
                                    <div className="choose-body-img  d-flex align-items-center justify-content-center">
                                        <button className="btn btn-outline-light card-form-img-btn" onClick={bodyImgClick}>
                                            Choose Image
                                        </button>
                                    </div>
                                </div>
                                {!bodyCard[0].imgInput ?
                                    <input
                                        type="file"
                                        id="body-input-img"
                                        name="body-img"
                                        accept="image/*"
                                        className="body-card-input-img form-control"
                                        ref={inputRef}
                                        onChange={inputOnChange}
                                        required
                                    />
                                    :
                                    <input
                                        type="file"
                                        id="body-input-img"
                                        name="body-img"
                                        accept="image/*"
                                        className="body-card-input-img form-control"
                                        ref={inputRef}
                                        onChange={inputOnChange}
                                    />
                                }
                                <div className="invalid-feedback">
                                    Please choose an image
                                </div>
                            </div>
                            <div className="form-group mb-4">
                                <label for="title"  className="form-label">Title</label>
                                <textarea
                                    className="body-form-title form-control"
                                    id="body-input-title" name="title" maxLength="105"
                                    value={bodyCard[0].title} required onChange={textAreaAdjust}>
                                </textarea>
                                <div className="invalid-feedback">
                                    The article must have a title
                                </div>
                            </div>
                            <div className="form-group  mb-5">
                                <label for="text" className="form-label">Text</label>
                                <textarea
                                    className="body-form-text text-white form-control"
                                    maxLength="245" name="text" id="body-input-text"
                                    value={bodyCard[0].text} required onChange={textAreaAdjust}>
                                </textarea>
                                <div className="invalid-feedback">
                                    The article must have a text
                                </div>
                            </div>
                            <button type="submit" className="btn-lg btn-info body-form-next" >Next</button>
                        </form>
                    </div>
                </div>
            </div>
            <div className="col-12 px-0 ml-lg-0 ml-4">
                <Body editMode={true} requestState={"Success"} header={true}/>
            </div>
            {
                inputImg &&
                    <ImageCropper
                        callback={cropperCallback}
                        inputImg={inputImg}
                        setInputImg={setInputImg}
                        aspect={16 / 9}
                        width={912}
                        height={513}
                    />
            }
        </div>
    )
}

export default connect(mapStateToPops, mapDispatchToProps)(BodyForm);