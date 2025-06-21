import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link, Head } from '@inertiajs/react';
import React, { useState, useEffect } from 'react';
import { Inertia } from '@inertiajs/inertia';

export default function Dashboard(props) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [isNotif, setIsNotif] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = () => {
        if (!title || !description || !category) {
            setError('Semua field wajib diisi!');
            setIsNotif(false);
            return;
        }
        setError('');
        const data = { title, description, category };
        Inertia.post('/news', data, {
            onSuccess: () => {
                setIsNotif(true);
                setTitle('');
                setDescription('');
                setCategory('');
            }
        });
    };

    useEffect(() => {
        if (!props.myNews) {
            Inertia.get("/news");
        }
    }, []);

    useEffect(() => {
        if (isNotif) {
            const timer = setTimeout(() => {
                setIsNotif(false);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [isNotif]);

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="p-6 text-black">
                        {error && (
                            <div role="alert" className="alert alert-error mb-2">
                                <span>{error}</span>
                            </div>
                        )}

                        {isNotif && !error && (
                            <div role="alert" className="alert alert-success">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>Berita berhasil ditambahkan!</span>
                            </div>
                        )}

                        <input type="text" placeholder="Judul" className="input input-bordered bg-slate-200 w-full m-2" onChange={(e) => setTitle(e.target.value)} value={title} />
                        <input type="text" placeholder="Deskripsi" className="input input-bordered bg-slate-200 w-full m-2" onChange={(e) => setDescription(e.target.value)} value={description} />
                        <input type="text" placeholder="Kategori" className="input input-bordered bg-slate-200 w-full m-2" onChange={(e) => setCategory(e.target.value)} value={category} />
                        <button className='btn btn-primary m-2' onClick={handleSubmit}>SUBMIT</button>
                    </div>
                </div>
                <div className='p-4'>
                    {props.myNews && props.myNews.length > 0 ? props.myNews.map((news, i) => {
                        return (
                            <div key={i} className="card bg-slate-100 shadow-xl max-w-6xl mx-auto w-full m-2">
                                <div className="card-body">
                                    <h2 className="card-title">
                                        {news.title}
                                        <div className="badge badge-secondary">NEW</div>
                                    </h2>
                                    <p>{news.description}</p>
                                    <div className="card-actions justify-end">
                                        <div className="badge badge-inline">{news.category}</div>
                                        <div className="badge badge-outline">
                                            <Link href={route('edit.news')} method='get' data={{ id: news.id }} as='button'>
                                                Edit
                                            </Link>
                                        </div>
                                        <div className="badge badge-outline">
                                            <Link href={route('delete.news')} method='post' data={{ id: news.id }} as='button'>
                                                Delete
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    }) : <p>anda belum memiliki berita</p>}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
