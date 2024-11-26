import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import CommonForm from '../common/form'
import { addressFormControls } from '@/config'
import { useDispatch, useSelector } from 'react-redux'
import { addNewAddress, deleteAddress, editaAddress, fetchAllAddresses } from '@/store/address-slice'
import { useToast } from '@/hooks/use-toast'
import AddressCard from './AddressCard'
import { Button } from '../ui/button'


const initialAddressFormData = {
    address : '',
    city : '',
    phone : '',
    pincode : '',
    notes : ''

}
export default function UserAddressDiv() {
    const {toast} = useToast()
    const dispatch = useDispatch()
    const {user} = useSelector(state => state.auth)
    const [currentSelectedAddress,setCurrentSelectedAddress] = useState(null)
    const {addressList} = useSelector(state => state.shopAddress)
    // console.log(addressList)
    const [currentEditedId,setCurrentEditedId] = useState(null)

    const [formData , setFormData] = useState(initialAddressFormData)


    function handleManageAddress (e){
        e.preventDefault();
        currentEditedId  !== null ? dispatch(editaAddress({userId : user?.id , addressId : currentEditedId ,formData})) .then((data) =>{
            dispatch(fetchAllAddresses(user?.id))
            setCurrentEditedId(null)
            setFormData(initialAddressFormData)
        }) :
        dispatch(addNewAddress({
            userId : user.id ,
            ...formData
        })).then(data => {
            console.log(data.payload.success
            )
            if(data.payload.success
            ){
                dispatch(fetchAllAddresses(user?.id))
                setFormData(initialAddressFormData)
                toast({
                    title : 'Address Added Successfully',
                })
            }else {
                toast({
                    title : 'Failed to Add Address',
                })
            }
        })
        // console.log(formData);
    }
    function isFormValid () {
        return Object.keys(formData)
        .map(key => formData[key].trim() !== '').every(item=>item); 
    }
    useEffect(()=>{
        dispatch(fetchAllAddresses(user?.id))
    },[dispatch])

    function handleDeleteAddress(getCurrentAddress) {
        dispatch(
          deleteAddress({ userId: user?.id, addressId: getCurrentAddress._id })
        ).then((data) => {
          if (data?.payload?.success) {
            dispatch(fetchAllAddresses(user?.id));
            toast({
              title: "Address deleted successfully",
            });
          }else{
            toast({
                title: "server size error",
              });
          }
        });
      }


      function handleEditAddress(getCuurentAddress) {
        setCurrentEditedId(getCuurentAddress?._id);
        setFormData({
          ...formData,
          address: getCuurentAddress?.address,
          city: getCuurentAddress?.city,
          phone: getCuurentAddress?.phone,
          pincode: getCuurentAddress?.pincode,
          notes: getCuurentAddress?.notes,
        });
      }

  return (
    <Card>
        <div className='mb-5 p-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2' >
            {
                addressList && addressList.length > 0 ? 
                addressList.map(add =>  <AddressCard 
                    handleEditAddress ={handleEditAddress}
                                            handleDeleteAddress={handleDeleteAddress} 
                                            key={add._id}
                                            addressInfo={add} /> ) : null
            }

        </div>
        <CardHeader className="flex flex-row gap-3 items-center " >
            <CardTitle className="" >
                {
                    currentEditedId !== null ? 'Edit Address' : 'Add New Address'
                }
            </CardTitle>
        </CardHeader>
        <CardContent>
            <CommonForm formData={formData} setFormData={setFormData} formControls={addressFormControls} 
            buttonText={currentEditedId == null ? 'Add' : 'Update'} 
            onSubmit={handleManageAddress} isBtnDisabled={!isFormValid()} />
            <Button onClick={()=>setCurrentEditedId(null)} className={currentEditedId == null ? 'hidden' : 'mt-2 w-full bg-red-500 hover:bg-black'} >Cancel</Button>
        </CardContent>
    </Card>
  )
}
