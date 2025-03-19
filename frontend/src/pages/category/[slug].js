// pages/[slug].js
import { useState } from 'react';
import Layout from '../../components/Layout';
import { fetchCategory, fetchQuestionsByCategory } from '../../lib/api';

function QuestionCard({ question }) {
  const [selectedAnswerId, setSelectedAnswerId] = useState(null);
  const [feedback, setFeedback] = useState('');

  const handleAnswerClick = (answer) => {
    setSelectedAnswerId(answer.id);
    setFeedback(answer.correct ? 'Rétt svar!' : 'Rangt svar!');
  };

  return (
    <div style={{ marginBottom: '1.5rem', padding: '1rem', border: '1px solid #ccc' }}>
      <h3>{question.text || question.title}</h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {question.answers.map((answer) => (
          <li key={answer.id} style={{ marginBottom: '0.5rem' }}>
            <button
              onClick={() => handleAnswerClick(answer)}
              style={{
                cursor: 'pointer',
                padding: '0.5rem 1rem',
                backgroundColor: selectedAnswerId === answer.id ? '#e0e0e0' : '#f9f9f9',
                border: '1px solid #ccc',
                borderRadius: '4px',
              }}
            >
              {answer.text}
            </button>
          </li>
        ))}
      </ul>
      {feedback && <p>{feedback}</p>}
    </div>
  );
}

export default function CategoryPage({ category, questions }) {
  if (!category) {
    return (
      <Layout title="Flokkur ekki til">
        <h2>Flokkur ekki til</h2>
        <p>Flokkurinn sem þú leitar að finnst ekki.</p>
      </Layout>
    );
  }

  return (
    <Layout title={category.name}>
      <h2>{category.name}</h2>
      {questions && questions.length > 0 ? (
        <div>
          {questions.map((question) => (
            <QuestionCard key={question.id} question={question} />
          ))}
        </div>
      ) : (
        <p>Engar spurningar í þessum flokki.</p>
      )}
    </Layout>
  );
}

export async function getServerSideProps({ params, res }) {
  try {
    const categorySlug = params.slug;
    const catData = await fetchCategory(categorySlug);
    const category = catData;
    
    if (!category) {
      res.statusCode = 404;
      return { props: { category: null, questions: [] } };
    }

    const qData = await fetchQuestionsByCategory(categorySlug);
    const questions = Array.isArray(qData) ? qData : qData.data || [];

    return { props: { category, questions } };
  } catch (error) {
    console.error('Villa við að sækja gögn fyrir flokkasíðuna:', error);
    return {
      props: {
        category: null,
        questions: [],
      },
    };
  }
}
