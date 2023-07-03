
import { useState } from 'react';
import useMutation from '../hooks/useMutation';
import useQuery from '../hooks/useQuery';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const validFileTypes = ['image/jpg', 'image/jpeg', 'image/png'];
const URL = 'https://file-upload-api-lqoy.onrender.com/upload';

const ErrorText = ({ children, ...props }) => (
  <p  {...props}>
    {children}
  </p>
);

function nav(url){
  return 
}
const Posts = () => {
  const [refetch, setRefetch] = useState(0);
  const navigate = useNavigate()
  const {
    mutate: uploadImage,
    isLoading: uploading,
    error: uploadError,
  } = useMutation({ url: URL });

  const {
    data: imageUrls = [],
    key: keys=[],
    error: fetchError,
  } = useQuery(URL, refetch);
  console.log(imageUrls,keys)
  const [error, setError] = useState('');

  const handleUpload = async e => {
    const file = e.target.files[0];

    // if (!validFileTypes.find(type => type === file.type)) {
    //   setError('File must be in JPG/PNG format');
    //   return;
    // }

    const form = new FormData();
    form.append('image', file);


    await uploadImage(form);
    setTimeout(() => {
      setRefetch(s => s + 1);
    }, 1000);
    // window.location.reload()
  };

  const deletecall =async(url)=>{
    console.log(url)
   await axios.delete("https://file-upload-api-lqoy.onrender.com/delete/:id",{
    data: {
    "id":url}
   }).then((data)=>{
      alert(data.data.message);
      window.location.reload()
    }).catch((err)=>{
      console.log(err)
    })
  }

  function filehandle (){
    return <img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIEAAACBCAMAAADQfiliAAAAkFBMVEX/////ySjouCb19fX/+/H/zUH0+f/+yzXw1Izotx/qxF3ntRXmswD46cn9+fHqvkD/xQD/xxj+/fj15Lz14rTqwlTpwEnz69jpvDjw4Lzz7N3/7sfzwCf93Y7/5KTz3qrtyW388NPy2Jj89ebuznnz2qHy7ub82oT/0E//5av/4Jf/67z/1GT+9Nz/2Hj/6LOUqZTYAAACmUlEQVR4nO3ab1faMBQGcJMpElNmglrxP6CudZvw/b/daKFdVTi5afI02zn3eeUb6e/chNwm5OiIw+FwOBwOh8P5n/K9kwSPnz7N8/M2+fxiaMCFztSHZLPFoIBlJj9HZUOW4fIrYJNsuCo873v+pgr5dCjBi95PyJ4GAkz3jkFdhIEEk0MCqZ6HEbweGAQp9WQYwfiw4JIF/4BgPPHNos/kPSyQOvOPXB5HFPSJ0tJ38CILqqbmuZhGF2zWc7++ChB4rqYIgZ6nFkjtUwSMwGcy7hWovmn+32cYll8FSl2d9cvVzqBkUA1Ufv2tb67zLSELEahZ7+dXmdUEHSLIbkYBgNFN9c6lzoMEt0E1uK0FZyECHSioPk+/hAlGIflRC5YhAvValKcBEVXqv8riro/gXlhrRZRsPqh89xWoOM/uINxl+CCIDagMzibVFQAAwpY+AgBACOOaCh3BPURg3+gCCEDYB7IAUwJhC7IAAxD2Z2qB+UUVIL6KtcC1jWsFoGkgThyAvwIQwDkN8AJnY2gEqEE4de7mwQL72wVoBRiAMI/JBe5XlJ0A9l10H+pgBXblBDQCDECYdXIB4WRtK0i2JLcCEMD5doIXuDpzK0ANAmUaQAXuN/VWgAEI4+zMaIEl/UpTCdJ1ZrCA0JkbAQYgjGu3hBcQDg+2goSdGSugdOadAANwb5ZaQbLNUitI2ZmhAlJn3gowAMJmqRGgBsFSLxWNUQBSZ64FkQ5QP4ewWQILLPkuzwNIQFyScQJiZ65SYASUzRK4BvRfXR8hAucxZifvBiEwPlfKSkARjNe1ukV8gaVPwzrryONgBbUntbkTJlodrDFFn3uu61V5EiXl6s37NtAu0+MoSXHNl8PhcDgcDofDiZM/o7ZNIceRWzAAAAAASUVORK5CYII='></img>
  }

  return (
    <div className='body'>
      <label className='upload-btn' isLoading={uploading}>
        <input id="imageInput" hidden type="file"  onChange={handleUpload} />
          UPLOAD File  
      </label>
      
      {error && <ErrorText>{error}</ErrorText>}
      {uploadError && <ErrorText>{uploadError}</ErrorText>}

      <div id='posts'>
        <b>All Files (Click to download) </b>
      </div>
     
      {fetchError && (
        <ErrorText textAlign="left">Failed to load images</ErrorText>
      )}
      {!fetchError && imageUrls?.length === 0 && (
        <div textAlign="left" fontSize="lg" color="gray.500">
          No images found
        </div>
      )}

      <div className='flex' >
        {imageUrls?.length > 0 &&
          imageUrls.map((url,index) => (<div className='block'>
            <img onClick={(url)=>nav(url)} src={url} onError={(event) => {
    event.target.src = "data:image/jpeg;base64,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";
  }} alt="File Image"  />
            <a href={url} >
            <div className='text'>{keys[index]}</div> </a>
            <button id='del'
             onClick={()=>deletecall(keys[index])}
             >delete</button>
            </div>
          ))}
      </div>
    </div>
  );
};
export default Posts;
