import {useState,useEffect,useCallback} from 'react';
import Error from '../Components/Error';
async function sendHttpReq(url,config){
    const res =  await fetch(url,config);
    const resData = await res.json();
    if (!res.ok) {
        // throw new Error(resData.message || 'Something went wrong, failed to send request.' );
        throw new Error('Something went wrong'+resData.message)
      }
    
    return resData
}
export  function  useHttp(url,config,initialData){
    const [data,setData] = useState();
    const [loading,setLoading] = useState();
    const [error,setError] = useState();

    function clearData(){
        setData(initialData);
    }

    const sendRequest = useCallback(
        async function sendRequest(data){
            setLoading(true);
            try{
                const resData = await sendHttpReq(url,{...config,body:data})
                setData(resData);
            }catch(e){
                setError(e.message || 'Something is very wrong fetchHttp catch')
            }
            setLoading(false);
        },
        [url,config]
    )

    useEffect(()=>{
        if((config&(config.method === 'GET' || !config.method))|| !config){
            sendRequest();
        }
    },[sendRequest,config])

    return {
        data,
        loading,
        error,
        sendRequest,
        clearData
    }
}