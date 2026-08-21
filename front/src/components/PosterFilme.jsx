import { useState, useEffect } from 'react';
import { Film } from 'lucide-react';

function PosterFilme({ url, className, iconSize = 40, style }) {
  const [quebrado, setQuebrado] = useState(false);

  useEffect(() => {
    setQuebrado(false);
  }, [url]);

  const temImagem = url && url.trim() && !quebrado;

  return (
    <div className={`${className} poster-placeholder`} style={style}>
      {temImagem ? (
        <img
          src={url}
          alt=""
          className="poster-img"
          onError={() => setQuebrado(true)}
        />
      ) : (
        <Film size={iconSize} color="#8A7A63" strokeWidth={1.5} />
      )}
    </div>
  );
}

export default PosterFilme;
