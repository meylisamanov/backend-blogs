import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {Box, Divider, Grid, Paper, Typography, TextField, Button, 
        Card, CardActionArea, CardContent} from '@mui/material';
import {useFormik} from 'formik';

export default function BlogDetail(){
    const [data, setData] = useState();
    const navigate = useNavigate();

    let {id} = useParams();

    // Change the date format
    const changedData = ( arrayData ) => {
        arrayData.map((row) => {
            var d = new Date(row.date);
            row.date = d.toLocaleDateString() + ' ' + d.toLocaleTimeString();
        });
    }

    // Get all datas of one blog
    const getData = () => {
        axios.get(`${window.location.origin}/api/` + id)
            .then(res => {
                if(res.data){                    
                    changedData(res.data.comment);
                }
                setData(res.data);
            })
            .catch(error => {console.log(error)})
    }

    useEffect(() => {
        getData();
    }, []);

    const formik = useFormik({
        initialValues: {
          comment: ''
        },
        onSubmit: async (values) => {
            const res = await axios({
                method: 'post',
                url: `${window.location.origin}/api/` + id + '/create/comment',
                data: {
                    comment: values.comment
                }
            });
            if(res.data){                    
                changedData(res.data.comment);
            }
            setData(res.data);
            document.getElementById('comment').value = '';
        },
    });

    return(
        <Box sx={{ flexGrow: 1, padding: 10}}>
            <Grid container columns={{xs:4, md:12}} spacing={2}>
                <Grid item xs={10}>
                    <Typography variant="h4" gutterBottom component="div" sx={{ textAlign:"center", wordWrap: "break-word" }}>
                        {data?.title}
                    </Typography>
                </Grid>
                <Grid item xs={2}>
                    <Button sx={{marginTop: '20px'}} variant="outlined" onClick = {() => navigate("/")}>
                        Back
                    </Button>
                </Grid>
                <Grid item xs={10} sx={{padding: 1}}>
                    <Paper elevation={5} sx={{padding: 2}} >
                        <Typography variant="h6" gutterBottom component="div">
                            {data?.content}
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>
            <Grid item xs={10} >
                <Divider variant="middle" sx={{padding: 2}} />
            </Grid>
            <Typography variant="h5" gutterBottom sx={{padding: 2}}>
                        Comments
            </Typography>
            {data?.comment.map((row) => (
                <Grid item xs={10} sx={{padding: 1}} key={row.date} >
                  <Card>
                    <CardActionArea>
                      <CardContent>
                        <Typography multiline="true" variant="body1" color="text.secondary">
                          {row.body}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {row.date}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
            ))}
            <form onSubmit={formik.handleSubmit}>
                    <TextField
                        sx={{width: "85%"}}
                        required
                        autoFocus
                        fullWidth
                        margin="dense"
                        variant="standard"
                        id="comment"
                        name="comment"
                        label="Type in your comment!"
                        multiline={true}
                        minRows={5}
                        value={formik.values.password}
                        onChange={formik.handleChange}
                    />
                    <br />
                    <Button type="submit" sx={{marginTop: '20px'}} variant="outlined">Add</Button>
            </form>
        </Box>
    );
}