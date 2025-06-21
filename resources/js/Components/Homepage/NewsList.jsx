const isNews = (news) => {
    return news.map((data, i) => {
        return (
            <div key={i} className="card w-full bg-slate-100 lg:w-96 shadow-sm">
                <figure>
                    <img
                        src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                        alt="Shoes" />
                </figure>
                <div className="card-body">
                    <h2 className="card-title text-black">
                        {data.title}
                        <div className="badge badge-secondary">NEW</div>
                    </h2>
                    <p className="text-black">{data.description}</p>
                    <div className="card-actions justify-end">
                        <div className="badge badge-inline">{data.category}</div>
                    </div>
                </div>
            </div>
        )
    })
}

const noNews = () => {
    return (
        <div className="text-stone-800">Saat ini tidak ada berita yang tersedia</div>
    )
}

const NewsList = ({ news }) => {
    return !news ? noNews() : isNews(news)
}

export default NewsList