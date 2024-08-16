'use client'
import {LineChart} from "@mui/x-charts";

export default function Statistics() {
    return (<div className={"mb-12 mt-24"}>
        <h1 className="text-5xl font-bold text-blue-800 mb-10 mt-5 text-center">Statistics</h1>
        <div className="flex flex-col lg:flex-row justify-center items-center text-center p-4 ">
            <div
                className="bg-gray-800 p-10 rounded-2xl flex flex-col  justify-center items-center lg:mr-16 text-center drop-shadow-2xl mb-8 lg:mb-0">
                <div className="bg-gray-800 px-2 py-2 border-blue-700 border-2 rounded mb-5 "
                     style={{fontSize: "1em", color: "white"}}>
                    Tailored Analytics
                </div>
                <div className="text-xl text-white w-full lg:w-96">
                    Maximize Your Learning Efficiency. Flashly&apos;s intelligent analytics offer customized insights
                    that help you uncover your strengths, target areas for growth, and fine-tune your path to
                    success.
                </div>
            </div>
            <div className="w-full lg:w-auto overflow-x-auto">
                <LineChart
                    xAxis={[{
                        data: [0, 1, 2, 4, 6, 8, 10, 12, 14, 16, 18], label: 'Days'
                    }]}
                    series={[{
                        data: [2, 4, 3, 4, 9, 12, 11, 14, 12, 15, 20],
                        label: 'Progress',
                        showMark: ({index}) => index % 2 === 0,
                    }]}
                    width={500}
                    height={300}
                />
            </div>
        </div>
    </div>);
}
