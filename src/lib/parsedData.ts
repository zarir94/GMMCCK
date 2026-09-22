import data from "./data.json";

export interface Student {
	id: string;
	roll: string;
	rocket_payment_date: string;
	class: "Eleven";
	session: string;
	date: string;
	name_bangla: string;
	name_english: string;
	father_name_bangla: string;
	father_name_english: string;
	mother_name_bangla: string;
	mother_name_english: string;
	mobile_number_student: null | string;
	mobile_number_guardian: null | string;
	date_of_birth: null | string;
	religion: Religion;
	blood_group: BloodGroup;
	online_birth_reg_no: null | string;
	guardian_name: null | string;
	guardian_profession: null | string;
	guardian_work_station: null | string;
	guardian_monthly_income: null | string;
	permanent_village: null | string;
	permanent_ward: null | string;
	permanent_post: null | string;
	permanent_thana: null | string;
	permanent_district: null | string;
	present_local_guardian_name: null | string;
	present_local_guardian_relation: null | string;
	present_village: null | string;
	present_ward: null | string;
	present_post: null | string;
	present_thana: null | string;
	present_district: string | null;
	jsc_board?: ScBoard;
	jsc_passing_year?: string;
	jsc_roll?: null | string;
	jsc_regno?: null | string;
	jsc_session?: string;
	jsc_gpa?: null | string;
	jsc_institution?: null | string;
	ssc_board: ScBoard;
	ssc_passing_year: string;
	ssc_roll: null | string;
	ssc_regno: null | string;
	ssc_session: string;
	ssc_gpa: null | string;
	board_scholarship: BoardScholarship;
	ssc_institution: null | string;
	hsc_compulsory_subjects_1: "101_102";
	hsc_compulsory_subjects_2: "107_108";
	hsc_compulsory_subjects_3: string;
	group: Group;
	hsc_optional_subjects_science_1: string | null;
	hsc_optional_subjects_science_2: string | null;
	hsc_optional_subjects_science_3: string | null;
	hsc_optional_subjects_science_4: string | null;
	hsc_optional_subjects_humanities_1: string | null;
	hsc_optional_subjects_humanities_2: string | null;
	hsc_optional_subjects_humanities_3: string | null;
	hsc_optional_subjects_humanities_4: string | null;
	hsc_optional_subjects_business_studies_1: string | null;
	hsc_optional_subjects_business_studies_2: string | null;
	hsc_optional_subjects_business_studies_3: string | null;
	hsc_optional_subjects_business_studies_4: string | null;
	photo: null | string;
	half_yearly_result?: Result;
	year_final_result?: Result;
	ssc_result?: SscResult[];
}

export type BloodGroup = "B-ve" | "B+ve" | "A+ve" | "O+ve" | "AB+ve" | "A-ve" | "O-ve" | "AB-ve";

export type BoardScholarship = "না" | "হ্যাঁ";

export type Group = "humanities" | "science" | "business_studies";

export interface Result {
	gpa: string;
	results: ResultElement[];
}

export interface ResultElement {
	subject: string;
	letter: GradeEnum;
	grade: number | GradeEnum;
	marks: string;
}

export type GradeEnum = "A" | "B" | "F" | "D" | "A-" | "A+" | "C" | "Absent";

export type ScBoard = "Not Applicable" | "Jashore" | "Barishal" | "Madrasa" | "Rajshahi" | "Sylhet" | "Dhaka" | "Dinajpur" | "Technical" | "Cumilla";

export type Religion = "Islam" | "Hinduism" | "Christianity";

export interface SscResult {
	subject: string;
	marks: number;
	grade: GradeEnum;
}

let parsedData: Student[] = (data as Student[]).sort((a, b) => {
	let dateA = +new Date(a.date);
	let dateB = +new Date(b.date);
	return dateB - dateA;
});

export default parsedData;

