import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import toast from 'react-hot-toast';
import {
  fetchCategories,
  fetchQuestionsByCategory,
  fetchQuestionById,
  updateQuestion,
  deleteQuestion,
} from '../lib/api';
import styles from '../styles/EditQuestion.module.css'; // Útbúa þessa skrá

export default function EditQuestion() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [editQuestion, setEditQuestion] = useState(null);
  const [originalAnswers, setOriginalAnswers] = useState([]);
  const [loading, setLoading] = useState(false);

  // Sækir flokka þegar síðunni er hlaðið
  useEffect(() => {
    loadCategories();
  }, []);

  async function loadCategories() {
    try {
      const cats = await fetchCategories();
      setCategories(cats);
    } catch (err) {
      toast.error(err.message);
    }
  }

  async function handleSelectCategory(category) {
    setSelectedCategory(category);
    setEditQuestion(null); // hreinsa editaða spurningu ef til er
    setLoading(true);
    try {
      const questionsResponse = await fetchQuestionsByCategory(category.slug);
      setQuestions(questionsResponse.data || []);
    } catch (err) {
      toast.error(err.message);
    }
    setLoading(false);
  }

  async function handleEditQuestion(questionId) {
    setLoading(true);
    try {
      const question = await fetchQuestionById(questionId);
      // Vistar upphafleg svör til samanburðar
      setOriginalAnswers(question.answers || []);
      setEditQuestion({
        id: question.id,
        text: question.text || '',
        description: question.description || '',
        categoryId: question.category ? question.category.id : '',
        answers: question.answers || [],
      });
    } catch (err) {
      toast.error(err.message);
    }
    setLoading(false);
  }

  async function handleDeleteQuestion(questionId) {
    if (!window.confirm('Ertu viss um að eyða spurningu?')) return;
    setLoading(true);
    try {
      await deleteQuestion(questionId);
      toast.success('Spurning eytt!');
      // Uppfærum spurningalistan fyrir valda flokkinn
      const questionsResponse = await fetchQuestionsByCategory(selectedCategory.slug);
      setQuestions(questionsResponse.data || []);
      // Ef editaða spurningin var sú sem var eytt, hreinsum við editQuestion
      if (editQuestion && editQuestion.id === questionId) {
        setEditQuestion(null);
      }
    } catch (err) {
      toast.error(err.message);
    }
    setLoading(false);
  }

  async function handleUpdateQuestion(e) {
    e.preventDefault();
    setLoading(true);
    try {
      // Ef engin breyting á svörum hefur átt sér stað, sendum tómt fylki til að forðast að skapa afrit
      const answersToSend =
        JSON.stringify(editQuestion.answers) === JSON.stringify(originalAnswers)
          ? []
          : editQuestion.answers;

      await updateQuestion(editQuestion.id, {
        text: editQuestion.text,
        description: editQuestion.description,
        categoryId: Number(editQuestion.categoryId),
        answers: answersToSend,
      });
      toast.success('Spurning uppfærð!');
      const questionsResponse = await fetchQuestionsByCategory(selectedCategory.slug);
      setQuestions(questionsResponse.data || []);
      setEditQuestion(null);
    } catch (err) {
      toast.error(err.message);
    }
    setLoading(false);
  }

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditQuestion((prev) => ({ ...prev, [name]: value }));
  };

  const handleAnswerChange = (index, field, value) => {
    const updatedAnswers = [...editQuestion.answers];
    updatedAnswers[index] = { ...updatedAnswers[index], [field]: value };
    setEditQuestion((prev) => ({ ...prev, answers: updatedAnswers }));
  };

  const handleAddAnswerOption = () => {
    setEditQuestion((prev) => ({
      ...prev,
      answers: [...prev.answers, { text: '', correct: false }],
    }));
  };

  const handleRemoveAnswerOption = (index) => {
    const updatedAnswers = editQuestion.answers.filter((_, i) => i !== index);
    setEditQuestion((prev) => ({ ...prev, answers: updatedAnswers }));
  };

  return (
    <Layout title="Breyta/Eyða spurningu með svörum">
      <div className={styles.container}>
        <h2 className={styles.pageTitle}>Stjórnun spurninga</h2>

        {/* Sýnum lista af flokkum */}
        <section className={styles.categoriesSection}>
          <h3 className={styles.sectionHeading}>Veldu flokk</h3>
          <ul className={styles.categoryList}>
            {categories.map((cat) => (
              <li key={cat.id} className={styles.categoryItem}>
                <button
                  className={styles.categoryButton}
                  onClick={() => handleSelectCategory(cat)}
                >
                  {cat.name}
                </button>
              </li>
            ))}
          </ul>
        </section>

        {/* Ef flokkur er valinn, sýnum spurningar */}
        {selectedCategory && (
          <section className={styles.questionsSection}>
            <h3 className={styles.sectionHeading}>
              Spurningar í flokki: {selectedCategory.name}
            </h3>
            {loading ? (
              <p>Sæki gögn...</p>
            ) : questions.length ? (
              <ul className={styles.questionList}>
                {questions.map((q) => (
                  <li key={q.id} className={styles.questionItem}>
                    <span className={styles.questionText}>{q.text}</span>
                    <div className={styles.buttonGroup}>
                      <button
                        className={styles.editButton}
                        onClick={() => handleEditQuestion(q.id)}
                      >
                        Breyta
                      </button>
                      <button
                        className={styles.deleteButton}
                        onClick={() => handleDeleteQuestion(q.id)}
                      >
                        Eyða
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p>Engar spurningar fundust fyrir þennan flokk.</p>
            )}
          </section>
        )}

        {/* Ef notandi er að breyta spurningu, sýnum form */}
        {editQuestion && (
          <section className={styles.editSection}>
            <h3 className={styles.sectionHeading}>Breyta spurningu</h3>
            <form onSubmit={handleUpdateQuestion} className={styles.form}>
              <div className={styles.formField}>
                <label htmlFor="text" className={styles.label}>Spurning</label>
                <input
                  id="text"
                  name="text"
                  type="text"
                  value={editQuestion.text}
                  onChange={handleEditChange}
                  className={styles.input}
                  required
                />
              </div>
              <div className={styles.answersWrapper}>
                <h4 className={styles.subHeading}>Svör</h4>
                {editQuestion.answers.map((answer, i) => (
                  <div key={i} className={styles.answerRow}>
                    <input
                      type="text"
                      placeholder="Svar"
                      value={answer.text}
                      onChange={(e) =>
                        handleAnswerChange(i, 'text', e.target.value)
                      }
                      className={styles.input}
                      required
                    />
                    <label className={styles.checkboxLabel}>
                      <input
                        type="checkbox"
                        checked={answer.correct}
                        onChange={(e) =>
                          handleAnswerChange(i, 'correct', e.target.checked)
                        }
                      />
                      Rétt
                    </label>
                    <button
                      type="button"
                      className={styles.removeButton}
                      onClick={() => handleRemoveAnswerOption(i)}
                    >
                      Eyða
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  className={styles.addButton}
                  onClick={handleAddAnswerOption}
                >
                  Bæta við svari
                </button>
              </div>
              <button type="submit" className={styles.submitButton}>
                Uppfæra spurningu
              </button>
            </form>
          </section>
        )}
      </div>
    </Layout>
  );
}
