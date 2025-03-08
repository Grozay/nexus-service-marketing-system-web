// import { useState, useEffect } from 'react'
// import {
//   TextField,
//   Button,
//   Box,
//   Typography,
//   Card as MuiCard,
//   CardActions,
//   Autocomplete
// } from '@mui/material'
// import { useForm, Controller } from 'react-hook-form'
// import { FIELD_REQUIRED_MESSAGE } from '~/utils/validators'
// import { getAllAccountsAPI } from '~/apis'
// import { toast } from 'react-toastify'
// import Grid from '@mui/material/Grid2'

// const CreateAccount = ({ onNext, setAccountData }) => {
//   const [accountList, setAccountList] = useState([])

//   // Khởi tạo useForm với giá trị mặc định
//   const { control, handleSubmit, formState: { errors } } = useForm({
//     defaultValues: {
//       accountId: ''
//     }
//   })

//   const handleCreateAccount = (data) => {
//     // Kiểm tra nếu không có accountId được chọn
//     if (!data.accountId) {
//       toast.error('Please select an account')
//       return
//     }

//     const selectedAccount = accountList.find(acc => acc.accountId === data.accountId)
//     if (!selectedAccount) {
//       toast.error('Selected account not found')
//       return
//     }

//     setAccountData(selectedAccount)
//     onNext()
//   }

//   useEffect(() => {
//     getAllAccountsAPI()
//       .then(data => {
//         setAccountList(data)
//       })
//       .catch(() => toast.error('Error fetching account list'))
//   }, [])

//   return (
//     <form onSubmit={handleSubmit(handleCreateAccount)}>
//       <CardActions sx={{ padding: '0 1em 1em 1em' }}>
//         <Button
//           type="submit"
//           variant="contained"
//           color="primary"
//           size="large"
//           fullWidth
//         >
//           Next
//         </Button>
//       </CardActions>
//     </form>
//   )
// }

// export default CreateAccount