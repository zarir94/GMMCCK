import data from "./data";

export interface StudentInfo {
	id: string;
	roll: string;
	rocket_payment_date: string;
	class: string;
	session: string;
	date: string;
	name_bangla: string;
	name_english: string;
	father_name_bangla: string;
	father_name_english: string;
	mother_name_bangla: string;
	mother_name_english: string;
	mobile_number_student: string | null;
	mobile_number_guardian: string;
	date_of_birth: string;
	religion: string;
	blood_group: string;
	online_birth_reg_no: string;
	guardian_name: string | null;
	guardian_profession: string | null;
	guardian_work_station: string | null;
	guardian_monthly_income: string | null;
	permanent_village: string | null;
	permanent_ward: string | null;
	permanent_post: string | null;
	permanent_thana: string | null;
	permanent_district: string | null;
	present_local_guardian_name: string | null;
	present_local_guardian_relation: string | null;
	present_village: string | null;
	present_ward: string | null;
	present_post: string | null;
	present_thana: string | null;
	present_district: string | null;
	jsc_board: string;
	jsc_passing_year: string;
	jsc_roll: string | null;
	jsc_regno: string | null;
	jsc_session: string;
	jsc_gpa: string | null;
	jsc_institution: string | null;
	ssc_board: string;
	ssc_passing_year: string;
	ssc_roll: string | null;
	ssc_regno: string;
	ssc_session: string;
	ssc_gpa: string | null;
	board_scholarship: string;
	ssc_institution: string | null;
	hsc_compulsory_subjects_1: string;
	hsc_compulsory_subjects_2: string;
	hsc_compulsory_subjects_3: string;
	group: string;
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
	photo: string | null;
}

let parsedData: StudentInfo[] = data.sort((a, b) => {
	let dateA = +new Date(a.date);
	let dateB = +new Date(b.date);
	return dateB - dateA;
});

export default parsedData;

