import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import Grid from '@mui/material/Grid2'
import { useForm } from 'react-hook-form'
import {
  EMAIL_RULE_MESSAGE,
  PASSWORD_RULE_MESSAGE,
  FIELD_REQUIRED_MESSAGE,
  EMAIL_RULE,
  PASSWORD_RULE,
  DOB_RULE_MESSAGE,
  DOB_RULE
} from '~/utils/validators'

const CreateEmployee = () => {
  const { register, handleSubmit, formState: { errors } } = useForm()

  const onSubmit = (data) => {
    console.log(data)
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Create New Employee
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              label="Full Name"
              fullWidth
              {...register('employeeName', { required: FIELD_REQUIRED_MESSAGE })}
              error={!!errors.employeeName}
              helperText={errors.employeeName?.message}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              label="Email"
              type="email"
              fullWidth
              {...register('employeeEmail', { 
                required: FIELD_REQUIRED_MESSAGE,
                pattern: {
                  value: EMAIL_RULE,
                  message: EMAIL_RULE_MESSAGE
                }
              })}
              error={!!errors.employeeEmail}
              helperText={errors.employeeEmail?.message}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              label="Password"
              type="password"
              fullWidth
              {...register('employeePassword', { 
                required: FIELD_REQUIRED_MESSAGE,
                pattern: {
                  value: PASSWORD_RULE,
                  message: PASSWORD_RULE_MESSAGE
                }
              })}
              error={!!errors.employeePassword}
              helperText={errors.employeePassword?.message}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              label="Phone Number"
              fullWidth
              {...register('employeePhone', { required: FIELD_REQUIRED_MESSAGE })}
              error={!!errors.employeePhone}
              helperText={errors.employeePhone?.message}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              label=""
              type="date"
              fullWidth
              {...register('employeeDOB', {
                required: FIELD_REQUIRED_MESSAGE,
                pattern: {
                  value: DOB_RULE,
                  message: DOB_RULE_MESSAGE
                }
              })}
              error={!!errors.employeeDOB}
              helperText={errors.employeeDOB?.message}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              select
              label="Gender"
              fullWidth
              {...register('employeeGender', { required: FIELD_REQUIRED_MESSAGE })}
              error={!!errors.employeeGender}
              helperText={errors.employeeGender?.message}
            >
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </TextField>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              label="Address"
              fullWidth
              {...register('employeeAddress', { required: FIELD_REQUIRED_MESSAGE })}
              error={!!errors.employeeAddress}
              helperText={errors.employeeAddress?.message}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              select
              label="Role"
              fullWidth
              {...register('employeeRole', { required: FIELD_REQUIRED_MESSAGE })}
              error={!!errors.employeeRole}
              helperText={errors.employeeRole?.message}
            >
              <MenuItem value="Account Staff">Account Staff</MenuItem>
              <MenuItem value="Retail Staff">Retail Staff</MenuItem>
              <MenuItem value="Technical Staff">Technical Staff</MenuItem>
            </TextField>
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
              <Button
                type="submit"
                variant="contained"
                size="large"
              >
                Create Employee
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Box>
  )
}

export default CreateEmployee