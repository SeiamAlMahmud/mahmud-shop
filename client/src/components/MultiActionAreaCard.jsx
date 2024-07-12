import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { NavLink } from 'react-router-dom';

export default function MultiActionAreaCard({ productsList, productHandle }) {
    const { name, _id, seller, img, category, price } = productsList
    return (
        <>
            <Card sx={{ maxWidth: 345 }}>
                <CardActionArea>
                    <NavLink to={`/product/${_id}`}>
                        <CardMedia
                            component="img"
                            height="140"
                            image={img}
                            alt="green iguana"
                        /></NavLink>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            <NavLink to={`/product/${_id}`}><span className='py-10'>{name}</span></NavLink>
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            <div className='flex-col flex text-xl'>
                                <span>Seller: {seller}</span>
                                <span>Category: {category}</span>
                                <span>Price:$ {price}</span>
                            </div>
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <button className='inline-flex py-4 px-12 border bg-teal-400 hover:bg-teal-600 hover:scale-105 ease-in-out duration-50 rounded' onClick={() => productHandle(productsList)}>Add to Cart</button>
                </CardActions>
            </Card>
        </>
    );
}