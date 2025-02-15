import React from 'react'
import { Box, Grid, TextField, FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material'
import { useForm, Controller } from 'react-hook-form'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'

const SubscribeForm = ({ initialData, onSubmit }) => {
  const { register, handleSubmit, control, formState: { errors } } = useForm({
    defaultValues: initialData || {
      customerIsActive: true
    }
  })

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          {/* Thông tin cơ bản */}
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Tên khách hàng"
              {...register('customerName', { required: 'Trường này là bắt buộc' })}
              error={!!errors.customerName}
              helperText={errors.customerName?.message}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              {...register('customerEmail', { 
                required: 'Trường này là bắt buộc',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Địa chỉ email không hợp lệ'
                }
              })}
              error={!!errors.customerEmail}
              helperText={errors.customerEmail?.message}
            />
          </Grid>

          {/* Thông tin địa chỉ */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Địa chỉ"
              {...register('customerAddress', { required: 'Trường này là bắt buộc' })}
              error={!!errors.customerAddress}
              helperText={errors.customerAddress?.message}
            />
          </Grid>

          {/* Thông tin cá nhân */}
          <Grid item xs={12} md={4}>
            <Controller
              name="customerDOB"
              control={control}
              rules={{ required: 'Trường này là bắt buộc' }}
              render={({ field }) => (
                <DatePicker
                  label="Ngày sinh"
                  value={field.value || null}
                  onChange={field.onChange}
                  renderInput={(params) => (
                    <TextField 
                      {...params} 
                      fullWidth 
                      error={!!errors.customerDOB}
                      helperText={errors.customerDOB?.message}
                    />
                  )}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel>Giới tính</InputLabel>
              <Select
                label="Giới tính"
                {...register('customerGender', { required: 'Trường này là bắt buộc' })}
                error={!!errors.customerGender}
              >
                <MenuItem value="Nam">Nam</MenuItem>
                <MenuItem value="Nữ">Nữ</MenuItem>
                <MenuItem value="Khác">Khác</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Số điện thoại"
              {...register('customerPhone', { 
                required: 'Trường này là bắt buộc',
                pattern: {
                  value: /^[0-9]{10,11}$/,
                  message: 'Số điện thoại không hợp lệ'
                }
              })}
              error={!!errors.customerPhone}
              helperText={errors.customerPhone?.message}
            />
          </Grid>

          {/* Thông tin tài khoản */}
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Mật khẩu"
              type="password"
              {...register('customerPassword', { 
                required: 'Trường này là bắt buộc',
                minLength: {
                  value: 8,
                  message: 'Mật khẩu phải có ít nhất 8 ký tự'
                }
              })}
              error={!!errors.customerPassword}
              helperText={errors.customerPassword?.message}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Trạng thái</InputLabel>
              <Select
                label="Trạng thái"
                {...register('customerIsActive')}
              >
                <MenuItem value={true}>Hoạt động</MenuItem>
                <MenuItem value={false}>Không hoạt động</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Thông tin bổ sung */}
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Số CMND/CCCD"
              {...register('customerIdentity', { required: 'Trường này là bắt buộc' })}
              error={!!errors.customerIdentity}
              helperText={errors.customerIdentity?.message}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Mô tả"
              {...register('customerDescription')}
              multiline
              rows={3}
            />
          </Grid>

          {/* Nút submit */}
          <Grid item xs={12}>
            <Button type="submit" variant="contained" size="large">
              Lưu thông tin
            </Button>
          </Grid>
        </Grid>
      </Box>
    </LocalizationProvider>
  )
}

export default SubscribeForm