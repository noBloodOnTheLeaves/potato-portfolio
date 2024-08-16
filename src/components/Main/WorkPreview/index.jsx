import SpringCard from "@/common/SpringCard";
import React from 'react';

function Index() {
    const filesList = [
        {fileName: 'P1059381', alt: 'guys_on_tractor', label: 'Guys on tractor'},
        {fileName: 'P1059488', alt: 'herons', label: 'Herons'},
        {fileName: 'P1059504', alt: 'amanda ❤️', label: 'Amanda ❤️', instagram: 'https://www.instagram.com/ricercare_1'},
        {fileName: 'P1059663', alt: 'igor', label: 'Igor'},
        {fileName: 'P1059673', alt: 'wheat', label: 'Wheat'},
    ];
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
