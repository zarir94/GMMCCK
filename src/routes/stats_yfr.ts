import parsedData from "$lib/parsedData";


let totalStudent = [...new Set(parsedData.filter(s => s.year_final_result).map(s => s.roll))].length;
let passedStudent = [...new Set(parsedData.filter(s => Boolean(Number(s.year_final_result?.gpa))).map(s => s.roll))].length;
let failedStudent = [...new Set(parsedData.filter(s => s.year_final_result?.gpa?.toUpperCase().includes('F')).map(s => s.roll))].length;
let gpa1Student = [...new Set(parsedData.filter(s => s.year_final_result && Math.floor(Number(s.year_final_result.gpa)) === 1).map(s => s.roll))].length;
let gpa2Student = [...new Set(parsedData.filter(s => s.year_final_result && Math.floor(Number(s.year_final_result.gpa)) === 2).map(s => s.roll))].length;
let gpa3Student = [...new Set(parsedData.filter(s => s.year_final_result && Math.floor(Number(s.year_final_result.gpa)) === 3).map(s => s.roll))].length;
let gpa4Student = [...new Set(parsedData.filter(s => s.year_final_result && Math.floor(Number(s.year_final_result.gpa)) === 4).map(s => s.roll))].length;
let gpa5Student = [...new Set(parsedData.filter(s => s.year_final_result && Math.floor(Number(s.year_final_result.gpa)) === 5).map(s => s.roll))].length;


let totalScienceStudent = [...new Set(parsedData.filter(s => s.year_final_result && s.group == 'science').map(s => s.roll))].length;
let passedScienceStudent = [...new Set(parsedData.filter(s => Boolean(Number(s.year_final_result?.gpa)) && s.group == 'science').map(s => s.roll))].length;
let failedScienceStudent = [...new Set(parsedData.filter(s => s.year_final_result?.gpa?.toUpperCase().includes('F') && s.group == 'science').map(s => s.roll))].length;
let gpa1ScienceStudent = [...new Set(parsedData.filter(s => s.year_final_result && Math.floor(Number(s.year_final_result.gpa)) === 1 && s.group == 'science').map(s => s.roll))].length;
let gpa2ScienceStudent = [...new Set(parsedData.filter(s => s.year_final_result && Math.floor(Number(s.year_final_result.gpa)) === 2 && s.group == 'science').map(s => s.roll))].length;
let gpa3ScienceStudent = [...new Set(parsedData.filter(s => s.year_final_result && Math.floor(Number(s.year_final_result.gpa)) === 3 && s.group == 'science').map(s => s.roll))].length;
let gpa4ScienceStudent = [...new Set(parsedData.filter(s => s.year_final_result && Math.floor(Number(s.year_final_result.gpa)) === 4 && s.group == 'science').map(s => s.roll))].length;
let gpa5ScienceStudent = [...new Set(parsedData.filter(s => s.year_final_result && Math.floor(Number(s.year_final_result.gpa)) === 5 && s.group == 'science').map(s => s.roll))].length;


let totalHumanitiesStudent = [...new Set(parsedData.filter(s => s.year_final_result && s.group == 'humanities').map(s => s.roll))].length;
let passedHumanitiesStudent = [...new Set(parsedData.filter(s => Boolean(Number(s.year_final_result?.gpa)) && s.group == 'humanities').map(s => s.roll))].length;
let failedHumanitiesStudent = [...new Set(parsedData.filter(s => s.year_final_result?.gpa?.toUpperCase().includes('F') && s.group == 'humanities').map(s => s.roll))].length;
let gpa1HumanitiesStudent = [...new Set(parsedData.filter(s => s.year_final_result && Math.floor(Number(s.year_final_result.gpa)) === 1 && s.group == 'humanities').map(s => s.roll))].length;
let gpa2HumanitiesStudent = [...new Set(parsedData.filter(s => s.year_final_result && Math.floor(Number(s.year_final_result.gpa)) === 2 && s.group == 'humanities').map(s => s.roll))].length;
let gpa3HumanitiesStudent = [...new Set(parsedData.filter(s => s.year_final_result && Math.floor(Number(s.year_final_result.gpa)) === 3 && s.group == 'humanities').map(s => s.roll))].length;
let gpa4HumanitiesStudent = [...new Set(parsedData.filter(s => s.year_final_result && Math.floor(Number(s.year_final_result.gpa)) === 4 && s.group == 'humanities').map(s => s.roll))].length;
let gpa5HumanitiesStudent = [...new Set(parsedData.filter(s => s.year_final_result && Math.floor(Number(s.year_final_result.gpa)) === 5 && s.group == 'humanities').map(s => s.roll))].length;


let totalBusinessStudent = [...new Set(parsedData.filter(s => s.year_final_result && s.group == 'business_studies').map(s => s.roll))].length;
let passedBusinessStudent = [...new Set(parsedData.filter(s => Boolean(Number(s.year_final_result?.gpa)) && s.group == 'business_studies').map(s => s.roll))].length;
let failedBusinessStudent = [...new Set(parsedData.filter(s => s.year_final_result?.gpa?.toUpperCase().includes('F') && s.group == 'business_studies').map(s => s.roll))].length;
let gpa1BusinessStudent = [...new Set(parsedData.filter(s => s.year_final_result && Math.floor(Number(s.year_final_result.gpa)) === 1 && s.group == 'business_studies').map(s => s.roll))].length;
let gpa2BusinessStudent = [...new Set(parsedData.filter(s => s.year_final_result && Math.floor(Number(s.year_final_result.gpa)) === 2 && s.group == 'business_studies').map(s => s.roll))].length;
let gpa3BusinessStudent = [...new Set(parsedData.filter(s => s.year_final_result && Math.floor(Number(s.year_final_result.gpa)) === 3 && s.group == 'business_studies').map(s => s.roll))].length;
let gpa4BusinessStudent = [...new Set(parsedData.filter(s => s.year_final_result && Math.floor(Number(s.year_final_result.gpa)) === 4 && s.group == 'business_studies').map(s => s.roll))].length;
let gpa5BusinessStudent = [...new Set(parsedData.filter(s => s.year_final_result && Math.floor(Number(s.year_final_result.gpa)) === 5 && s.group == 'business_studies').map(s => s.roll))].length;

export default {
    totalStudent,
    passedStudent,
    failedStudent,
    gpa1Student,
    gpa2Student,
    gpa3Student,
    gpa4Student,
    gpa5Student,
    totalScienceStudent,
    passedScienceStudent,
    failedScienceStudent,
    gpa1ScienceStudent,
    gpa2ScienceStudent,
    gpa3ScienceStudent,
    gpa4ScienceStudent,
    gpa5ScienceStudent,
    totalHumanitiesStudent,
    passedHumanitiesStudent,
    failedHumanitiesStudent,
    gpa1HumanitiesStudent,
    gpa2HumanitiesStudent,
    gpa3HumanitiesStudent,
    gpa4HumanitiesStudent,
    gpa5HumanitiesStudent,
    totalBusinessStudent,
    passedBusinessStudent,
    failedBusinessStudent,
    gpa1BusinessStudent,
    gpa2BusinessStudent,
    gpa3BusinessStudent,
    gpa4BusinessStudent,
    gpa5BusinessStudent,
};
