"use client";
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import jsPDF from 'jspdf';
import { useTranslation } from 'next-i18next';

const Predict = () => {
    const [result, setResult] = useState();
    const [report, setReport] = useState();
    const router = useRouter();
    const { t } = useTranslation();
    const { i18n } = useTranslation();

    const currentLanguage = i18n.language;

    const handleSubmit = async (e) => {
        e.preventDefault();
        const fileInput = document.getElementById('crop-photo');
        const file = fileInput.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onloadend = async () => {
                const base64String = reader.result.split(",")[1];

                try {
                    const response = await axios.post('https://susya.onrender.com', {
                        image: base64String
                    }, {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });

                    setResult(response.data);
                    console.log(response.data)

                    const reportGeneration = await axios.post(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyAFG4260b1xJfLGZGnidb8ii2sW33DrCik`, {
                        contents: [
                            {
                                parts: [
                                    {
                                        text: `Generate a detailed report for the following plant disease: Disease: ${response.data.disease} Plant: ${response.data.plant} Recommended Treatment: ${response.data.remedy}. Provide detailed information on causes, prevention, and special care required.`
                                    },
                                    {
                                        text: `No annotation, just Simple Text in report`
                                    }
                                ]
                            }
                        ]
                    }, {
                        headers: {
                            "content-type": "application/json"
                        }
                    });
                    setReport(reportGeneration.data);



                } catch (error) {
                    console.error('Error:', error);
                }
            };

            reader.readAsDataURL(file);
        } else {
            console.error('No file selected');
        }
    };
    const downloadReport = () => {
        if (report && result) {
            const doc = new jsPDF();
            const pageWidth = 180;
            const lineSpacing = 10;

            doc.setFontSize(16);
            doc.text("Plant Disease Report", 10, 10);
            doc.setFontSize(12);
            doc.text(`Disease: ${result.disease}`, 10, 20);
            doc.text(`Plant: ${result.plant}`, 10, 30);

            const reportText = report.candidates[0].content.parts[0].text;
            const wrappedText = doc.splitTextToSize(reportText, pageWidth);

            let yPosition = 50;
            wrappedText.forEach(line => {
                if (yPosition + lineSpacing > doc.internal.pageSize.height - 20) {
                    doc.addPage();
                    yPosition = 10;
                }
                doc.text(line, 10, yPosition);
                yPosition += lineSpacing;
            });

            doc.save(`${result.disease}_Report.pdf`);
        }
    }



    return (
        <main className='bg-[#ebebe8] min-h-[100vh]'>
            <header>
                <Navbar />
            </header>
            {!result && (
                <section>
                    <div className='flex items-center justify-center'>
                        <div className='text-center my-20'>
                            <div className='text-[#073127]'>
                                <div className='text-[2rem] font-sans font-bold'>
                                    {t("harness_ai_power")}
                                </div>
                                <div className='my-4'>
                                    {t("upload_image")}
                                </div>
                            </div>
                            <div>
                                <form>
                                    <div>
                                        <input
                                            type="file"
                                            id="crop-photo"
                                            className="file-input file-input-bordered file-input-success w-full max-w-xs"
                                        />
                                    </div>
                                    <br />
                                    <button
                                        onClick={handleSubmit}
                                        type='submit'
                                        className='btn h-2 bg-[#004838] text-[#e2fb6c] hover:bg-[#004838] font-thin'
                                    >
                                        {t("predict")}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            )}
            {result && (
                <section>
                    <div className='flex items-center justify-center'>
                        <div className='text-center my-20 w-[70%] mx-[15%]'>
                            <div className='text-[#073127]'>
                                <div className='text-[2rem] font-sans font-bold'>
                                    {result.disease}
                                </div>
                                <div className='my-4'>
                                    {result.plant}
                                </div>
                            </div>
                            <div className='text-left'>
                                {result.remedy}
                            </div>
                            <br />
                            <div className='flex space-x-10 items-center justify-center'>
                                <button
                                    onClick={downloadReport}
                                    className='btn h-2 bg-[#004838] text-[#e2fb6c] hover:bg-[#004838] font-thin'
                                >
                                    <img
                                        width="24"
                                        height="24"
                                        src="https://img.icons8.com/material-sharp/24/e2fb6c/download--v1.png"
                                        alt="download"
                                    />
                                    {t("download_report")}
                                </button>
                                <button
                                    onClick={() => {
                                        setReport();
                                        setResult();
                                    }}
                                    className='btn h-2 bg-[#004838] text-[#e2fb6c] hover:bg-[#004838] font-thin'
                                >
                                    {t("predict_again")}
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            )}
            <Footer />
        </main>
    );
};

export default Predict;
// raam raam
