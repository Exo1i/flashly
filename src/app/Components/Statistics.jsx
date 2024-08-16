'use client'
import {LineChart} from "@mui/x-charts";
import {Button} from "@mui/material";

export default function Statistics() {
    return (<>
        <h1 className={"text-5xl font-bold text-blue-800 mb-10 text-center"}>Statistics</h1>
        <div className="flex flex-col lg:flex-row justify-center items-center text-center  p-4 mb-10">
            <div
                className="bg-gray-800 p-10 rounded-2xl flex flex-row lg:flex-col justify-center items-center text-center drop-shadow-2xl">

                <div className={"bg-gray-800 px-2 py-2 border-blue-700 border-2 rounded mb-5"}
                     style={{fontSize: "1em", color: "white"}}>Tailored Analytics
                </div>

                <div
                    className="text-xl text-white w-full lg:w-96">
                    Maximize Your Learning Efficiency
                    Flashly's intelligent analytics offer customized insights that help you uncover your strengths,
                    target
                    areas for growth, and fine-tune your path to success.
                </div>
            </div>
            <span>

            <LineChart
                xAxis={[{data: [0, 1, 2, 4, 6, 8, 10, 12, 14, 16, 18]}]}
                series={[{
                    data: [2, 4, 3, 4, 9, 12, 11, 14, 12, 15, 20], showMark: ({index}) => index % 2 === 0,
                },]}
                width={500}
                height={300}
            /></span>
        </div>
    </>);
}
