'use client'
import { useState } from 'react';
import * as XLSX from 'xlsx';
import axios from 'axios';
import {ENV} from "../../utils/constansts"

const endpoint = ENV.API_URL;

const Page = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;

    const data = await file.arrayBuffer();
    const workbook = XLSX.read(data);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(sheet);

    for (const item of jsonData) {
      try {
        console.log('Enviando item:', item);

        const formData = new FormData();
        formData.append('files.cover', item.cover); // Cambia esto si el archivo es parte del Excel
        formData.append('files.screenshots', item.screenshots); // Igualmente para screenshots

        formData.append('data', JSON.stringify({
          title: item.title,
          marca: item.marca, 
          price: item.price,
          discount: item.discount,
          slug: item.slug,
          summary: item.summary,
          wholesalePrice: item.wholesalePrice,
          Popular: item.Popular,
          cantidad: item.cantidad,
          categoria : item.accept
        }));
        console.log(formData);
        

        await axios.post(`${endpoint}/productos`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        console.log('Datos enviados:', item);
      } catch (error) {
        console.error('Error al enviar datos:', error);
      }
    }
  };

  return (
    <div>
      <h1>Subir Datos desde Excel</h1>
      <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} />
      <button onClick={handleUpload}>Subir</button>
    </div>
  );
};

export default Page;
