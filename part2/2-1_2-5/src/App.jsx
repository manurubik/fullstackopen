const App = () => {
  const courses = [
    {
      name: "Half Stack application development",
      id: 1,
      parts: [
        {
          name: "Fundamentals of React",
          exercises: 10,
          id: 1,
        },
        {
          name: "Using props to pass data",
          exercises: 7,
          id: 2,
        },
        {
          name: "State of a component",
          exercises: 14,
          id: 3,
        },
        {
          name: "Redux",
          exercises: 11,
          id: 4,
        },
      ],
    },
    {
      name: "Node.js",
      id: 2,
      parts: [
        {
          name: "Routing",
          exercises: 3,
          id: 1,
        },
        {
          name: "Middlewares",
          exercises: 7,
          id: 2,
        },
      ],
    },
  ];

  return (
    <>
      {courses.map((course) => (
        <Course key={course.id} course={course} />
      ))}
    </>
  );
};

export default App;

const Course = ({ course }) => {
  return (
    <>
      <Header text={course.name} />
      <Content content={course} />
      <Total ex={course.parts} />
    </>
  );
};

const Header = ({ text }) => {
  return <h1>{text}</h1>;
};

const Content = ({ content }) => {
  return (
    <>
      {content.parts.map((part) => (
        <Part key={part.id} content={part} />
      ))}
    </>
  );
};

const Part = ({ content }) => {
  return (
    <p>
      {content.name} {content.exercises}
    </p>
  );
};

const Total = ({ ex }) => {
  let total = ex.reduce((sum, part) => sum + part.exercises, 0);
  return <h4>total of {total} exercises</h4>;
};
