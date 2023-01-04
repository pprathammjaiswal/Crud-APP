import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import catPath from '../apiPath';


export default function Addcategory()
{
    const [cat, setCat] = useState('');
    const [err, setErr] = useState('');

    const navigate = useNavigate();

    const add = (ev) =>
    {
        ev.preventDefault();
        // console.log('test')

        if (cat == '')
        {
            setErr('Please Mention add Category Required')
        }
        else
        {
            fetch('http://localhost:9003/categories/' + 'add-category', {
                method: "POST",
                headers: new Headers({ 'content-type': 'application/json' }),
                body: JSON.stringify(
                    {
                        name: cat
                    }
                )
            })
                .then(res => res.json())
                .then(result =>
                {
                    console.log(result)
                    setErr('Category Added ');
                    navigate('/show-category');
                })
        }
    }

    var getCatValue = (ev) =>
    {
        setCat(ev.target.value);
    }

    return (
        <div className='container'>
            <h1>Addcategory</h1>
            <form onSubmit={ add }>
                <input type="text" onChange={ getCatValue } className='form-control' />
                <br />
                <button className='btn btn-dark'>Add Category </button>

                <p>{ err }</p>
            </form>
        </div>
    )
}
