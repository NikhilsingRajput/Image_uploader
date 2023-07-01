
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

    if (!validFileTypes.find(type => type === file.type)) {
      setError('File must be in JPG/PNG format');
      return;
    }

    const form = new FormData();
    form.append('image', file);

    await uploadImage(form);
    setTimeout(() => {
      setRefetch(s => s + 1);
    }, 1000);
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

  return (
    <div className='body'>
      <label className='upload-btn' isLoading={uploading}>
        <input id="imageInput" hidden type="file"  onChange={handleUpload} />
          UPLOAD IMAGE  
      </label>
      
      {error && <ErrorText>{error}</ErrorText>}
      {uploadError && <ErrorText>{uploadError}</ErrorText>}

      <div id='posts'>
        <b>All Images </b>
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
            <a href={url} target='blank'>
            <img onClick={(url)=>nav(url)} src={url} alt="Image" key={keys[index]} /> </a>
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
