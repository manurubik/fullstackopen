const App = () => {
  const course = {
    id: 1,
    name: "Half Stack application development",
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
    ],
  };

  return <Course course={course} />;
};

export default App;

const Course = ({ course }) => {
  return (
    <>
      <Header text={course.name} />
      <Content content={course} />
      <Total sum={course.parts} />
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

const Total = ({ sum }) => {
  let total = 0;
  sum.map((part) => {
    total += part.exercises;
  });
  return <h4>total of {total} exercises</h4>;
};
