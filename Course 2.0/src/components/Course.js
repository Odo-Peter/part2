const Header = ({ course }) => {
  return (
    <div>
      <h2>{course.name}</h2>
    </div>
  );
};

const Part = ({ part }) => {
  return <div>{part}</div>;
};

const Content = ({ parts }) => {
  return (
    <Part
      part={parts.parts.map((part) => {
        return (
          <p key={part.id}>
            {part.name} {part.exercises}
          </p>
        );
      })}
    />
  );
};

const Total = ({ parts }) => {
  return (
    <div>
      <p>
        Total of{' '}
        {parts.parts.map((part) => part.exercises).reduce((a, b) => a + b)}{' '}
        exercises
      </p>
    </div>
  );
};

const Course = ({ course }) => {
  // console.log(course.map((crs) => crs));
  return (
    <div>
      <Header course={course[0]} />
      <Content parts={course[0]} />
      <Total parts={course[0]} />

      <Header course={course[1]} />
      <Content parts={course[1]} />
      <Total parts={course[1]} />
    </div>
  );
};

export default Course;
