import SpringCard from "@/common/SpringCard";
import React from 'react';
import photos from '../../../../data/photos.json'

function Index() {
    const filesList = photos.albumPreview;

    return (
        <div className="container">
            <div className="grid lg:grid-cols-2 grid-cols-1 place-items-center gap-20">
                {
                    filesList.map((e) => {
                        return <SpringCard key={e.fileName} {...e}/>
                    })
                }
            </div>
        </div>
    );
}

export default Index;
