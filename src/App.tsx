import React, { useState, useEffect } from 'react';
import StudentList from './components/StudentList';
import StudentForm from './components/StudentForm';
import StudentDetails from './components/StudentDetails';
import { fetchStudents, createStudent, updateStudent, deleteStudent } from './api/api';

interface Student {
  _id: string;
  name: string;
  age: number;
  grade: string;
}

const App: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedStudentId, setSelectedStudentId] = useState<string | undefined>(undefined);

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    try {
      const response = await fetchStudents();
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students', error);
    }
  };

  const handleSave = async (studentData: { name: string; age: number; grade: string }) => {
    try {
      if (selectedStudentId) {
        await updateStudent(selectedStudentId, studentData);
      } else {
        await createStudent(studentData);
      }
      setSelectedStudentId(undefined);
      loadStudents(); // Refresh the student list
    } catch (error) {
      console.error('Error saving student', error);
    }
  };

  const handleDelete = (id: string) => {
    setStudents(students.filter((student) => student._id !== id));
  };

  return (
    <div className="App">
      <h1>Student Management</h1>
      <StudentList students={students} onDelete={handleDelete} />
      <StudentForm studentId={selectedStudentId} onSave={handleSave} />
      {selectedStudentId && <StudentDetails studentId={selectedStudentId} />}
    </div>
  );
};

export default App;
