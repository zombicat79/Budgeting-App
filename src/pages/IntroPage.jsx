import { useState } from 'react';

import Button from "../ui/Button";

function IntroPage({ onStart}) {
    const [content, setContent] = useState('initial');
    const [layerInfoState, setLayerInfoState] = useState([false, false, false])

    const initialContent = <p className="my-[2rem] max-w-sm sm:max-w-xl mx-auto">An app that enables users to monitor their finances by organizing them into distinct money tracking projects, with detailed control over how money is allocated and spent within each project.</p>
    const layer1 = 
        <>
            <p>Users can create <b>unlimited money tracking projects</b>, each defined by:</p>
            <ul className="list-disc">
                <li className="w-fit mx-auto">An initial amount of money</li>
                <li className="w-fit mx-auto">A fixed duration</li>
                <li className="w-fit mx-auto">A unique status: projects can be explicitly terminated by the user or automatically closed once their time period ends</li>
            </ul>
            <p>Only <b>one project can be active at a time</b>. Projects can be <b>created and deleted</b>, but not updated.</p>
        </>
    const layer2 = 
    <>
        <p>Within each project, users can create <b>unlimited budgets</b>.  </p>
        <ul className="list-disc">
            <li className="w-fit mx-auto">Budgets are allocated a portion of the project’s total funds</li>
            <li className="w-fit mx-auto">They serve as containers for income and expense entries</li>
            <li className="w-fit mx-auto">Budgets can be <b>created, updated, and deleted</b></li>
        </ul>
    </>
    const layer3 = 
    <>
        <p>Budgets consist of <b>unlimited entries</b>, which represent specific <b>income or expense records</b></p>
        <ul className="list-disc">
            <li className="w-fit mx-auto">Entries can be <b>created, updated, and deleted</b></li>
        </ul>
    </>
    
    const instructions = 
        <div className="flex flex-col gap-[3rem] my-[2rem] max-w-sm sm:max-w-xl mx-auto">
            <div className="flex flex-col gap-[.5rem]">
                <p>The application is built around three main layers:</p>
                <h3 className="w-fit mx-auto uppercase hover:underline hover:cursor-pointer" onClick={() => handleLayerInfo(0)}>1. Projects Layer</h3>
                {layerInfoState[0] && layer1}
                <h3 className="w-fit mx-auto uppercase hover:underline hover:cursor-pointer" onClick={() => handleLayerInfo(1)}>2. Budgets Layer</h3>
                {layerInfoState[1] && layer2}
                <h3 className="w-fit mx-auto uppercase hover:underline hover:cursor-pointer" onClick={() => handleLayerInfo(2)}>3. Entries Layer</h3>
                {layerInfoState[2] && layer3}
            </div>
            <div className="flex flex-col gap-[1rem]">
                <h3 className="uppercase"><b>--- Activity Log ---</b></h3>
                <p>📄 A comprehensive log allows users to <b>review all financial movements</b> within any project—active or terminated—providing a full history of income, expenses, and changes made throughout the app.</p>
                <h3 className="uppercase"><b>--- Demo Limitation ---</b></h3>
                <p>
                    ⚠️ Please note that this is a <b>demo version</b> of the application. 
                    <b>No data is persisted beyond the current browser session.</b> 
                    All money tracking efforts will be <b>lost once the browser is closed or refreshed</b>.</p>
            </div>
        </div>;

    function handleContent() {
        if (content === 'initial') setContent('instructions');
        if (content === 'instructions') setContent('initial');
    }

    function handleLayerInfo(i) {
        console.log(i)
        const newLayerInfo = [...layerInfoState].map((el, index) => {
            if (index === i) {
                return !el;
            } else {
                return el;
            }
        })
        setLayerInfoState(newLayerInfo);
    }

    return (
        <section className="min-h-screen flex flex-col justify-center bg-cyan-700 titillium-web-regular text-white text-xl sm:text-2xl">
            <article className="z-10 px-[1.5rem] py-[3rem]">
                <h1 className="uppercase text-6xl sm:text-8xl font-bold italic">Money Tracker</h1>
                <h2 className="text-2xl sm:text-4xl">
                {content === 'initial'
                    ? 'Demo App Overview'
                    : 'App Structure'
                }
                </h2>
                {content === 'initial'
                    ? initialContent
                    : instructions
                }
                <div className="flex flex-col gap-[1rem] max-w-3xs mx-auto">
                    <div onClick={handleContent}>
                        <Button type="alert">
                            {content === 'initial' ? '+ More' : '- Less'} Details
                        </Button>
                    </div>
                    <div onClick={onStart}>
                        <Button type="uppercased">Start demo</Button>
                    </div>
                </div>
            </article>
            <img 
                className="w-md sm:w-xl md:w-2xl px-[1.5rem] absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] opacity-35 z-1" 
                src="./piglet.png" 
                alt="Piglet logo" 
            />
        </section>
    )
}

export default IntroPage;