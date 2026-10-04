type FaqItem = { question: string; answer: string };

export function FaqList({ items, openFirst = false }: { items: FaqItem[]; openFirst?: boolean }) {
  return (
    <div className="faq">
      {items.map((item, index) => (
        <details className="faq-item" key={item.question} open={openFirst && index === 0}>
          <summary>
            <span>{item.question}</span>
            <i className="faq-icon" aria-hidden="true" />
          </summary>
          <div className="faq-answer">
            <p>{item.answer}</p>
          </div>
        </details>
      ))}
    </div>
  );
}
