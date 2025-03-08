import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { createPlanAPI, getCategoryPlanAPI } from '~/apis'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid2'
import MenuItem from '@mui/material/MenuItem'
import Paper from '@mui/material/Paper'
import { FIELD_REQUIRED_MESSAGE } from '~/utils/validators'

const CreatePlan = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue
  } = useForm({
    defaultValues: {
      planId: '',
      categoryId: '',
      planName: '',
      planDetails: '',
      planType: '',
      planPrice: '',
      planValidity: '',
      planDescription: '',
      slug: ''
    }
  })

  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [planList, setPlanList] = useState([])

  // Theo dõi planName để tạo slug tự động và planType để cập nhật planDetails
  const planName = watch('planName')
  const planType = watch('planType')

  useEffect(() => {
    if (planName) {
      const generatedSlug = planName
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-') // Thay thế ký tự không phải chữ cái hoặc số bằng dấu gạch ngang
        .replace(/(^-|-$)/g, '') // Xóa dấu gạch ngang ở đầu hoặc cuối
      setValue('slug', generatedSlug, { shouldValidate: true })
    }
  }, [planName, setValue])

  useEffect(() => {
    const fetchPlanList = async () => {
      try {
        const response = await getCategoryPlanAPI()
        setPlanList(response)
      } catch {
        toast.error('Failed to load service plans')
      }
    }
    fetchPlanList()
  }, [])

  // Định nghĩa các tùy chọn cho planDetails dựa trên planType
  const planDetailsOptions = {
    Hourly: ['10 Hours', '20 Hours', '30 Hours', '60 Hours'],
    Unlimited: ['Unlimited Data', 'Unlimited Calls', 'Unlimited Messaging'],
    Local: ['Local Calls Only', 'Local Calls + Data'],
    STD: ['STD Calls Only', 'STD Calls + Data']
  }

  const onCreatePlan = async (data) => {
    try {
      setLoading(true)
      const planData = {
        planId: data.planId.trim(),
        categoryId: data.categoryId.trim(),
        planName: data.planName.trim(),
        planDetails: data.planDetails,
        planType: data.planType,
        planPrice: Number(data.planPrice),
        planValidity: data.planValidity.trim(),
        planDescription: data.planDescription.trim(),
        slug: data.slug.trim(),
        planIsActive: true // Thêm mặc định dựa trên JSON mẫu
      }

      await toast.promise(
        createPlanAPI(planData),
        {
          pending: 'Creating plan...',
          success: {
            render() {
              navigate('/management/connection-plans/list')
              return 'Plan created successfully'
            }
          },
          error: {
            render({ data: error }) {
              return error?.message || 'Failed to create plan'
            }
          }
        }
      )
    } catch (error) {
      throw Error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Typography
          variant='h5'
          component='h1'
          sx={{ mb: 4, fontWeight: 'bold', textAlign: 'center' }}
        >
          Create New Plan
        </Typography>

        <form onSubmit={handleSubmit(onCreatePlan)}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                variant='outlined'
                label='Plan ID'
                disabled={loading}
                {...register('planId', { required: FIELD_REQUIRED_MESSAGE })}
                error={!!errors.planId}
                helperText={errors.planId?.message}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                label='Service Plan Category'
                fullWidth
                select
                variant='outlined'
                disabled={loading}
                {...register('categoryId', { required: FIELD_REQUIRED_MESSAGE })}
                error={!!errors.categoryId}
                helperText={errors.categoryId?.message}
              >
                {planList.map((option) => (
                  <MenuItem key={option?.categoryId} value={option?.categoryId}>
                    {option?.categoryName}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                variant='outlined'
                label='Plan Name'
                disabled={loading}
                {...register('planName', { required: FIELD_REQUIRED_MESSAGE })}
                error={!!errors.planName}
                helperText={errors.planName?.message}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                variant='outlined'
                label='Plan Type'
                select
                disabled={loading}
                {...register('planType', { required: FIELD_REQUIRED_MESSAGE })}
                error={!!errors.planType}
                helperText={errors.planType?.message}
              >
                <MenuItem value='Hourly'>Hourly</MenuItem>
                <MenuItem value='Unlimited'>Unlimited</MenuItem>
                <MenuItem value='Local'>Local</MenuItem>
                <MenuItem value='STD'>STD</MenuItem>
              </TextField>
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                variant='outlined'
                label='Plan Details'
                select
                disabled={loading || !planType}
                {...register('planDetails', { required: FIELD_REQUIRED_MESSAGE })}
                error={!!errors.planDetails}
                helperText={errors.planDetails?.message || 'Select a Plan Type first'}
              >
                {(planDetailsOptions[planType] || []).map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                variant='outlined'
                label='Plan Price'
                type='number'
                disabled={loading}
                {...register('planPrice', { required: FIELD_REQUIRED_MESSAGE })}
                error={!!errors.planPrice}
                helperText={errors.planPrice?.message}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                variant='outlined'
                label='Plan Validity'
                select
                disabled={loading}
                {...register('planValidity', { required: FIELD_REQUIRED_MESSAGE })}
                error={!!errors.planValidity}
                helperText={errors.planValidity?.message}
              >
                {[...Array(12).keys()].map((month) => (
                  <MenuItem key={month + 1} value={`${month + 1} Month${month + 1 > 1 ? 's' : ''}`}>
                    {month + 1} Month{month + 1 > 1 ? 's' : ''}
                  </MenuItem>
                ))}
                <MenuItem value="1 Year">1 Year</MenuItem>
              </TextField>
            </Grid>

            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                variant='outlined'
                label='Plan Description'
                multiline
                rows={2}
                disabled={loading}
                {...register('planDescription', { required: FIELD_REQUIRED_MESSAGE })}
                error={!!errors.planDescription}
                helperText={errors.planDescription?.message}
              />
            </Grid>

            <Grid size={{ xs: 12 }} sx={{ textAlign: 'center', mt: 3 }}>
              <Button
                type='submit'
                variant='contained'
                size='large'
                disabled={loading}
                sx={{
                  px: 5,
                  py: 1.5,
                  bgcolor: 'primary.main',
                  '&:hover': { bgcolor: 'primary.dark' },
                  borderRadius: 2
                }}
              >
                {loading ? 'Creating...' : 'Create Plan'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  )
}

export default CreatePlan