import React from 'react';
import courses from './courses';

const Header = ({ name }) => {
  return (
    <h2>{name}</h2>
  );
}

const Main = ({ parts }) => {
  return (
    <ul>
      {parts.map(part => 
        <li key={part.id}>
          {part.name}: {part.exercises}
        </li>
      )}
    </ul>
  );
}

const Count = ({ parts }) => {
  const totalExercises = parts.reduce((sum, part) => sum + part.exercises, 0);
  return (
    <p>Total of {totalExercises} exercises</p>
  );
}

const Course = ({ courses }) => {
  return (
    <div>
      {courses.map(course => (
        <div key={course.id}>
          <Header name={course.name} />
          <Main parts={course.parts} />
          <Count parts={course.parts} />
        </div>
      ))}
    </div>
  );
}

const App = () => {
  return <Course courses={courses} />;
}

export default App;
