import React, { useState, useEffect } from 'react';
import { Head } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import { Inertia } from '@inertiajs/inertia';

export default function EditNews(props) {

    const [title, setTitle] = useState(props.myNews.title || '');
    const [description, setDescription] = useState(props.myNews.description || '');
    const [category, setCategory] = useState(props.myNews.category || '');
    const [isNotif, setIsNotif] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = () => {
        const data = { id: props.myNews.id };
        if (title !== props.myNews.title && title.trim() !== '') data.title = title;
        if (description !== props.myNews.description && description.trim() !== '') data.description = description;
        if (category !== props.myNews.category && category.trim() !== '') data.category = category;

        if (Object.keys(data).length === 1) { // only id present, no changes
            setError('Tidak ada perubahan data untuk disimpan.');
            setIsNotif(false);
            return;
        }

        setError('');
        Inertia.post('/news/update', data, {
            onSuccess: () => {
                setIsNotif(true);
            }
        });
    };

    return (
        <div className='min-h-screen bg-slate-50'>
            <Head title={props.title} />
            <Navbar user={props.auth.user} />

            <div className="card bg-slate-100 shadow-xl max-w-6xl mx-auto w-full m-2">
                <div className='p-4 text-2xl'>EDIT BERITA</div>
                <div className="card-body">
                    {error && <div role="alert" className="alert alert-error mb-2"><span>{error}</span></div>}
                    {isNotif && !error && <div role="alert" className="alert alert-success mb-2"><span>Update berhasil disimpan!</span></div>}
                    <input type="text" placeholder="Judul" className="input input-bordered bg-slate-200 w-full m-2" onChange={(e) => setTitle(e.target.value)} value={title} />
                    <input type="text" placeholder="Deskripsi" className="input input-bordered bg-slate-200 w-full m-2" onChange={(e) => setDescription(e.target.value)} value={description} />
                    <input type="text" placeholder="Kategori" className="input input-bordered bg-slate-200 w-full m-2" onChange={(e) => setCategory(e.target.value)} value={category} />
                    <button className='btn btn-primary m-2' onClick={handleSubmit}>SUBMIT</button>
                </div>
            </div>
        </div>
    )
}
