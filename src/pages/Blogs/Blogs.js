import { Grid } from '@mui/material';
import React from 'react';
import { useQuery } from 'react-query';
import Loading from '../shared/Loading/Loading';
import Blog from './Blog/Blog';
import './Blogs.css';

const Blogs = () => {
    const { data: blogs, isLoading } = useQuery('blogs', () => fetch('blogs.json')
        .then(res => res.json())
    )

    if (isLoading) {
        return <Loading />
    }

    return (
        <div>
            <div className="bg" style={{ height: '400px', width: '100%' }}></div>
            <div>
                <h1 className='mt-5'>Blogs</h1>
                <Grid container spacing={2} className='my-1 p-5'>{blogs.map(blog => <Blog key={blog._id} blog={blog} />)}</Grid>
            </div>
        </div>
    );
};

export default Blogs;