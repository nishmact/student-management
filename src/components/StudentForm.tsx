import React, { useState, useEffect } from 'react';
import { fetchStudentById } from '../api/api';

interface StudentFormProps {
  studentId?: string;
  onSave: (studentData: { name: string; age: number; grade: string }) => void;
}

const StudentForm: React.FC<StudentFormProps> = ({ studentId, onSave }) => {
  const [studentData, setStudentData] = useState({ name: '', age: 0, grade: '' });

  useEffect(() => {
    if (studentId) {
      loadStudent(studentId);
    }
  }, [studentId]);

  const loadStudent = async (id: string) => {
    try {
      const response = await fetchStudentById(id);
      setStudentData(response.data);
    } catch (error) {
      console.error("Error fetching student", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === 'grade' && !/^[A-Za-z]*$/.test(value)) {
      return; // Ignore non-letter inputs
    }

    setStudentData({
      ...studentData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(studentData);
    setStudentData({ name: '', age: 0, grade: '' }); // Clear form after save
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={studentData.name}
        onChange={handleChange}
        placeholder="Name"
        required
      />
      <input
        type="number"
        name="age"
        value={studentData.age}
        onChange={handleChange}
        placeholder="Age"
        required
      />
      <input
        type="text"
        name="grade"
        value={studentData.grade}
        onChange={handleChange}
        placeholder="Grade (A-Z)"
        required
        maxLength={1} // Only allow one character
      />
      <button type="submit">Save</button>
    </form>
  );
};

export default StudentForm;
