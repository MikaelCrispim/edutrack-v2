import React from 'react';

// Mock data for display purposes
const mockSubject = { 
  id: 1, 
  name: 'Introduction to Programming', 
  professor: 'Dr. Smith',
  description: 'An introductory course on programming principles.'
};

function SubjectDetail() {
  return (
    <div>
      <h2>{mockSubject.name}</h2>
      <p><strong>Professor:</strong> {mockSubject.professor}</p>
      <p><strong>Description:</strong> {mockSubject.description}</p>
    </div>
  );
}

export default SubjectDetail;
