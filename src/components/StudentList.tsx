import React from 'react';
import { deleteStudent } from '../api/api';

interface Student {
  _id: string;
  name: string;
  age: number;
  grade: string;
}

interface StudentListProps {
  students: Student[];
  onDelete: (id: string) => void;
}

const StudentList: React.FC<StudentListProps> = ({ students, onDelete }) => {
  const handleDelete = async (id: string) => {
    try {
      await deleteStudent(id);
      onDelete(id); // Call the function to remove the student from the list
    } catch (error) {
      console.error('Error deleting student', error);
    }
  };

  return (
    <ul>
      {students.map((student) => (
        <li key={student._id}>
          {student.name} - {student.grade}
          <button onClick={() => handleDelete(student._id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default StudentList;
