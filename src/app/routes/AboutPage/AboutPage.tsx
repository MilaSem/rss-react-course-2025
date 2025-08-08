import styles from './AboutPage.module.css';

export const AboutPage = () => {
  return (
    <div className={styles.about}>
      <h1 className={styles.title}>About App</h1>
      <p>
        Author:
        <a
          className={styles.link}
          href="https://github.com/MilaSem"
          target="_blank"
          rel="noreferrer"
        >
          Mila Sem
        </a>
      </p>
      <p>
        The Anime Catalog App was created as part of the
        <a
          className={styles.link}
          href="https://github.com/MilaSem"
          target="_blank"
          rel="noreferrer"
        >
          RS School
        </a>
        React course.
      </p>
      <p>
        The course is designed for students who have passed Stage #2 and
        newcomers with experience in JavaScript, TypeScript, Git, NPM, CSS,
        HTML, and API interaction.
      </p>
    </div>
  );
};
