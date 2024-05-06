export const renderParagraphs = (text: string) => {
  if (!text.includes("\n")) return <p className='w-full'>{text}</p>;
  return (
    <div className='w-full'>
      {text.split("\n").map((phrase, i) => (
        <p key={i}>{phrase}</p>
      ))}
    </div>
  );
};
