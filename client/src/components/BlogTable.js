import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea, Box, Grid, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

export default function BlogTable({rows, setData}) {
  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1, padding: 10 }}>
      <Grid container columns={{xs:4, md:12}} spacing={2}>
        {/* -------------Header------------- */}
        <Grid item xs={10}>
          <Typography variant="h3" gutterBottom component="div">
            BlogS
          </Typography>
        </Grid>
        <Grid item xs={2}>
          {/* <CreateBlog setData = {setData} /> */}
          <Button sx={{marginTop: '20px'}} variant="outlined" onClick = {() => navigate("/editor")}>
            Post a Blog
          </Button>
        </Grid>
        {/* -----------------/Header---------------- */}
        {rows?.map((row) => (         
          <Grid item xs={4} key={row._id} >
            <Link to={`/${row._id}`} style={{ textDecoration: 'none' }}  >
              <Card style={{height: "6em"}}>
                <CardActionArea>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div" style={{textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden'}}>
                      {row.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" style={{textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden'}}>
                      {row.content}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}