import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Box, Grid, Typography, Snackbar, Alert } from '@mui/material';
import {useFormik} from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function CreateBlog({setData}) {
  const [openWarn, setOpenWarn] = React.useState(false);
  const [openSuccess, setOpenSuccess] = React.useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      title: '',
      content: '',
    },
    onSubmit: async (values) => {
        const res = await axios({
            method: 'post',
            url: `${window.location.origin}/api/create/blog`,
            data: {
                title: values.title,
                content: values.content
            }
        });
        if(res.data.error){
            return;
        }
        navigate('/');
    },
  });


  return (
    
    <Box sx={{ flexGrow: 1, padding: 10 }}>
      <Snackbar open={openWarn} autoHideDuration={2000} onClose={() => setOpenWarn(false)} anchorOrigin={{ vertical: 'top', horizontal:'center' }}>
        <Alert severity="warning" sx={{ width: '100%' }}>
          Blog already exists!
        </Alert>
      </Snackbar>
      <Snackbar open={openSuccess} autoHideDuration={1000} onClose={() => setOpenSuccess(false)} anchorOrigin={{ vertical: 'top', horizontal:'center' }}>
        <Alert severity="success" sx={{ width: '100%' }}>
          Success Posting!
        </Alert>
      </Snackbar>
      <Grid container>
        <Grid item xs={10}>
            <Typography variant="h3" gutterBottom component="div">
              Post Blog
            </Typography>
        </Grid>
        <Grid item xs={2}>
            <Button sx={{marginTop: '20px'}} variant="outlined" onClick={() => navigate("/")}>
              Back
            </Button>
        </Grid>
      </Grid>
      <Grid container columns={{xs:4, md:12}} sx={{padding: 5}} spacing={2}>
        <form onSubmit={formik.handleSubmit}>
          <Grid item xs={12}>
            <TextField
                required
                autoFocus
                margin="dense"
                fullWidth
                id="title"
                name="title"
                label="Title"
                variant="standard"
                onChange={formik.handleChange}
            />
            <TextField
                required
                fullWidth
                margin="dense"
                variant="standard"
                id="content"
                name="content"
                label="Content"
                type="content"
                multiline={true}
                minRows={5}
                onChange={formik.handleChange}
            />
        </Grid>
        <Button sx={{marginRight: '20px'}} variant="outlined" onClick={() => navigate("/")}>Cancel</Button>
        <Button sx={{marginLeft: '20px'}} variant="outlined" type="submit">Post</Button>
        </form>
      </Grid>
    </Box>

  );
}