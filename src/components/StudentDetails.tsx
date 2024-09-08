import React, { useEffect, useState } from 'react';
import { fetchStudentById } from '../api/api';

interface StudentDetailsProps {
  studentId: string;
}

interface Student {
  _id: string;
  name: string;
  age: number;
  grade: string;
}

const StudentDetails: React.FC<StudentDetailsProps> = ({ studentId }) => {
  const [student, setStudent] = useState<Student | null>(null);

  useEffect(() => {
    const getStudent = async () => {
      try {
        const response = await fetchStudentById(studentId);
        setStudent(response.data);
      } catch (error) {
        console.error('Error fetching student details:', error);
      }
    };

    getStudent();
  }, [studentId]);

  if (!student) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Student Details</h2>
      <p>Name: {student.name}</p>
      <p>Age: {student.age}</p>
      <p>Grade: {student.grade}</p>
    </div>
  );
};

export default StudentDetails;
