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

export default Course;
