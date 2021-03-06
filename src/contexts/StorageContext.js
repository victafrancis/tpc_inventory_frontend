import target from 'api/api.target';
import Axios from 'axios';
import React from 'react'
import { useSpinner } from "./SpinnerContext"

const StorageContext = React.createContext();

export const useStorage = () => {
    return React.useContext(StorageContext)
}

export const StorageProvider = (props) => {
    const [storage, setStorage] = React.useState([])
    const [page, setPage] = React.useState(0)
    const [rowsPerPage, setRowsPerPage] = React.useState(10)
    const [select, setSelect] = React.useState('----');
    const { setIsLoading } = useSpinner()
    const getStorage = async(id) => {
        let data = null;
        try{
            let res = await Axios.get(`${target}/storages/${id}`);
            data = res.data;
        }catch(err){
            console.log(err)
        }
        return data;
    }

    const getStorages = () => {
        setIsLoading(true)
        Axios.get(`${target}/storages`)
            .then(res=>{
                setTimeout(()=>{
                    setStorage(res.data)
                    setIsLoading(false)
                }, 100)
            })
            .catch(err=>{
                setTimeout(()=>{
                    console.log(err)
                    setIsLoading(false)
                }, 100)
            })
    }

    const getProductsInStorage = async(id) => {
        let data = null;
        try{
            let res = await Axios.get(`${target}/storages/productsInStorage/${id}`);
            data = res.data;
        }catch(err){
            console.log(err)
        }
        return data;
    }    
    
    React.useEffect(() => {
        getStorages()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <StorageContext.Provider 
            value={{ 
                storage, 
                getStorage, 
                getStorages, 
                getProductsInStorage,
                rowsPerPage,
                setRowsPerPage,
                page,
                setPage,
                select,
                setSelect
                }}>
            {props.children}
        </StorageContext.Provider>
    )
}