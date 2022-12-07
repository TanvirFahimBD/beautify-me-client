import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom';

const Blog = ({ blog }) => {
    const { name, content, image, writerName, photo, published, time, topics, likes, comments, } = blog;
    return (
        <Grid item xs={12} md={6} >
            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    <div className='border rounded'>
                        <img src={image} className='border' alt="" width="100%" height={300} />
                        <div className='p-3'>
                            <div className='d-flex justify-content-center'>
                                <div className='d-flex align-items-center w-50'>
                                    <img src={photo} alt="" width={30} height={30} style={{ borderRadius: '50%' }} className='me-3' />
                                    <p className='mx-3 mt-4'>{writerName}</p>
                                </div>
                                <div className='d-flex align-items-center w-50'>
                                    <p className='mx-3 mt-4'>{published}</p>
                                    <p className='mt-4'>{time} Read</p>
                                </div>
                            </div>
                            <h2 className='text-start'>{name}</h2>
                            <p className='my-3 text-start'>{content.slice(0, 300)}. <Link to='/' className='text-decoration-none'>More...</Link></p>
                            <div className='d-flex'>{topics.map(topic => <Link className='me-3 my-3 border border-primary rounded p-2 text-decoration-none'>#{topic} </Link>)}</div>
                            <div className='d-flex align-items-center w-50'>
                                <p className='me-3'>{likes} Likes</p>
                                <p className='mx-3'>{comments} Comments</p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </Grid>
    );
};

export default Blog;

