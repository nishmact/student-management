import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const fetchStudents = () => axios.get(`${API_URL}/students`);
export const fetchStudentById = (id: string) => axios.get(`${API_URL}/students/${id}`);
export const createStudent = (student: { name: string; age: number; grade: string }) => axios.post(`${API_URL}/students`, student);
export const updateStudent = (id: string, student: { name: string; age: number; grade: string }) => axios.put(`${API_URL}/students/${id}`, student);
export const deleteStudent = (id: string) => axios.delete(`${API_URL}/students/${id}`);
