import { useEffect, useState } from 'react';
import axiosClient from '../config/axios';

const useQuery = (url, refetch) => {
  const [state, setState] = useState({
    data: null,
    key: null,
    isLoading: true,
    error: '',
  });
console.log(state.data)
  useEffect(() => {
    const fetch = async () => {
      axiosClient
        .get('https://file-upload-api-lqoy.onrender.com/list')
        .then(({ data }) =>{
        var keys=data.imageKeys;
        var url =data.presignedUrls 
        setState({ data:url, key:keys, isLoading: false, error: '' })})
        .catch(error =>
          setState({ data: null, isLoading: false, error: error.message })
        );
    };

    fetch();
  }, [url, refetch]);

  // useEffect(() => {
  //   const fetch = async () => {
  //     axiosClient
  //       .get('http://localhost:5000/listofkey')
  //       .then(({ data }) =>{
  //       // console.log(data)
  //       setkey(data)})
        
  //   };

  //   fetch();
  // }, [url, refetch]);

  return state;
};

export default useQuery;
